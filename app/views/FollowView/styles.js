import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {},
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: {
    flexDirection: 'column',
    marginLeft: 8,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemPost: {
    fontSize: 14,
  },
  itemAction: {
    width: 100,
    height: 24,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContainer: {
    width: 100,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontWeight: 'bold',
  },
  emptyContainer: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    marginBottom: 20,
  },
  tabItem: {
    width: 130,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    fontSize: 14,
    fontWeight: '500',
  }
});
