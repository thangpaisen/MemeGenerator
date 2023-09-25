import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Images } from '@/Assets'
import { Texts } from '@/Constants'
import { useAppDispatch } from '@/Hooks'
import { SCREEN_WIDTH } from '@/Utils/common'

type Props = {
  data: any
}

const CardImage = ({ data }: Props) => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)

  const handleShowImageDetail = (): void => {
    navigation.dispatch(
      StackActions.push(Texts.MemeDetailScreen, {
        data,
      })
    )
  }

  return (
    <TouchableOpacity onPress={handleShowImageDetail} style={styles.viewImage}>
      {loading && <Image source={Images.Loading} style={{ ...styles.imgTmp }} />}
      <FastImage
        source={{ uri: data?.blank }}
        style={{ ...styles.imageItem }}
        onLoadEnd={() => {
          setLoading(false)
        }}
      />
    </TouchableOpacity>
  )
}

export default React.memo(CardImage)

const styles = StyleSheet.create({
  viewImage: {
    width: (SCREEN_WIDTH - 40) / 2,
    height: (SCREEN_WIDTH - 40) / 2,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0, 0, 0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imgTmp: {
    borderRadius: 10,
    position: 'absolute',
    width: SCREEN_WIDTH / 8,
    resizeMode: 'contain',
    aspectRatio: 1,
  },
  imageItem: {
    width: '100%',
    aspectRatio: 1,
  },
})
