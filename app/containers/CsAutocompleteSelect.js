import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View, Text, Platform } from 'react-native'
import { AutocompleteDropdownContextProvider, AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { themes } from '../constants/colors'
import { VectorIcon } from './VectorIcon'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width: width * 0.92,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    paddingRight: 10,
    justifyContent: 'space-between',
    height: 56,
    marginBottom: 15,
  },
  label: {
    fontFamily: 'Raleway',
    fontWeight: '400',
    marginBottom: 5,
    fontSize: 14,
  },
})

const CsAutocompleteSelect = ({
  leftIcon,
  data,
  onSelectItem,
  placeholder,
  theme,
  label,
}) => {

  const [show, setShow] = useState(false)
  useEffect(() => {
    // console.log('*******', data)
  }, [])

  const RightIcon = () => {
    return (
      <VectorIcon
        type={'Entypo'}
        name={show ? 'chevron-thin-up' : 'chevron-thin-right'}
        color={themes[theme].activeTintColor}
        size={14}
      />
    )
  }

  return (
    <View style={{zIndex: 100}}>
      <AutocompleteDropdownContextProvider>
        {label && <Text style={[styles.label, {color:themes[theme].textColor}]}>{label}</Text>}
        <View style={[styles.container, {borderColor: themes[theme].messageOtherBackground}]}>
          <View style={{flex:1}}>
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={false}
              dataSet={data}
              onSelectItem={onSelectItem}
              direction={Platform.select({ios: 'down'})}
              textInputProps={{
                placeholder: placeholder,
                autoCorrect: false,
                autoCapitalize: 'none',
                style: {
                  fontFamily: 'Raleway',
                  color: themes[theme].activeTintColor,
                  fontSize: 14,
                },
              }}
              inputContainerStyle={{
                backgroundColor: 'transparent',
                alignSelf: 'flex-end',
              }}
              suggestionsListContainerStyle={{
                width: width * 0.8,
                marginLeft: -20,
                marginTop: Platform.OS == 'ios' ? -150 : 0,
                backgroundColor: '#fff',
              }}
              containerStyle={{ flexGrow: 1, flexShrink: 1 }}
              showChevron={false}
              debounce={200}
              suggestionsListMaxHeight={height * 0.3}
              useFilter={true}
              inputHeight={50}
              nestedScrollEnabled={true}
            />
          </View>
          
          <RightIcon />
        </View>
      </AutocompleteDropdownContextProvider>
    </View>
    
  )
}

export default CsAutocompleteSelect
