import { View, Text } from 'react-native'
import React from 'react'

import styles from './stlye'
import { VectorIcon } from '../VectorIcon'
import { themes } from '../../constants/colors'
import { useTheme } from '../../theme'


const ExperienceUploaded = ({ salary, jobTitle, companyName, numberOfYears, showCloseIcon }) => {

  const theme = 'light'

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.jobTitle, { color: themes[theme].titleColor }]}>{jobTitle}</Text>
        <Text style={[styles.companyNameAndNumberOfYears, { color: themes[theme].titleColor }]}>
          {companyName} | {numberOfYears}
        </Text>
        <Text style={{color: '#858585'}}>
          {' '}
          <Text style={[styles.salaryText]}>{salary}</Text> USD / per year{' '}
        </Text>
      </View>
      {showCloseIcon && (
        <VectorIcon
          type="Ionicons"
          name="close-outline"
          size={20}
          color="#858585"
          style={styles.closeIcon}
        />
      )}
    </View>
  );
}

export default ExperienceUploaded