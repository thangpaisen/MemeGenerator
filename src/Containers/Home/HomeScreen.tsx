import { Colors } from '@/Constants'
import { useListMeme } from '@/Hooks/useListMeme'
import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import CardImage from './Components/CardImage'
import Header from './Components/Header'

const HomeScreen = () => {
  const { data } = useListMeme()

  const renderItem = ({ item }: any) => {
    return <CardImage data={item} />
  }

  const renderLoading = () => {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={'small'} color={'blue'} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 10,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderLoading}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
