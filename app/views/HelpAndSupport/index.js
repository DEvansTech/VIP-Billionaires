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

const HelpAndSupport = props => {
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
      title: null,
      headerRight: () => <></>,
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
          We are sorry you are having issues with our app
        </Text>
        <Text style={[styles.subText, {color: themes[theme].activeTintColor}]}>
          To contact support please click below
        </Text>
        <TouchableOpacity
          style={[styles.actionBtn, {backgroundColor: COLOR_YELLOW}]}
          onPress={() => Linking.openURL(SITE_VIP_MEMBERS_URL)}>
          <Image source={images.mail} style={styles.iconStyle} />
          <Text style={styles.actionText}>Send us an Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default withTheme(HelpAndSupport);