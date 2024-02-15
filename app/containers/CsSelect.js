import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import sharedStyles from '../views/Styles'
import { themes } from '../constants/colors'
import { VectorIcon } from './VectorIcon'

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: width * 0.92,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    height: 56
  },
  label: {
    fontFamily: 'Raleway',
    fontWeight: '400',
    marginBottom: 5,
    fontSize: 14
  },
  iosPadding: {
    height: 50,
    justifyContent: 'center',
  },
  wrap: {
    position: 'relative',
  },
  viewContainer: {
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1,
    flexGrow: 1,
  },
  pickerText: {
    ...sharedStyles.textRegular,
    fontSize: 14,
    paddingHorizontal: 14,
  },
  icon: {
    marginRight: 12,
  },
  iosIcon: {
    paddingVertical: 10,
  },
  loading: {
    padding: 0,
  },
  iconStyle: {

  },
  modalItems:{
    width: width * 0.9,
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    maxHeight: height * 0.6,
    paddingTop: 40,
    paddingBottom: 30,
    borderRadius: 10
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 9999
  },
  itemContainer:{
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  }
})

export const CsSelect = React.memo(
  ({
     label,
     options = [],
     placeholder,
     value,
     theme,
     onSelect
   }) => {

    const [selected, setSelected] = useState(false)

    const items = options.map(option => ({
      label: option,
      value: option,
    }))

    const [showItems, setShowItems] = useState(false);

    const onSelectItem = (value) => {
      onSelect(value)
      setSelected(true)
      setShowItems(false)
    }

    return (
      <>
        {label && <Text style={[styles.label, {color:themes[theme].textColor}]}>{label}</Text>}
        <TouchableOpacity
          style={[styles.container, {borderColor: themes[theme].messageOtherBackground}]}
          onPress={() => setShowItems(!showItems)}>
          <Text style={[ { color: selected ? '#000000' : '#C4C4C4' } ]}>{!selected ? placeholder : value}</Text>
          <VectorIcon
            type={'Entypo'}
            name={selected ? 'chevron-thin-right' : 'chevron-thin-down'}
            color={themes[theme].activeTintColor}
            size={14}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <Modal isVisible={showItems} onBackdropPress={() => setShowItems(false)}>
          <View style={styles.modalItems}>
            <VectorIcon
              type="AntDesign"
              name="close"
              size={20}
              style={styles.closeIcon}
              onPress={() => setShowItems(false)}
            />
            <ScrollView>
              {items.map(item => (
                <TouchableOpacity style={styles.itemContainer} onPress={()=>onSelectItem(item.value)}>
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </>
    );
  },
)
