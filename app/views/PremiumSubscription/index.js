import React, {useEffect, useMemo} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import StatusBar from '../../containers/StatusBar';
import {withTheme} from '../../theme';
import styles from './styles';
import sharedStyles from '../Styles';
import {setUser as setUserAction} from '../../actions/login';
import images from '../../assets/images';
import {COLOR_BTN_BACKGROUND, COLOR_YELLOW, themes} from '../../constants/colors';
import I18n from '../../i18n';
import {VectorIcon} from '../../containers/VectorIcon';
import scrollPersistTaps from '../../utils/scrollPersistTaps';

const PremiumSubscription = props => {
  const navigation = useNavigation();
  const {theme, user, setUser} = props;

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
  }, [theme])

  const options = useMemo(() => [
    "Upgraded Profile",
    "Multi-shot & video",
    "Instant creative portfolio",
    "Sell goods",
    "A good content support"
  ], []);

  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: themes[theme].backgroundColor}}>
      <StatusBar />

      <ScrollView contentContainerStyle={{flexGrow:1}} style={{
          paddingHorizontal: 16,
          paddingTop:15
        }}
        {...scrollPersistTaps}>
        <View style={[styles.container, {backgroundColor: themes[theme].commentCardBox}]}>
          <Image source={images.premium} />

          <Text style={[styles.title, {color: themes[theme].activeTintColor}]}>{I18n.t('premium_title')}</Text>
          <Text style={[styles.detail, {color: themes[theme].textColor}]}>{I18n.t('premium_detail')}</Text>
          <Text style={[styles.moneyText, {color: themes[theme].activeTintColor}]}>{'$5000'}</Text>
          <Text style={[styles.detail, {color: themes[theme].textColor, marginTop: 0}]}>{I18n.t('per_month')}</Text>
          <View style={[styles.optionsBox]}>
            {options.map(option => (
              <View style={styles.optionContainer}>
                <VectorIcon
                  type={'MaterialCommunityIcons'}
                  name={'check-circle-outline'}
                  color={themes[theme].activeTintColor}
                  size={20}
                />
                <Text style={[styles.optionText, {color: themes[theme].textColor}]}>{option}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            onPress={() => {}}
            style={[
              styles.continueTxtBtn,
              {backgroundColor: COLOR_BTN_BACKGROUND},
            ]}>
            <Text
              style={[
                styles.editProfileTxt,
                {color: themes[theme].normalTextColor},
              ]}>
              {I18n.t('Continue')}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.detail, {color: themes[theme].textColor}]}>
            {I18n.t('cancel_anytime')}
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )

}

export default withTheme(PremiumSubscription);