import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image, Alert, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from "react-native-modal";
import {connect} from 'react-redux';

import styles from './style';
import images from '../../assets/images';
import {COLOR_WHITE, themes} from '../../constants/colors';
import StatusBar from '../../containers/StatusBar';
import {withTheme} from '../../theme';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import I18n from '../../i18n';
import {VectorIcon} from '../../containers/VectorIcon';
import Button from '../../containers/Button';
import {
  checkCameraPermission,
  checkPhotosPermission
} from '../../utils/permissions';
import BasicInfoModal from './BasicInfoModal';
import AddExperienceModal from './AddExperienceModal';
import firebaseSdk, {DB_ACTION_UPDATE} from '../../lib/firebaseSdk';
import {showErrorAlert, showToast} from '../../lib/info';
import ActivityIndicator from '../../containers/ActivityIndicator';
import { useNavigation, useRoute } from '@react-navigation/native';
import {setUser as setUserAction} from '../../actions/login';

const imagePickerConfig = {
  cropping: true,
  freeStyleCropEnabled: true,
  width: 1200,
  height: 1500,
  enableRotationGesture: true,
  avoidEmptySpaceAroundImage: false,
  cropperChooseText: I18n.t('Choose'),
  cropperCancelText: I18n.t('Cancel'),
  mediaType: 'photo',
};

const theme = 'light';

