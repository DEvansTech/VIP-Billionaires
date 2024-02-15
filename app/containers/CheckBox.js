import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLOR_BLACK_LIGHT, COLOR_BLUE } from '../constants/colors'
import { VectorIcon } from './VectorIcon'

const CheckBox = React.memo(
  ({
     title,
     checked,
     checkedColor,
     unCheckedColor,
     checkedIcon,
     uncheckedIcon,
     textStyle,
     containerStyle,
     onPress,
   }) => (
    <TouchableOpacity
      style={{
        ...containerStyle,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical:15,
        // borderWidth: 1,
        borderRadius: 11,
        // borderColor: checked ? COLOR_BLUE : COLOR_BLACK_LIGHT,
        // marginBottom: 5,
      }}
      onPress={onPress}>
      <VectorIcon
        type="AntDesign"
        name={checked ? "checkcircle" : "checkcircleo"}
        color={checked ? '#1BA050' : '#858585'}
        size={18}
      />
      {title ? (
        <Text style={{ marginLeft: 10, ...textStyle }}>{title}</Text>
      ) : null}
    </TouchableOpacity>
  ),
)
export default CheckBox
