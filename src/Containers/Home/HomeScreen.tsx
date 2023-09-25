import { Colors } from '@/Constants'
import { useListMeme } from '@/Hooks/useListMeme'
import { SCREEN_WIDTH } from '@/Utils/common'
import React from 'react'
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import Image from 'react-native-fast-image'
import CardImage from './Components/CardImage'
import Header from './Components/Header'

const HomeScreen = () => {
  const { data } = useListMeme()

  const renderItem = ({ item }: any) => {
    return <CardImage data={item} />
  }

  return (
    //     <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Header />
      <FlatList
        data={data}
        keyExtractor={(item) => item?.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
    //     </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
})
