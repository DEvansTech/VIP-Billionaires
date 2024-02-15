import React, {useEffect} from 'react';
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import StatusBar from '../../containers/StatusBar';
import {withTheme} from '../../theme';
import styles from './styles';
import sharedStyles from '../Styles';
import {setUser as setUserAction} from '../../actions/login';
import images from '../../assets/images';
import {COLOR_YELLOW, themes} from '../../constants/colors';
import I18n from '../../i18n';
import {SITE_VIP_MEMBERS_URL} from '../../constants/app';
import {VectorIcon} from '../../containers/VectorIcon';

const VipMembersClubView = props => {
  const {theme} = props;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.toggleDrawer()}>
          <VectorIcon
            type="MaterialCommunityIcons"
            name="arrow-left"
            color={themes[theme].titleColor}
            size={24}
          />
        </TouchableOpacity>
      ),
      title: I18n.t('Vip_members'),
      headerRight: () => <></>,
      headerStyle: {
        backgroundColor: themes[theme].backgroundColor,
        shadowOpacity: 0,
      },
    });
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.headerView}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => navigation.toggleDrawer()}>
            <VectorIcon
              size={20}
              name={'arrowleft'}
              type={'AntDesign'}
              color={themes[theme].activeTintColor}
              style={{marginLeft: 18}}
            />
          </TouchableOpacity>
          <Text style={[styles.headerText, {color: themes[theme].titleColor}]}>{I18n.t('Back')}</Text>
        </View>
      ),
      title: null,
      headerStyle: {
        backgroundColor: themes[theme].backgroundColor,
        shadowOpacity: 0,
      },
    });
  }, [theme]);

  return (
    <View
      style={[
        sharedStyles.container,
        {backgroundColor: themes[theme].navbarBackground},
      ]}>
      <StatusBar />
      <View
        style={[
          sharedStyles.contentContainer,
          {backgroundColor: themes[theme].backgroundColor, height: '100%'},
        ]}>
        <View style={styles.headerContainer}>
          <Image style={styles.logo} source={images.logo} />
        </View>
        <Text
          style={[
            styles.mainText,
            {marginTop: 20, color: themes[theme].activeTintColor},
          ]}>
          {I18n.t('club_title_1')}
        </Text>
        <Text style={[styles.subText, {color: themes[theme].activeTintColor}]}>
          {I18n.t('club_title_3')}
        </Text>
        <TouchableOpacity
          style={[styles.actionBtn, {backgroundColor: COLOR_YELLOW}]}
          onPress={() => Linking.openURL(SITE_VIP_MEMBERS_URL)}>
          <Image source={images.become_member} style={styles.iconStyle} />
          <Text style={styles.actionText}>{I18n.t('become_a_member')}</Text>
        </TouchableOpacity>
      </View>
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
)(withTheme(VipMembersClubView));