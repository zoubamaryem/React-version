"use client"

import { createContext, useState, useEffect, useCallback } from "react"
import { fetchBooks, createBook, updateBook, deleteBook } from "../api/bookApi"

export const BookContext = createContext()

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadBooks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchBooks()
      setBooks(data)
    } catch (err) {
      setError("Failed to load books. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  const addBook = async (bookData) => {
    try {
      setLoading(true)
      const newBook = await createBook(bookData)
      setBooks((prevBooks) => [...prevBooks, newBook])
      return newBook
    } catch (err) {
      setError("Failed to add book. Please try again.")
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const editBook = async (isbn, bookData) => {
    try {
      setLoading(true)
      const updatedBook = await updateBook(isbn, bookData)
      setBooks((prevBooks) => prevBooks.map((book) => (book.isbn === isbn ? updatedBook : book)))
      return updatedBook
    } catch (err) {
      setError("Failed to update book. Please try again.")
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const removeBook = async (isbn) => {
    try {
      setLoading(true)
      await deleteBook(isbn)
      setBooks((prevBooks) => prevBooks.filter((book) => book.isbn !== isbn))
      return true
    } catch (err) {
      setError("Failed to delete book. Please try again.")
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const refreshBooks = async () => {
    await loadBooks()
  }

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        error,
        addBook,
        editBook,
        removeBook,
        refreshBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  )
}
