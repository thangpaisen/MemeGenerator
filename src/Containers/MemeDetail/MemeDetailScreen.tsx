import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts } from '@/Constants'
import HeaderNormal from '../Home/Components/HeaderNormal'
import { useRoute } from '@react-navigation/native'
import { SCREEN_WIDTH, getExtensionFile, isAndroid, isIOS } from '@/Utils/common'
import AutoHeightImage from 'react-native-auto-height-image'
import { useCreateImage } from '@/Hooks/useCreateImage'
import Toast from 'react-native-toast-message'
import { Images } from '@/Assets'
import RNFetchBlob from 'rn-fetch-blob'
import Spinner from 'react-native-loading-spinner-overlay'

type Props = {}

const MemeDetailScreen = (props: Props) => {
  const route = useRoute<any>()
  const data = route.params?.data
  const [image, setImage] = useState(data?.blank)
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [loading, setLoading] = useState(false)

  const createSuccess = (data: any) => {
    setLoading(false)
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Create Image Success',
    })
    if (data?.url) {
      setImage(data.url)
    }
  }

  const { refetch } = useCreateImage(
    {
      template_id: data.id,
      text: [topText.trim(), bottomText.trim()],
    },
    createSuccess
  )

  const onPress = () => {
    setLoading(true)
    refetch()
  }
  const onPressDownload = () => {
    setLoading(true)
    const { config, fs } = RNFetchBlob
    let PictureDir = isAndroid() ? fs.dirs.PictureDir : fs.dirs.DocumentDir
    let ext: any = getExtensionFile(image)
    ext = '.' + ext[0]

    let options =
      Platform.OS === 'ios'
        ? {
            fileCache: false,
            appendExt: getExtensionFile(image)?.[0],
            notification: true,
            path: PictureDir + '/meme' + ext,
          }
        : {
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              path:
                PictureDir +
                '/meme_' +
                Math.floor(new Date().getTime() + new Date().getSeconds() / 2) +
                ext,
              description: 'Image',
            },
          }
    config(options)
      .fetch('GET', image)
      .then((res: any) => {
        setLoading(false)
        if (isIOS()) {
          setTimeout(() => {
            RNFetchBlob.ios.openDocument(res.data)
          }, 300)
        }
        handleDownloadImageSuccess()
      })
  }

  const handleDownloadImageSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: `Download Image Success.`,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={loading} />
      <StatusBar translucent={false} backgroundColor={Colors.white} />
      <View style={styles.container}>
        <HeaderNormal title={data?.name} />
        <ScrollView contentContainerStyle={styles.body}>
          <View style={styles.viewInput}>
            <Text style={styles.txt}>Top Text: </Text>
            <TextInput
              value={topText}
              onChangeText={setTopText}
              style={styles.input}
              placeholder='meme top text'
              placeholderTextColor={Colors.colorA3A9AC}
            />
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.txt}>Buttom Text: </Text>
            <TextInput
              value={bottomText}
              onChangeText={setBottomText}
              style={styles.input}
              placeholder='meme bottom text'
              placeholderTextColor={Colors.colorA3A9AC}
            />
          </View>
          <View style={styles.viewBtn}>
            <TouchableOpacity style={styles.btn} onPress={onPress}>
              <Text style={styles.txtBtn}>Create meme</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={onPressDownload}>
              <Text style={styles.txtBtn}>Download</Text>
            </TouchableOpacity>
          </View>
          <AutoHeightImage
            style={styles.img}
            width={SCREEN_WIDTH - 40}
            source={{ uri: image }}
            loadingIndicatorSource={Images.Loading}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default MemeDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: 10,
  },

  body: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 10,
  },
  viewInput: {
    marginTop: 10,
  },
  txt: {
    color: '#000',
    fontSize: 16,
    fontFamily: Fonts.BeVietnamProSemiBold,
  },
  input: {
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.colorD9D9D9,
    paddingHorizontal: 10,
    color: Colors.black,
    paddingVertical: 8,
  },
  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  btn: {
    backgroundColor: Colors.yellow,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  txtBtn: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  img: {
    marginTop: 20,
    alignSelf: 'center',
    width: SCREEN_WIDTH - 40,
    backgroundColor: '#99999922',
  },
})
