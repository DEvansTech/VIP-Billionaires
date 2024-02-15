import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    padding:20,
    borderRadius:8,
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    paddingRight:20
  },
  headerView: {
    flexDirection:'row', 
    alignItems:'center'
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 15
  },
  detail: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 10,
    textAlign:'center',
    lineHeight:17
  },
  moneyText: {
    fontSize: 45,
    fontWeight: '600',
    marginTop: 25,
    fontFamily: 'Hind Vadodara',
  },
  optionsBox: {
    marginTop: 13,
    padding: 10
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  optionText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    marginLeft: 12
  },
  continueTxtBtn: {
    width: '100%',
    height: 46,
    borderRadius: 8,
    marginTop: 22,
    marginBottom: 18,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  }
});