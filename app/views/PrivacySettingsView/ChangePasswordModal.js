import React, {useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {withTheme} from '../../theme';
import styles from './styles';
import Modal from 'react-native-modal';
import {themes} from '../../constants/colors';
import FloatingTextInput from '../../containers/FloatingTextInput';
import Button from '../../containers/Button';
import I18n from 'i18n-js';
import {setUser as setUserAction} from '../../actions/login';
import firebaseSdk from '../../lib/firebaseSdk';
import {showToast} from '../../lib/info';

const ChangePasswordModal = ({isShow, onClose, theme, user, setUser}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const oldPasswordInput = useRef(null);
  const newPasswordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

  const isValid = () => {
    if (!oldPassword.length) {
      showToast(I18n.t('please_enter_old_password'));
      oldPasswordInput.current.focus();
      return false;
    }
    if (!newPassword.length) {
      showToast(I18n.t('please_enter_password'));
      newPasswordInput.current.focus();
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isValid()) {
      setIsLoading(true);

      firebaseSdk
        .reauthenticate(user.email, oldPassword)
        .then(() => {
          firebaseSdk
            .updateCredential(user.email, newPassword)
            .then(async () => {
              setIsLoading(false);
              showToast(I18n.t('Updating_security_complete'));
            })
            .catch(err => {
              setIsLoading(false);
              showErrorAlert(I18n.t('Updating_security_failed'));
              console.log('error', err);
            });
        })
        .catch(err => {
          setIsLoading(false);
          showErrorAlert(I18n.t('error-invalid-email_or_password'));
        });
    }
  };

  return (
    <Modal
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
          Change Password
        </Text>
        <FloatingTextInput
          inputRef={oldPasswordInput}
          returnKeyType="next"
          label={I18n.t('old_password')}
          placeholder={I18n.t('enter_old_password')}
          onChangeText={pwd => setOldPassword(pwd)}
          theme={theme}
          onSubmitEditing={() => {
            newPasswordInput.current.focus();
          }}
        />

        <FloatingTextInput
          inputRef={newPasswordInput}
          label={I18n.t('new_password')}
          placeholder={I18n.t('enter_new_password')}
          onChangeText={pwd => setNewPassword(pwd)}
          theme={theme}
        />

        <FloatingTextInput
          inputRef={confirmPasswordInput}
          label={I18n.t('confirm_password')}
          placeholder={I18n.t('confirm_new_password')}
          onChangeText={pwd => setConfirmPassword(pwd)}
          theme={theme}
        />

        <Button
          style={styles.submitBtn}
          title={I18n.t('Save')}
          size="W"
          onPress={onSubmit}
          testID="change-pwd-submit"
          loading={isLoading}
          theme={theme}
          pressingHighlight
        />
      </View>
    </Modal>
  );
};

const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = () => ({
  setUser: params => dispatch(setUserAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(ChangePasswordModal));
