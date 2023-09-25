import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/Constants'
import { Images } from '@/Assets'
import { SCREEN_WIDTH } from '@/Utils/common'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

type Props = {}

const Header = (props: Props) => {
  const insets = useSafeAreaInsets()
  const statusBarHeight = insets.top
  console.log('statusBarHeight: ', statusBarHeight)

  const FocusAwareStatusBar = (props: any) => {
    const isFocused = useIsFocused()
    return isFocused ? <StatusBar {...props} /> : null
  }

  return (
    <>
      <FocusAwareStatusBar translucent={true} backgroundColor={'transparent'} />
      <View style={{ ...styles.header, paddingTop: statusBarHeight }}>
        <Image source={Images.Logo} style={styles.logo} />
      </View>
    </>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 10,
    paddingBottom: 10,
  },
  logo: {
    width: SCREEN_WIDTH / 2,
    height: 50,
  },
})
