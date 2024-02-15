import React, {useRef, useState} from 'react';
import {Text, View, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {withTheme} from '../../theme';
import styles from './styles';
import Modal from 'react-native-modal';
import {themes, COLOR_BTN_BACKGROUND} from '../../constants/colors';
import FloatingTextInput from '../../containers/FloatingTextInput';
import I18n from '../../i18n';
import CheckBox from '../../containers/CheckBox';
import { VectorIcon } from '../../containers/VectorIcon';

const DeleteAccountModal = ({isShow, onClose, theme}) => {
  const [password, setPassword] = useState('');
  const passwordInput = useRef(null);
  const [checked, setChecked] = useState(false);

  const onSubmit = () => {
    console.log(password)
  };

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
            Delete Account
          </Text>

          <FloatingTextInput
            style={{
              color: themes[theme].activeTintColor,
              height: 56,
              padding: 8,
              radius: 8,
            }}
            inputRef={passwordInput}
            returnKeyType="next"
            textContentType="oneTimeCode"
            label={'Password'}
            secureTextEntry
            placeholder={'Enter Your Password'}
            onChangeText={text => setPassword(text)}
            theme={theme}
            onSubmitEditing={onSubmit}
          />
          <CheckBox
            title={"Agree to delete account."}
            checked={checked}
            textStyle={{color: themes[theme].normalTextColor}}
            onPress={()=>setChecked(!checked)}
          />
          <TouchableOpacity
            onPress={onSubmit}
            style={[
              styles.editProfileTxtBtn,
              {backgroundColor: COLOR_BTN_BACKGROUND},
            ]}>
            <Text
              style={[
                styles.editProfileTxt,
                {color: themes[theme].normalTextColor},
              ]}>
              {I18n.t('submit')}
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
)(withTheme(DeleteAccountModal));