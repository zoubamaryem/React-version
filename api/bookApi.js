const API_URL = "http://10.0.2.2:8080/api/books"
// Note: 10.0.2.2 is used to access localhost from Android emulator
// For iOS simulator, use 'localhost' instead

export const fetchBooks = async () => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching books:", error)
    throw error
  }
}

export const fetchBookByIsbn = async (isbn) => {
  try {
    const response = await fetch(`${API_URL}/${isbn}`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching book with ISBN ${isbn}:`, error)
    throw error
  }
}

export const createBook = async (bookData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return await response.json()
  } catch (error) {
    console.error("Error creating book:", error)
    throw error
  }
}

export const updateBook = async (isbn, bookData) => {
  try {
    const response = await fetch(`${API_URL}/${isbn}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return await response.json()
  } catch (error) {
    console.error(`Error updating book with ISBN ${isbn}:`, error)
    throw error
  }
}

export const deleteBook = async (isbn) => {
  try {
    const response = await fetch(`${API_URL}/${isbn}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return true
  } catch (error) {
    console.error(`Error deleting book with ISBN ${isbn}:`, error)
    throw error
  }
}
