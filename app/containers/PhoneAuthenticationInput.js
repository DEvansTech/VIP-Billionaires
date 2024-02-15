import {View, StyleSheet, Text, Switch} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import {COLOR_RED, themes} from '../constants/colors';
import { useState } from 'react';

const styles = StyleSheet.create({
  iconWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  editText: {
    paddingHorizontal: 12,
    fontSize: 14,
    lineHeight: 16,
  },
  phoneInput: {
    paddingHorizontal: 12,
    fontSize: 14,
    lineHeight: 16,
  },
  error: {
    fontFamily: 'Raleway',
    fontSize: 14,
    lineHeight: 16,
    color: COLOR_RED,
    marginTop: 4,
  },
  container: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    display: 'flex',
    paddingStart: 12,
    paddingVertical: 10,
  },
  labelText: {
    fontFamily: 'Raleway',
    marginBottom: 8,
    marginLeft: 0,
    fontSize: 14,
    lineHeight: 16,
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const PhoneAuthenticationInput = props => {
  const {inputRef, label, theme, error, backgroundColor, value} = props;

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(prevState => !prevState);

  return (
    <View style={{marginBottom: 16}}>
      <Text style={[styles.labelText, {color: themes[theme].normalTextColor}]}>
        {label}
      </Text>
      <View
        style={[
          styles.container,
          styles.wrap,
          {
            borderColor: error ? COLOR_RED : themes[theme].borderColor,
          },
        ]}>
        <View style={{flexGrow: 1}}>
          <PhoneInput
            ref={inputRef}
            offset={1}
            textStyle={[
              styles.phoneInput,
              {
                backgroundColor: backgroundColor ?? 'transparent',
                color: themes[theme].activeTintColor,
              },
            ]}
            initialValue={value}
          />
        </View>
        <Switch 
          onValueChange={toggleSwitch}
          ios_backgroundColor={'#3e3e3e'}
          style={{transform: [{scaleX: .9}, {scaleY: .7}], marginRight:10}}
          value={isEnabled}/>
      </View>
    </View>
  );
};

export default PhoneAuthenticationInput;
