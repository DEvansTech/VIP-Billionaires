import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';
import {
  FlatList,
  Image,
  RefreshControl,
  View,
  Text,
  Dimensions,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {themes} from '../../constants/colors';
import StatusBar from '../../containers/StatusBar';
import {withTheme} from '../../theme';
import NoFriends from './NoFriends';
import ActivityIndicator from '../../containers/ActivityIndicator';
import MainHeader from '../../containers/MainHeader';
import * as HeaderButton from '../../containers/HeaderButton';
import MainScreen from '../../containers/MainScreen';
import firebaseSdk, {
  DB_ACTION_ADD,
  DB_ACTION_DELETE,
  DB_ACTION_UPDATE,
  NOTIFICATION_TYPE_LIKE,
} from '../../lib/firebaseSdk';
import Post from './Post';
import {withActionSheet} from '../../containers/ActionSheet';
import {showErrorAlert, showToast} from '../../lib/info';
import I18n from '../../i18n';
import {setUser as setUserAction} from '../../actions/login';
import styles from './styles';
import {navigateToProfile, onSharePost} from '../../utils/const';
import {fetchUnread as fetchUnreadAction} from '../../actions/chat';
import {TabView, SceneMap} from 'react-native-tab-view';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDebounce} from '../../utils/useDebounce';

const {width} = Dimensions.get('screen');

