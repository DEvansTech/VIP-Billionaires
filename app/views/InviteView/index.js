import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {Image, Text, TouchableOpacity, Dimensions, View, Linking, Share, ScrollView} from 'react-native';
import { COLOR_YELLOW, themes } from '../../constants/colors'
import {withTheme} from '../../theme';
import images from '../../assets/images';
import styles from './styles';
import I18n from '../../i18n';
import Modal from "react-native-modal";
import { INVITE_URL } from '../../constants/app'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const InviteView = props => {
  const { navigation, theme, isOpen, onClose } = props

  useEffect(() => {
    
  }, [isOpen])

  const shareFacebook = () => {
    let facebookParameters = [];
    if (INVITE_URL)
      facebookParameters.push('u=' + encodeURI(INVITE_URL));
    if (I18n.t('invite_content'))
      facebookParameters.push('quote=' + encodeURI(I18n.t('invite_content')));
    const url =
      'https://www.facebook.com/sharer/sharer.php?' + facebookParameters.join('&');
  
    Linking.openURL(url);
  }

  const shareTwitter = () => {
    let twitterParameters = [];
    if (INVITE_URL)
      twitterParameters.push('url=' + encodeURI(INVITE_URL));
    if (I18n.t('invite_content'))
      twitterParameters.push('text=' + encodeURI(I18n.t('invite_content')));
    
    const url =
      'https://twitter.com/intent/tweet?' + twitterParameters.join('&');

    Linking.openURL(url);
  }

  const onShare = async () => {
    try {
      await Share.share({
        message: I18n.t('invite_content'),
      })
    } catch (error) {
      console.log('Share error')
    }
  }

  const onClicked = (type) => {
    switch(type) {
      case 0:
        onShare()
        return;
      case 1:
        Linking.openURL(`https://www.linkedin.com/sharing/share-offsite/?url=${INVITE_URL}`);
        return;
      case 2:
        shareFacebook()
        return;
      case 3:
        shareTwitter()
        return;
      case 4:
        console.log('--Copy--')
        return;
      default:
        return
    }
  }


  if (isOpen) {
    return (
      <Modal
        isVisible={isOpen}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        animationInTiming={500}                
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        style={styles.container}
        propagateSwipe={true}
        backdropOpacity={0.6}> 

        <View style={[styles.modal_view, {backgroundColor:themes[theme].backgroundColor, width:deviceWidth}]}>
          <ScrollView style={{flex: 1}}>
            <View style={{flex: 1}}>
              <View style={{alignItems:'center'}}>
                <Image
                  source={images.invite_friend}
                  style={{width:94, height:73}}/>
                <Text style={[styles.headerText, {color: themes[theme].titleColor}]}>{I18n.t('invite_title')}</Text>
              </View>
              <View style={{marginTop:15}}>
                <Text style={[styles.label, {color: themes[theme].textColor}]}>{I18n.t('invite_body')}</Text>
                <View style={[styles.contentView, {backgroundColor:themes[theme].commentCardBox}]}>
                  <Text style={[styles.contentText, {color: themes[theme].textColor}]}>{I18n.t('invite_content')}</Text>
                </View>
                <Text style={[styles.label, {marginTop:20, color: themes[theme].textColor}]}>{I18n.t('invite_via')}</Text>
                <View style={styles.buttonView}>
                  <TouchableOpacity style={styles.button} onPress={()=>onClicked(0)}>
                    <Image source={theme === 'dark' ? images.call:images.call_dark}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={()=>onClicked(1)}>
                    <Image source={theme === 'dark' ? images.linkedin:images.linkedin_dark}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={()=>onClicked(2)}>
                    <Image source={theme === 'dark' ? images.facebook_icon:images.facebook_dark}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={()=>onClicked(3)}>
                    <Image source={theme === 'dark' ? images.twitter:images.twitter_dark}/>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.label, {marginTop:20, color: themes[theme].textColor}]}>{I18n.t('invite_url')}</Text>
                <View style={styles.urlView}>
                  <Text style={styles.invite_text}>{INVITE_URL}</Text>
                  <TouchableOpacity onPress={()=>onClicked(4)}>
                    <Text style={[styles.copy_text, {color: theme === 'dark' ? themes[theme].backgroundColor:themes[theme].textColor}]}>{I18n.t('Copy')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    )
  } else {
    return null
  }   
}

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
  
});
  
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(InviteView));
  