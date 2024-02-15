import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';

import {
  COLOR_LIGHT_DARK,
  COLOR_RED,
  themes,
} from '../../constants/colors';
import StatusBar from '../../containers/StatusBar';
import {withTheme} from '../../theme';
import styles from './styles';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import I18n from '../../i18n';
import {VectorIcon} from '../../containers/VectorIcon';
import SidebarItem from '../SidebarView/SidebarItem';
import AccountSettingModal from './AccountSettingsModal';
import DeleteAccountModal from './DeleteAccountModal';
import ActivityIndicator from '../../containers/ActivityIndicator'
import firebaseSdk from '../../lib/firebaseSdk'
import { logout as logoutAction } from '../../actions/login'
import { showErrorAlert } from '../../lib/info'

const PrivacyAndSettingsView = props => {
  const {user, theme, navigation} = props;
  const [isShowAccountSettings, onShowAccountSettings] = useState(false);
  const [isShowPasswordSettings, onShowPasswordSettings] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // test
  // const [name, setName] = useState('');
  // const [username, setUsername] = useState('');

  useEffect(() => {
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
          <Text style={[styles.headerText, {color: themes[theme].titleColor}]}>{I18n.t('Back_To_Menu')}</Text>
        </View>
      ),
      title: null,
      headerStyle: {
        backgroundColor: themes[theme].backgroundColor,
        shadowOpacity: 0,
      },
    });
  }, [theme]);

  const deleteAccount = password => {
    const {user, logout} = props;
    setLoading(true);

    firebaseSdk
      .signInWithEmail(user.email, password)
      .then(_ => {
        firebaseSdk
          .deleteUser(user.id)
          .then(_ => {
            setLoading(false);
            logout();
          })
          .catch(err => {
            setLoading(false);
            console.log('error', err);
          });
      })
      .catch(err => {
        setLoading(false);
        showErrorAlert(I18n.t('error-invalid-password'));
        console.log('error', err);
      });
  };

  const onNavigate = (routeName, params) => {
    const { navigation } = props
    navigation.navigate(routeName, params)
  }

  const renderFooter = () => {
    const { theme } = props
    if (loading) {
      return <ActivityIndicator style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }} theme={theme} size={'large'} />
    }
    return null
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themes[theme].backgroundColor,
      }}>
      <StatusBar />
      <ScrollView
        style={{
          flexGrow: 1,
          backgroundColor: themes[theme].backgroundColor,
          paddingHorizontal: 16,
        }}
        {...scrollPersistTaps}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
          }}>
          <VectorIcon
            style={{marginRight: 16}}
            type="MaterialCommunityIcons"
            name="shield-lock"
            color={COLOR_LIGHT_DARK}
            size={20}
          />
          <Text style={[styles.title, {color: themes[theme].titleColor}]}>
            {I18n.t('Privacy_and_settings')}
          </Text>
        </View>
        <SidebarItem
          text={I18n.t('Account_Settings')}
          onPress={() => onShowAccountSettings(true)}
          theme={theme}
          hasRight
        />
        <SidebarItem
          text={I18n.t('Privacy_Settings')}
          onPress={() => {onNavigate('MenuStack', {screen: 'PrivacySettings'})}}
          theme={theme}
          hasRight
        />

        <View style={{marginTop: 56, marginBottom: 16}}>
          <Text
            style={[
              styles.title,
              {color: themes[theme].titleColor, margin: 0},
            ]}>
            {I18n.t('Other_Settings')}
          </Text>
        </View>
        <SidebarItem
          text={I18n.t('Blocked_Users')}
          onPress={() => navigation.navigate('Block')}
          theme={theme}
          hasRight
        />
        <SidebarItem
          text={I18n.t('Delete_Account')}
          textStyle={{color: COLOR_RED}}
          onPress={() => setShowDeleteModal(true)}
          theme={theme}
        />
      </ScrollView>

      <AccountSettingModal
        isShow={isShowAccountSettings}
        theme={theme}
        onClose={() => onShowAccountSettings(false)}
        // name={name}
        // setName={setName}
        // username={username}
        // setUsername={setUsername}
      />
      <DeleteAccountModal
        isShow={showDeleteModal}
        theme={theme}
        onClose={() => setShowDeleteModal(false)}/>

    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = () => ({
  logout: params => dispatch(logoutAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(PrivacyAndSettingsView));
