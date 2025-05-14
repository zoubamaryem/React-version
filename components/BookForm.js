"use client"

import { useState, useEffect } from "react"
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native"

const BookForm = ({ initialValues = { isbn: "", title: "", author: "" }, onSubmit, submitButtonText = "Save" }) => {
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setFormData(initialValues)
  }, [initialValues])

  const validate = () => {
    const newErrors = {}

    if (!formData.isbn) {
      newErrors.isbn = "ISBN is required"
    } else if (!/^[0-9-]{10,17}$/.test(formData.isbn)) {
      newErrors.isbn = "ISBN must be a valid format"
    }

    if (!formData.title) {
      newErrors.title = "Title is required"
    }

    if (!formData.author) {
      newErrors.author = "Author is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData)
    }
  }

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>ISBN</Text>
        <TextInput
          style={[styles.input, errors.isbn && styles.inputError]}
          value={formData.isbn}
          onChangeText={(text) => handleChange("isbn", text)}
          placeholder="Enter ISBN"
          testID="isbn-input"
        />
        {errors.isbn && <Text style={styles.errorText}>{errors.isbn}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={[styles.input, errors.title && styles.inputError]}
          value={formData.title}
          onChangeText={(text) => handleChange("title", text)}
          placeholder="Enter book title"
          testID="title-input"
        />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Author</Text>
        <TextInput
          style={[styles.input, errors.author && styles.inputError]}
          value={formData.author}
          onChangeText={(text) => handleChange("author", text)}
          placeholder="Enter author name"
          testID="author-input"
        />
        {errors.author && <Text style={styles.errorText}>{errors.author}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit} testID="submit-button">
        <Text style={styles.buttonText}>{submitButtonText}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#ff3b30",
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#4361ee",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default BookForm
