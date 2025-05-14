"use client"

import { useContext } from "react"
import { View, StyleSheet, Alert } from "react-native"
import { BookContext } from "../context/BookContext"
import BookForm from "../components/BookForm"

const EditBookScreen = ({ route, navigation }) => {
  const { book } = route.params
  const { editBook } = useContext(BookContext)

  const handleSubmit = async (formData) => {
    try {
      await editBook(book.isbn, formData)
      Alert.alert("Success", "Book updated successfully", [{ text: "OK", onPress: () => navigation.goBack() }])
    } catch (error) {
      Alert.alert("Error", "Failed to update book. Please try again.")
    }
  }

  return (
    <View style={styles.container}>
      <BookForm initialValues={book} onSubmit={handleSubmit} submitButtonText="Update Book" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
})

export default EditBookScreen
