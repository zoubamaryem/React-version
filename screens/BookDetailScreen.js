"use client"

import { useState, useEffect, useContext } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native"
import { BookContext } from "../context/BookContext"
import { fetchBookByIsbn } from "../api/bookApi"
import LoadingIndicator from "../components/LoadingIndicator"
import ErrorMessage from "../components/ErrorMessage"

const BookDetailScreen = ({ route, navigation }) => {
  const { isbn } = route.params
  const { removeBook } = useContext(BookContext)
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadBook = async () => {
      try {
        setLoading(true)
        const data = await fetchBookByIsbn(isbn)
        setBook(data)
        setError(null)
      } catch (err) {
        setError("Failed to load book details. Please try again.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadBook()
  }, [isbn])

  const handleEdit = () => {
    navigation.navigate("EditBook", { book })
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Book",
      "Are you sure you want to delete this book?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await removeBook(isbn)
              navigation.goBack()
            } catch (err) {
              Alert.alert("Error", "Failed to delete book. Please try again.")
            }
          },
        },
      ],
      { cancelable: true },
    )
  }

  if (loading) {
    return <LoadingIndicator message="Loading book details..." />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => navigation.goBack()} />
  }

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Book not found</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        <View style={styles.isbnContainer}>
          <Text style={styles.isbnLabel}>ISBN:</Text>
          <Text style={styles.isbn}>{book.isbn}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    color: "#666",
    marginBottom: 16,
  },
  isbnContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  isbnLabel: {
    fontSize: 16,
    color: "#888",
    marginRight: 8,
  },
  isbn: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 16,
  },
  editButton: {
    backgroundColor: "#4361ee",
    borderRadius: 8,
    padding: 16,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#ff3b30",
    borderRadius: 8,
    padding: 16,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4361ee",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 50,
  },
})

export default BookDetailScreen
