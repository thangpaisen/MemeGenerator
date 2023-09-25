/* eslint-disable react-hooks/rules-of-hooks */
import { Dimensions, Platform } from 'react-native'

const isIOS = () => {
  return Platform.OS === 'ios'
}

const isAndroid = () => {
  return Platform.OS === 'android'
}

const formatNumber = (x: number) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const getExtensionFile = (filename: any) => {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export { isIOS, isAndroid, SCREEN_WIDTH, SCREEN_HEIGHT, formatNumber, getExtensionFile }
