import React, {useRef, useState} from 'react';
import {Text, View, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {withTheme} from '../../theme';
import styles from './styles';
import Modal from 'react-native-modal';
import {themes, COLOR_BTN_BACKGROUND} from '../../constants/colors';
import FloatingTextInput from '../../containers/FloatingTextInput';
import I18n from 'i18n-js';

const AccountSettingsModal = ({isShow, onClose, theme}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const nameInput = useRef(null);
  const usernameInput = useRef(null);
  const onClick = item => {};

  return (
    <KeyboardAvoidingView>
      <Modal
        // transparent={true}
        isVisible={isShow}
        avoidKeyboard
        onBackdropPress={onClose}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View
          style={[
            styles.modalContent,
            {backgroundColor: themes[theme].backgroundColor},
          ]}
          onPressOut={onClose}>
          <Text style={[styles.modalTitle, {color: themes[theme].titleColor}]}>
            Account Setting
          </Text>

          <FloatingTextInput
            multiline
            returnKeyType="next"
            textContentType="oneTimeCode"
            label={I18n.t('Name')}
            placeholder={I18n.t('enter_name')}
            onChangeText={name => setName({name})}
            theme={theme}
            onSubmitEditing={() => {
              usernameInput.current.focus();
            }}
          />
          <FloatingTextInput
            multiline
            inputRef={usernameInput}
            textContentType="oneTimeCode"
            label={I18n.t('Username')}
            placeholder={I18n.t('Enter_username')}
            onChangeText={username => setUsername({username})}
            theme={theme}
          />

          <TouchableOpacity
            onPress={() => console.log(username, name)}
            style={[
              styles.editProfileTxtBtn,
              {backgroundColor: COLOR_BTN_BACKGROUND},
            ]}>
            <Text
              style={[
                styles.editProfileTxt,
                {color: themes[theme].normalTextColor},
              ]}>
              {I18n.t('Save')}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(AccountSettingsModal));