const UpdateProfileAndBasicInfo = props => {
  const { user, setUser } = props;
  const navigation = useNavigation();

  const [state, setState] = useState({
    isLoading: false,
    profileImageUpdated : false,
    basicInfoUpdated: false,
    radioButtonChecked: false,
    experienceAdded: false
  })
  const [basicInfoModalOpen, setBasicInfoModalOpen] = useState(false);
  const [experienceModalOpen, setExperienceModalOpen] = useState(false);

  const {
    isLoading, 
    profileImageUpdated, 
    radioButtonChecked, 
    experienceAdded, 
    basicInfoUpdated
  } = state;

  useEffect(() => {
    
  }, [])

  const setSafeState = states => {
    setState({...state, ...states});
  };

  // open camera
  const takePhoto = async () => {
    if (await checkCameraPermission()) {
      ImagePicker.openCamera(imagePickerConfig).then(image => {
        onUploadProfileimage(image.path);
      });
    }
  };

  // choose from gallery
  const chooseFromLibrary = async () => {
    if (await checkPhotosPermission()) {
      ImagePicker.openPicker(imagePickerConfig).then(image => {
        onUploadProfileimage(image.path);
      });
    }
  };

  const updateUserDetails = (type, data) => {
    setSafeState({isLoading: true});
    firebaseSdk
    .setData(firebaseSdk.TBL_USER, DB_ACTION_UPDATE, data)
    .then(() => {
      setSafeState({isLoading: false});
      if (type === 'image') {
        setSafeState({profileImageUpdated: true});
      } else if (type === 'experience') {
        setSafeState({experienceAdded: true});
      } else {
        setSafeState({basicInfoUpdated: true});
      }
      const updateUser = {...user, ...data};
      setUser(updateUser);
    })
    .catch(err => {
      showToast(I18n.t(err.message));
      setSafeState({isLoading: false});
    });
  }

  const onUploadProfileimage = path => {
    setSafeState({isLoading: true});
    if (path) {
      firebaseSdk
        .uploadMedia(firebaseSdk.STORAGE_TYPE_AVATAR, path)
        .then(image_url => {
          let userInfo = {
            id: user.id,
            avatar: image_url,
          };

          updateUserDetails('image', userInfo);
        })
        .catch(err => {
          showErrorAlert(err, I18n.t('Oops'));
          setSafeState({isLoading: false});
        });
    }
  };

  const onUpdateExperience = (job, company, role, yearsOfService, sallery) => {
    if (!job || !company || !role || !yearsOfService || !sallery) return;

    setExperienceModalOpen(false);

    let userInfo = {
      id: user.id,
      job: job,
      company: company,
      role: role,
      years_of_service: yearsOfService,
      salary: sallery,
      acceptTerms: true
    };

    updateUserDetails('experience', userInfo);
  }

  const onUpdateBasicInfo = (name, gender, country, phone, birthday) => {
    if (!name || !gender || !country || !phone || !birthday) return;

    setBasicInfoModalOpen(false);

    let userInfo = {
      id: user.id,
      displayName: name,
      gender: gender,
      country: country,
      phone: phone,
      birthday: birthday
    };

    updateUserDetails('basic', userInfo);
  }

  const toggleAction = () => {
    Alert.alert('', I18n.t('Upload_profile_photo'), [
      {
        text: I18n.t('Cancel'),
        onPress: () => {},
      },
      {
        text: I18n.t('Take_a_photo'),
        onPress: () => {
          takePhoto();
        },
      },
      {
        text: I18n.t('Choose_a_photo'),
        onPress: () => {
          chooseFromLibrary();
        },
      },
    ]);
  };
  
  const onSubmit = () => {
    if (!profileImageUpdated) {
      showToast(I18n.t('please_upload_profile_image'));
      return
    }

    if (!basicInfoUpdated) {
      showToast(I18n.t('please_add_basic_information'));
      return
    }

    if (!experienceAdded) {
      showToast(I18n.t('please_add_experience'));
      return
    }

    if (!radioButtonChecked) {
      showToast(I18n.t('please_agree_with_terms'));
      return
    }

    navigation.navigate('ThankYou')
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: COLOR_WHITE}]}>
      <StatusBar />

      {/* Basic info modal */}
      <BasicInfoModal 
        isVisible={basicInfoModalOpen} 
        onBackdropPress={()=>setBasicInfoModalOpen(!basicInfoModalOpen)} 
        onUpdate={(name, gender, country, phone, birthday) => {
          onUpdateBasicInfo(name, gender, country, phone, birthday);
        }}/>

      {/* Experience modal */}
      <AddExperienceModal 
        isVisible={experienceModalOpen} 
        onBackdropPress={()=>setExperienceModalOpen(!experienceModalOpen)}
        onUpdate={(job, company, role, yearsOfService, sallery) => {
          onUpdateExperience(job, company, role, yearsOfService, sallery);
        }}/>

      <ScrollView
        style={{flex: 1, backgroundColor: COLOR_WHITE, height: '100%'}}
        {...scrollPersistTaps}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}>

        {isLoading && (
          <ActivityIndicator absolute theme={theme} size={'large'} />
        )}  

        <View style={styles.headerContainer}>
          <Image style={styles.logo} source={images.logo} />
          <Text style={[styles.welcomeText, {color: themes[theme].headerTitleColor}]}>
            {I18n.t('Onboard_text_welcome')}
          </Text>
          <Text style={styles.completeStepsText}>
            {I18n.t('please_complete_these_steps_to_confirm')}
          </Text>
        </View>
        
        {/* Upload Buttons container */}
        <View style={styles.uploadButtonsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={toggleAction}>
            <VectorIcon
              type="AntDesign"
              name="checkcircleo"
              color={profileImageUpdated ? '#1BA050' : '#858585'}
              size={18}
            />
            <Text style={styles.uploadProfileImageText}>
              {I18n.t('upload_profile_image')}
            </Text>
            <Text style={[styles.uploadNowText, {color: themes[theme].actionColor}]}>
              {I18n.t('upload_now')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={()=>setBasicInfoModalOpen(!basicInfoModalOpen)}>
            <VectorIcon
              type="AntDesign"
              name="checkcircleo"
                color={basicInfoUpdated ? '#1BA050' : '#858585'}
                size={18}
              />
              <Text style={styles.uploadProfileImageText}>
                {I18n.t('update_basic_information')}
              </Text>
              <Text style={[styles.uploadNowText, {color: themes[theme].actionColor}]}>
                {I18n.t('upload_now')}
              </Text>
            </TouchableOpacity>
        </View>

        {/* Add experience container */}
        <View style={styles.addExperienceContainer}>
          <Text style={styles.updateExperienceTxt}>{I18n.t('update_experience')}</Text>
          <TouchableOpacity style={styles.addExperienceBtn} 
            onPress={()=>setExperienceModalOpen(!experienceModalOpen)}>
            <Text style={[styles.addExperienceTxt, {color: themes[theme].otherAuxiliaryText}]}>
              {I18n.t('add_experience')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Other container */}
        <View style={styles.othersContainer}>
          <Text style={styles.updateExperienceTxt}>{I18n.t('others')}</Text>
          {/* <TouchableOpacity style={styles.basicSubscriptionBtn}>
            <Image source={images.reward_badge} style={styles.reward_badge} />
            <View style={styles.basicSubscriptionAndUpgradePlanContainer}>
              <Text style={styles.basicSubscriptionText}>
                Basic Supscription
              </Text>
              <Text style={styles.upgradePlanText}>upgrade plan</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inviteNowBtn}>
            <Image
              source={images.fast_email_sending}
              style={styles.fast_email_sending}
            />
            <View style={styles.basicSubscriptionAndUpgradePlanContainer}>
              <Text style={styles.inviteTitle}>
                Invite to engage more people
              </Text>
              <Text style={styles.inviteDescription}>Invite now</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </ScrollView>

      {/* Bottom sheet/terms and conditions */}
      <View style={styles.bottomSheet}>
        <View style={styles.radioButtonAndText}>
          <RadioButton.Android
            status={radioButtonChecked ? 'checked' : 'unchecked'}
            onPress={() => setSafeState({radioButtonChecked: !radioButtonChecked})}
            // style={styles.radioButton}
            color="#DBAA2E"
          />
          <Text style={styles.termsAndConditionsPrivacyPolicy}>
            I agree with the{' '}
            <Text style={styles.termsAndConditions} onPress={() => navigation.navigate('About', { type: 0 })}>Terms and Conditions</Text>{' '}
            and {'\n'}<Text style={styles.privacyPolicy} onPress={() => navigation.navigate('About', { type: 1 })}>Privacy Policy.</Text>
          </Text>
        </View>
        <Button
          title={I18n.t('confirm_create_account')}
          theme={theme}
          size="W"
          style={styles.confirmBtn}
          onPress={onSubmit}
          testID="confirn_create_account"
        />
      </View>
    </SafeAreaView>
  );
  
  
};

// export default withTheme(UpdateProfileAndBasicInfo);
const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(UpdateProfileAndBasicInfo))