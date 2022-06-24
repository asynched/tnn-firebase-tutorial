import { useRef } from 'react'
import { useBox } from 'blackbox.js'
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore'

import { database } from '@/firebase'
import { storeBox } from '@/store/app'
import { addBook, deleteBook } from '@/services/books'

onSnapshot(collection(database, 'books'), (snapshot) => {
  const books = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  storeBox.set((state) => {
    state.books = books
    return state
  })
})

const q = query(collection(database, 'books'), orderBy('createdAt', 'desc'))

onSnapshot(q, (snapshot) => {
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  storeBox.set((state) => {
    state.orderedBooks = data
    return state
  })
})

export default function App() {
  const formRef = useRef()
  const store = useBox(storeBox)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(formRef.current)

    const book = {
      title: formData.get('title'),
      author: formData.get('author'),
    }

    await addBook(book)
    formRef.current.reset()
  }

  return (
    <>
      <h1>Add book</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" placeholder="Title" />
        <label htmlFor="author">Author</label>
        <input type="text" name="author" placeholder="Author" />
        <button type="submit">Add</button>
      </form>
      <h2>Books</h2>
      <ul>
        {store.books.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author}
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Books ordered by creation date</h2>
      <ul>
        {store.orderedBooks.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author}
          </li>
        ))}
      </ul>
    </>
  )
}
