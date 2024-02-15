import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {themes} from '../../constants/colors';
import StatusBar from '../../containers/StatusBar';
import SafeAreaView from '../../containers/SafeAreaView';
import {withTheme} from '../../theme';
import SearchBox from '../../containers/SearchBox';
import debounce from '../../utils/debounce';
import styles from './styles';
import {setUser as setUserAction} from '../../actions/login';
import images from '../../assets/images';
import firebaseSdk, {
  DB_ACTION_ADD,
  DB_ACTION_DELETE,
  NOTIFICATION_TYPE_FOLLOW,
} from '../../lib/firebaseSdk';
import ActivityIndicator from '../../containers/ActivityIndicator';
import sharedStyles from '../Styles';
import I18n from '../../i18n';
import {GradientHeader} from '../../containers/GradientHeader';
import {navigateToProfile} from '../../utils/const';
import {VectorIcon} from '../../containers/VectorIcon';
import {formatNumber} from '../../utils/utils';

const FollowView = props => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    type: props.route.params?.type,
    account: props.route.params?.account,
    refreshing: false,
    loading: true,
    updating: false,
  });
  const {theme, user, setUser} = props;
  const {type, refreshing, updating, account, loading} = state;

  const [data, setData] = useState([]);
  const [text, setText] = useState('');

  const [isFollwersTab, setIsFollowersTab] = useState(
    type === 'followers' ? true : false,
  );

  const isSelf = user.userId === account.userId;

  useEffect(() => {
    navigation.setOptions({
      title: type === 'followings' ? I18n.t('Followings') : I18n.t('Followers'),
      headerLeft: () => (
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => navigation.goBack()}>
          <VectorIcon
            size={20}
            name={'arrowleft'}
            type={'AntDesign'}
            color={themes[theme].activeTintColor}
            style={{marginLeft: 18}}
          />
        </TouchableOpacity>
      ),
    });
  }, [type]);

  useEffect(() => {
    getData(text);
  }, [text, user, type]);

  const getData = useCallback(
    debounce(async searchText => {
      const userSnaps = await firestore()
        .collection(firebaseSdk.TBL_USER)
        .get();
      const postSnaps = await firestore()
        .collection(firebaseSdk.TBL_POST)
        .get();
      const users = [];
      const friends = [];
      const posts = [];
      postSnaps.forEach(p => posts.push({id: p.id, userId: p.data().userId}));
      userSnaps.forEach(s => {
        const userInfo = {...s.data(), id: s.id};
        const userPosts = posts.filter(p => p.userId === userInfo.userId);
        if (userInfo.userId !== user.userId) {
          users.push({...userInfo, postCount: userPosts.length});
        }
        if (isSelf) {
          if (type === 'followings') {
            if (user.followings.includes(userInfo.userId)) {
              friends.push({...userInfo, postCount: userPosts.length});
            }
          } else {
            if (user.followers.includes(userInfo.userId)) {
              friends.push({...userInfo, postCount: userPosts.length});
            }
          }
        } else {
          if (type === 'followings') {
            if (account.followings.includes(userInfo.userId)) {
              friends.push({...userInfo, postCount: userPosts.length});
            }
          } else {
            if (account.followers.includes(userInfo.userId)) {
              friends.push({...userInfo, postCount: userPosts.length});
            }
          }
        }
      });

      if (searchText.length > 0) {
        let data = users.filter(d => {
          const key = d.displayName;
          return key.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
        });
        setData(data);
        setState({...state, loading: false, refreshing: false});
      } else {
        setData(friends);
        setState({...state, loading: false, refreshing: false});
      }
    }, 200),
    [type, user, account, isSelf],
  );

  const onSearchChangeText = text => {
    setText(text);
    setState({...state, loading: false});
  };

  const onToggleFollow = (item, following) => {
    setState({...state, updating: true});
    firebaseSdk
      .updateFollows(
        user.id,
        item.id,
        following ? DB_ACTION_DELETE : DB_ACTION_ADD,
      )
      .then(({myFollowings}) => {
        if (!following) {
          const activity = {
            type: NOTIFICATION_TYPE_FOLLOW,
            sender: user.userId,
            receiver: item.userId,
            content: '',
            text: item.text,
            postId: null,
            title: item.displayName,
            message: I18n.t('user_follows_you', {
              name: user.displayName,
            }),
            date: new Date(),
          };
          firebaseSdk.addActivity(activity, item.token).then(r => {});
        }
        setUser({followings: myFollowings});
        setState({...state, updating: false});
      })
      .catch(err => {
        setState({...state, updating: false});
      });
  };

  const renderItem = ({item}) => {
    let following = user.followings.includes(item.userId);
    // const isSelf = user.userId === item.userId;
    return (
      <TouchableOpacity
        onPress={() => {
          navigateToProfile(navigation, user, item);
        }}
        style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Image
            source={item.avatar ? {uri: item.avatar} : images.default_avatar}
            style={styles.itemImage}
          />
          <View style={styles.itemContent}>
            <Text
              style={[styles.itemText, {color: themes[theme].activeTintColor}]}>
              {item.displayName}
            </Text>
            <Text
              style={[styles.itemPost, {color: themes[theme].textColor}]}>{`${
              item.postCount
            } ${I18n.t('Posts').toLowerCase()}`}</Text>
          </View>
        </View>
        {isSelf && (
          <TouchableOpacity
            style={[
              styles.actionContainer,
              {
                backgroundColor: following
                  ? themes[theme].tintActive
                  : themes[theme].searchboxBackground,
              },
            ]}
            onPress={() => onToggleFollow(item, following)}>
            <Text
              style={[
                styles.actionText,
                {
                  color:
                    following && theme === 'light'
                      ? themes[theme].backgroundColor
                      : themes[theme].activeTintColor,
                },
              ]}>
              {following
                ? I18n.t('Following').toLowerCase()
                : I18n.t('Follow').toLowerCase()}
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator theme={theme} size={'large'} />;
    }
    return null;
  };

  const onRefresh = () => {
    setState({...state, refreshing: true});
    getData('');
  };

  const onTabClick = type => {
    if (type === 'followers') {
      setIsFollowersTab(true);
      setState({...state, type: 'followers'});
    } else {
      setIsFollowersTab(false);
      setState({...state, type: 'followings'});
    }
  };

  return (
    <View
      style={[
        sharedStyles.container,
        {backgroundColor: themes[theme].navbarBackground},
      ]}>
      <SafeAreaView
        style={[
          sharedStyles.contentContainer,
          {
            backgroundColor: themes[theme].backgroundColor,
            paddingTop: 10,
            paddingHorizontal: 10,
          },
        ]}>
        <StatusBar />
        <View style={styles.tab}>
          <TouchableOpacity
            onPress={() => onTabClick('followers')}
            style={[
              styles.tabItem,
              {
                borderBottomColor: !isFollwersTab
                  ? 'transparent'
                  : themes[theme].activeTintColor,
              },
            ]}>
            <Text
              style={[
                styles.tabItemText,
                {color: themes[theme].activeTintColor},
              ]}>
              {formatNumber(account.followers?.length) +
                '  ' +
                I18n.t('followers_lower')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onTabClick('followings')}
            style={[
              styles.tabItem,
              {
                borderBottomColor: isFollwersTab
                  ? 'transparent'
                  : themes[theme].activeTintColor,
              },
            ]}>
            <Text
              style={[
                styles.tabItemText,
                {color: themes[theme].activeTintColor},
              ]}>
              {formatNumber(account.followings?.length) +
                '  ' +
                I18n.t('followings_lower')}
            </Text>
          </TouchableOpacity>
        </View>
        {isSelf && (
          <SearchBox
            onChangeText={onSearchChangeText}
            testID="federation-view-search"
            placeholder={I18n.t('Search')}
          />
        )}
        {updating && (
          <ActivityIndicator absolute theme={theme} size={'large'} />
        )}
        <View style={styles.container}>
          {data.length > 0 && (
            <FlatList
              style={{height: '100%', marginTop: 10}}
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.userId}
              ListFooterComponent={renderFooter}
              ItemSeparatorComponent={() => (
                <View style={sharedStyles.listSeparator} />
              )}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={themes[theme].actionColor}
                />
              }
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(FollowView));
