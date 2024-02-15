import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  headerView: {
    flexDirection:'row', 
    alignItems:'center',
    height: 60,
    marginTop:Platform.OS == 'ios' ? 50 : 0
  },
  header: {
    flexDirection: 'row',
    paddingRight:20
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  title: {
    fontFamily: 'Hind Vadodara',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  subTitle: {
    fontFamily: 'Hind Vadodara',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 4,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Hind Vadodara',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
  itemLeft: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  itemCenter: {
    marginHorizontal: 10,
  },
  itemText: {
    fontFamily: 'Hind Vadodara',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
  },
  imageView: {
    width: 48,
    height: 48,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textsContainer: {
    marginLeft: 14,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  smallText: {
    fontFamily: 'Raleway',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  
  modalContent: {
    backgroundColor: 'red',
    paddingVertical: 24,
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontWeight: '600',
    fontFamily: 'Hind Vadodara',
    fontSize: 18,
    lineHeight: 28,
    marginVertical: 8,
    textAlign: 'center',
  },
})
