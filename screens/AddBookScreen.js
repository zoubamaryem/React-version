"use client"

import { useContext } from "react"
import { View, StyleSheet, Alert } from "react-native"
import { BookContext } from "../context/BookContext"
import BookForm from "../components/BookForm"

const AddBookScreen = ({ navigation }) => {
  const { addBook } = useContext(BookContext)

  const handleSubmit = async (formData) => {
    try {
      await addBook(formData)
      Alert.alert("Success", "Book added successfully", [{ text: "OK", onPress: () => navigation.goBack() }])
    } catch (error) {
      Alert.alert("Error", "Failed to add book. Please try again.")
    }
  }

  return (
    <View style={styles.container}>
      <BookForm onSubmit={handleSubmit} submitButtonText="Add Book" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
})

export default AddBookScreen
