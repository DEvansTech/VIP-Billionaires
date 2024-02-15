import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
} from 'react-native';
import {TextInput} from 'react-native';

import {
  COLOR_BORDER,
  COLOR_RED,
  themes,
} from '../constants/colors';

const {width} = Dimensions.get('window');

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
    // flex: 1,
    paddingHorizontal: 12,
    fontSize: 14,
    lineHeight: 16,
  },
  textInput: {
    paddingHorizontal: 12,
    fontSize: 14,
    lineHeight: 16,
    flexGrow: 1,
    justifyContent: 'flex-start',
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
    position: 'relative',
  },
});

const FloatingTextInput = props => {
  const {
    label,
    required,
    error,
    loading,
    secureTextEntry,
    containerStyle,
    isEdit,
    inputRef,
    iconLeft,
    iconRight,
    inputStyle,
    wrapStyle,
    testID,
    placeholder,
    theme,
    outlineColor,
    backgroundColor,
    multiline,
    value,
    onSubmit,
    style,
    ...inputProps
  } = props;

  const [showPassword, setShowPassword] = useState(!secureTextEntry);
  const [readonly, setReadonly] = useState(isEdit === true ? true : false);

  const handleEdit = () => {
    if (!readonly) {
      onSubmit();
    }
    setReadonly(!readonly);
  };

  const renderEdit = () => {
    return (
      <Pressable
        onPress={handleEdit}>
        <Text
          style={[
            styles.editText,
            {
              backgroundColor: backgroundColor ?? 'transparent',
              color: themes[theme].activeTintColor,
            },
          ]}>
          {readonly ? 'Edit' : 'Save'}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={{marginBottom: 16}}>
      <Text style={[styles.labelText, {color: themes[theme].textColor}]}>
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
        <TextInput
          ref={inputRef}
          value={value}
          style={[
            styles.textInput,
            {
              backgroundColor: backgroundColor ?? 'transparent',
              color: themes[theme].activeTintColor,
              textAlignVertical: 'center',
              padding: multiline ? 12 : 6,
              height: 54
            }
          ]}
          outlineColor={error ? COLOR_RED : outlineColor || COLOR_BORDER}
          activeOutlineColor={error ? COLOR_RED : themes[theme].textColor}
          theme={{
            colors: {
              text: error ? COLOR_RED : themes[theme].activeTintColor,
            },
          }}
          secureTextEntry={!showPassword}
          placeholder={placeholder}
          placeholderTextColor={themes[theme].subTextColor}
          editable={!readonly}
          {...inputProps}
        />
        {isEdit && renderEdit()}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

FloatingTextInput.defaultProps = {
  error: '',
};

export default FloatingTextInput;
