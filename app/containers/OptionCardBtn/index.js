import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import styles from './style'
import { themes } from '../../constants/colors'
import { VectorIcon } from '../VectorIcon'
import { useTheme } from '../../theme'


const OptionCardBtn = ({ image, title, smallTitle, subTextColor, smallText, rightIcon, rightIconName, onPressEvent }) => {
  const { theme } = useTheme()

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: themes[theme].messageOwnBackground },
      ]} onPress={onPressEvent}>
      <View style={styles.imageView}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.textsContainer}>
        <Text style={[styles.title, { color: themes[theme].activeTintColor, fontSize: smallTitle ? 14 : 16 }]}>
          {title}
        </Text>
        <Text
          style={[styles.smallText, { color: themes[theme].activeTintColor, ...subTextColor }]}>
          {smallText}
        </Text>
      </View>
      {rightIcon && (
        <VectorIcon
          type="Entypo"
          size={20}
          style={styles.rightIcon}
          name={rightIconName}
          color={themes[theme].activeTintColor}
        />
      )}
    </TouchableOpacity>
  )
}

export default OptionCardBtn