const HomeView = props => {
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();
  const [state, setState] = useState({
    text: '',
    dataToDisplay: [],
    followedPosts: [],
    followingPosts: [],
    searchResult: [],
    showModal: false,
    showAddModal: false,
    editMeetup: null,
    reviewMeetup: null,
    refreshing: false,
    loading: false,
    notifying: false,
    isUpdating: false,
    searchText: '',
  });
  const debounceText = useDebounce(state.searchText, 500);
  const {user, theme, setUser} = props;
  const {
    dataToDisplay,
    followedPosts,
    followingPosts,
    loading,
    isUpdating,
    refreshing,
  } = state;

  useEffect(() => {
    if (!global.unSubscribeRoom) {
      const roomSubscribe = firestore().collection(firebaseSdk.TBL_ROOM);
      global.unSubscribeRoom = roomSubscribe.onSnapshot(async querySnapShot => {
        props.fetchUnread();
      });
    }
  }, []);

  useEffect(() => {
    init();
  }, [user]);

  useEffect(() => {
    onSearch();
  }, [debounceText]);

  const init = async () => {
    const userSnaps = await firestore().collection(firebaseSdk.TBL_USER).get();
    const users = [];
    userSnaps.forEach(s => users.push(s.data()));

    const followedPosts = [];
    const followingPosts = [];
    const posts = await firestore().collection(firebaseSdk.TBL_POST).get();
    posts.forEach(doc => {
      const post = doc.data();
      if (!user.blocked || !user.blocked.includes(post.userId)) {
        if (
          user.followers.includes(post.userId) ||
          user.userId === post.userId
        ) {
          const owner = users.find(u => u.userId === post.userId);
          followedPosts.push({id: doc.id, ...post, owner});
        }

        if (user.followings.includes(post.userId)) {
          const owner = users.find(u => u.userId === post.userId);
          followingPosts.push({id: doc.id, ...post, owner});
        }
      }
    });
    followedPosts.sort((a, b) => b.date - a.date);
    followingPosts.sort((a, b) => b.date - a.date);
    setState({
      ...state,
      followedPosts: followedPosts,
      dataToDisplay: followedPosts,
      followingPosts: followingPosts,
      refreshing: false,
    });
  };

  const onOpenPost = item => {
    navigation.push('PostDetail', {post: item});
  };

  const onOpenProfile = item => {
    if (item.userId === user.userId) {
      navigation.navigate('Profile');
    } else {
      navigateToProfile(navigation, user, item);
    }
  };

  const onToggleLike = (item, isLiking) => {
    let update = {};
    if (isLiking) {
      update = {id: item.id, likes: item.likes.filter(l => l !== user.userId)};
    } else {
      update = {id: item.id, likes: [...item.likes, user.userId]};
    }

    setState({...state, isUpdating: true});
    init();
    firebaseSdk
      .setData(firebaseSdk.TBL_POST, DB_ACTION_UPDATE, update)
      .then(() => {
        if (!isLiking && item.owner.userId !== user.userId) {
          const postImage =
            item.type === 'video'
              ? item.thumbnail
              : item.type === 'photo'
              ? item.photo
              : '';
          const activity = {
            type: NOTIFICATION_TYPE_LIKE,
            sender: user.userId,
            receiver: item.owner.userId,
            content: '',
            text: item.text,
            postId: item.id,
            postImage,
            postType: item.type,
            title: item.owner.displayName,
            message: I18n.t('likes_your_post', {name: user.displayName}),
            date: new Date(),
          };
          firebaseSdk.addActivity(activity, item.owner.token).then(r => {});
        }
      })
      .catch(() => {
        setState({...state, isUpdating: false});
      });
  };

  const onActionPost = item => {
    const onReport = () => {
      const report = {
        userId: user.userId,
        postId: item.id,
        ownerId: item.owner.userId,
        createdAt: new Date(),
      };
      setState({...state, isUpdating: true});
      firebaseSdk
        .setData(firebaseSdk.TBL_REPORTS, DB_ACTION_ADD, report)
        .then(() => {
          setState({...state, isUpdating: false});
          showToast(I18n.t('Report_post_complete'));
        })
        .catch(() => {
          showErrorAlert(I18n.t('Report_post_failed'), I18n.t('Oops'));
          setState({...state, isUpdating: false});
        });
    };
    const onBlock = () => {
      const account = item.owner;
      const blocked = user.blocked ?? [];
      const update = {id: user.id, blocked: [...blocked, account.userId]};
      setState({...state, isUpdating: true});
      firebaseSdk
        .setData(firebaseSdk.TBL_USER, DB_ACTION_UPDATE, update)
        .then(() => {
          setUser({blocked: update.blocked});
          showToast(I18n.t('Block_user_complete'));
          setState({...state, isUpdating: false});
          init();
        })
        .catch(() => {
          showErrorAlert(I18n.t('Block_user_failed'), I18n.t('Oops'));
          setState({...state, isUpdating: false});
        });
    };
    // Actions
    const options = [
      {
        title: I18n.t('Report_post'),
        onPress: onReport,
      },
      {
        title: I18n.t('Block_user'),
        // danger: true,
        onPress: onBlock,
      },
    ];
    const onEdit = () => {
      navigation.push('EditPost', {postId: item.id});
    };
    const onRemove = () => {
      setState({...state, isUpdating: true});
      firebaseSdk
        .setData(firebaseSdk.TBL_POST, DB_ACTION_DELETE, {id: item.id})
        .then(() => {
          showToast(I18n.t('Remove_post_complete'));
          setState({...state, isUpdating: false});
        })
        .catch(() => {
          showErrorAlert(I18n.t('Remove_post_failed'), I18n.t('Oops'));
          setState({...state, isUpdating: false});
        });
    };
    const ownerOptions = [
      {
        title: I18n.t('edit_post'),
        onPress: onEdit,
      },
      {
        title: I18n.t('Remove'),
        // danger: true,
        onPress: onRemove,
      },
    ];

    // Fix exception error if item.owner is underfined
    const isOwner = item.owner ? item.owner.userId === user.userId : 0;
    // const isOwner = item.owner.userId === user.userId
    return {options: isOwner ? ownerOptions : options};
    // showActionSheet({ options: isOwner ? ownerOptions : options });
  };

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator theme={theme} size={'large'} />;
    }
    return <View style={{height: tabBarHeight + 24}} />;
  };

  const onRefresh = () => {
    setState({...state, refreshing: true});
    init();
  };

  const renderItem = ({item, index}) => {
    return (
      <Post
        item={item}
        onPress={() => onOpenPost(item)}
        onPressUser={() => onOpenProfile(item)}
        onPressShare={() => onSharePost(item)}
        onLike={isLiking => onToggleLike(item, isLiking)}
        isLiking={item.likes && item.likes.includes(user.userId)}
        onActions={onActionPost(item)}
        theme={theme}
        style={{marginTop: index === 0 ? 16 : 8}}
      />
    );
  };

  const RenderFlatListItem = ({data, type}) => {
    if (data.length > 0 || loading) {
      return (
        <View>
          <Text
            style={[
              styles.suggestBoxHeader,
              {color: themes[theme].textColor},
            ]}>
            {I18n.t('suggested_posts')}
          </Text>
          <FlatList
            style={{width}}
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${type}_${item.id}`}
            ListFooterComponent={renderFooter}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={themes[theme].actionTintColor}
              />
            }
            contentContainerStyle={{paddingBottom: 20}}
          />
        </View>
      );
    } else {
      return (
        <NoFriends
          textToShow={
            state.searchText.length > 0 ? I18n.t('no_found_search') : null
          }
          onPress={() => {}}
        />
      );
    }
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'For You'},
    {key: 'second', title: 'Followings'},
  ]);

  const renderScene = SceneMap({
    first: () => <RenderFlatListItem type={'followers'} data={dataToDisplay} />,
    second: () => (
      <RenderFlatListItem type={'followings'} data={followingPosts} />
    ),
  });
  const renderTabBar = props => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.tabItem,
                index === i ? styles.activeTab : '',
                {
                  borderBottomColor:
                    index === i
                      ? themes[theme].titleColor
                      : themes[theme].borderColor,
                },
              ]}
              onPress={() => setIndex(i)}>
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      index === i
                        ? themes[theme].titleColor
                        : themes[theme].textColor,
                  },
                ]}>
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const onSearch = React.useCallback(() => {
    if (debounceText.length > 0) {
      setState({...state, isUpdating: true});
      firestore()
        .collection(firebaseSdk.TBL_POST)
        .where('text', '<=', debounceText)
        .get()
        .then(querySnapshot => {
          const searchResult = [];
          querySnapshot.forEach(doc => {
            searchResult.push(doc.data());
          });
          if (searchResult.length > 0) {
            setState({
              ...state,
              isUpdating: false,
              dataToDisplay: searchResult,
            });
          } else {
            setState({...state, isUpdating: false, dataToDisplay: []});
          }
        })
        .catch(error => {
          throw new Error(error);
        });
    } else {
      setState({
        ...state,
        dataToDisplay: state.followedPosts,
      });
    }
  }, [debounceText]);

  return (
    <MainScreen navigation={navigation}>
      <StatusBar />
      <MainHeader
        avatarImage=""
        onChangeText={e => setState({...state, searchText: e})}
        clearInput={() => setState({...state, searchText: ''})}
      />
      {isUpdating && (
        <ActivityIndicator absolute theme={theme} size={'large'} />
      )}
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{width: layout.width}}
        onIndexChange={setIndex}
      />
    </MainScreen>
  );
};

const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
  fetchUnread: params => dispatch(fetchUnreadAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withActionSheet(withTheme(HomeView)));
