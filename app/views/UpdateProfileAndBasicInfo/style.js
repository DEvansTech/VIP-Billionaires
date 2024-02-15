import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column'
  },
  logo: {
    height: 82,
    resizeMode: 'contain',
  },
  welcomeText: {
    marginTop: 9,
    fontSize: 16,
    fontFamily: 'Raleway',
    fontWeight: '600',
  },
  completeStepsText: {
    color: '#4A4A4A',
    fontFamily: 'Raleway',
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 9
  },
  uploadButtonsContainer: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  optionButton: {
    width: '99%',
    height: 54,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    marginVertical: 5,
    backgroundColor: '#ECEBEB',
    opacity: 5,
    alignSelf: 'center',
  },
  uploadNowText: {
    fontSize: 12,
    fontWeight: '700',
    position: 'absolute',
    right: 10
  },
  uploadProfileImageText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Hind Vadodara',
    fontWeight: '500'
  },
  addExperienceContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 15
  },
  addExperienceBtn: {
    width: '99%',
    height: 54,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    marginVertical: 5,
    backgroundColor: '#ECEBEB',
    opacity: 5,
    alignSelf: 'center',
  },
  addExperienceTxt: {
    alignSelf: 'center'
  },
  updateExperienceTxt: {
    fontFamily: 'Raleway',
    color: '#2F3131',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 15,
    marginLeft: 10
  },
  othersText: {
    fontFamily: 'Raleway',
    color: '#858585',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 15,
    marginLeft: 10
  },
  basicSubscriptionBtn: {
    width: '99%',
    height: 54,
    borderRadius: 6,
    flexDirection: 'row',
    paddingLeft: 10,
    marginVertical: 5,
    backgroundColor: '#B1B1B11A',
    opacity: 5,
    alignSelf: 'center',
    alignItems: 'center'
  },
  othersContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 15,
  },
  inviteNowBtn: {
    width: '99%',
    height: 54,
    borderRadius: 6,
    paddingLeft: 10,
    marginVertical: 5,
    backgroundColor: '#B1B1B11A',
    opacity: 5,
    alignSelf: 'center',
    flexDirection: 'row'
  },
  reward_badge: {
    resizeMode: 'contain',
    width: 40,
    height: 43.22
  },
  fast_email_sending: {
    resizeMode: 'contain',
    width: 40,
    height: 43.22
  },
  basicSubscriptionAndUpgradePlanContainer: {
    marginLeft: 14
  },
  basicSubscriptionText: {
    fontFamily: 'Hind Vadodara',
    fontWeight: '600',
    fontSize: 16
  },
  upgradePlanText: {
    fontFamily: 'Raleway',
    fontSize: 10
  },
  inviteTitle: {
    fontFamily: 'Hind Vadodara',
    fontWeight: '600',
    fontSize: 16
  },
  inviteDescription: {
    fontFamily: 'Raleway',
    fontSize: 10
  },
  bottomSheet: {
    width,
    alignSelf: 'center',
    backgroundColor: '#F8F8F8',
    position: 'absolute',
    bottom: 0,
    height: height * 0.2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 5,
  },
  termsAndConditions: {
    color: '#DBAA2E',
    fontSize: 14,
    lineHeight: 15
  },
  privacyPolicy: {
    color: '#DBAA2E',
  },
  termsAndConditionsPrivacyPolicy: {
    fontFamily: 'Raleway',
    fontSize: 14,
    marginTop: 5,
    marginLeft:5,
    lineHeight: 20
  },
  headerContainer: {
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 210,
  },
  confirmBtn: {
    height: 45,
    alignSelf: 'center',
    width: '100%',
    marginTop:18
  },
  radioButton: {
    position: 'absolute',
    right: 10
  },
  radioButtonAndText: {
    flexDirection: 'row',
    width:'100%',
    marginTop: 10
  },
  webviewHeader: {
    height:50, 
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal: 15,
    justifyContent:'space-evenly'
  },
  headerTitle: {
    flex: 1, 
    textAlign:'center',
    fontFamily: 'Hind Vadodara',
    fontWeight: '600',
    fontSize: 16
  },
  headerRight: {
    width: 50,
    height:'100%'
  },
  backTouch: {
    width: 50, 
    height:'100%', 
    justifyContent:'center'
  }
});

export default styles;
