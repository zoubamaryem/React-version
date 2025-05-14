"use client"

import { useContext, useCallback } from "react"
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { BookContext } from "../context/BookContext"
import BookItem from "../components/BookItem"
import LoadingIndicator from "../components/LoadingIndicator"
import ErrorMessage from "../components/ErrorMessage"

const HomeScreen = ({ navigation }) => {
  const { books, loading, error, refreshBooks } = useContext(BookContext)

  useFocusEffect(
    useCallback(() => {
      refreshBooks()
    }, [refreshBooks]),
  )

  const handleAddBook = () => {
    navigation.navigate("AddBook")
  }

  if (loading && books.length === 0) {
    return <LoadingIndicator message="Loading books..." />
  }

  return (
    <View style={styles.container}>
      {error && <ErrorMessage message={error} onRetry={refreshBooks} />}

      <FlatList
        data={books}
        keyExtractor={(item) => item.isbn}
        renderItem={({ item }) => <BookItem book={item} />}
        refreshing={loading}
        onRefresh={refreshBooks}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No books found</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddBook}>
              <Text style={styles.addButtonText}>Add your first book</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={handleAddBook}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#4361ee",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#4361ee",
    borderRadius: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabIcon: {
    fontSize: 24,
    color: "white",
  },
})

export default HomeScreen
