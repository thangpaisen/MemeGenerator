import { Colors } from '@/Constants'
import { useListMeme } from '@/Hooks/useListMeme'
import React, { useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import CardImage from './Components/CardImage'
import Header from './Components/Header'

const HomeScreen = () => {
  // Fetch meme templates
  const { data, isFetching } = useListMeme()

  // Local state for search query
  const [searchQuery, setSearchQuery] = useState('')

  // Normalize the source list to an array
  const memeList = Array.isArray(data) ? data : []

  // Filter memes by name/title based on the search query (case-insensitive)
  const filteredMemes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return memeList
    return memeList.filter((item: any) => {
      const name = String(item?.name || '').toLowerCase()
      const title = String(item?.title || '').toLowerCase()
      return name.includes(query) || title.includes(query)
    })
  }, [memeList, searchQuery])

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

  // Render when no items match the search query
  const renderNoResults = () => {
    return (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsText}>No memes found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header />
      {/* Search input */}
      <View style={styles.searchContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={'Search for memes like Drake or Boyfriend...'}
          placeholderTextColor={Colors.colorA3A9AC}
          style={styles.searchInput}
          returnKeyType={'search'}
          autoCorrect={false}
          autoCapitalize={'none'}
          clearButtonMode={'while-editing'}
        />
      </View>
      <FlatList
        data={filteredMemes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 10,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        // Show loading while fetching initial data; otherwise show "No memes found"
        ListEmptyComponent={isFetching ? renderLoading : renderNoResults}
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
  searchContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: Colors.colorD9D9D9,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: Colors.black,
    backgroundColor: '#FFFFFF',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  noResultsText: {
    color: Colors.colorA3A9AC,
  },
})
