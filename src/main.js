import { collection, onSnapshot, query, where } from 'firebase/firestore'

import { h } from '@/lib/dom'
import { database } from '@/firebase'
import { addBook, deleteBook } from '@/services/books'

const BookItem = (book) =>
  h({
    tag: 'li',
    attrs: null,
    children: [
      book.title,
      ' - ',
      book.author,
      h({
        tag: 'button',
        attrs: {
          onclick: () => deleteBook(book.id),
        },
        children: ['Delete'],
      }),
    ],
  })

const renderBooks = (books) => {
  const container = document.querySelector('.book-list')
  container.innerHTML = ''

  for (const book of books) {
    container.appendChild(BookItem(book))
  }
}

const bookForm = document.querySelector('.book-form')
bookForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const data = {
    title: bookForm.title.value,
    author: bookForm.author.value,
  }

  await addBook(data)
  bookForm.reset()
})

onSnapshot(collection(database, 'books'), (snapshot) => {
  const books = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  renderBooks(books)
})

const q = query(
  collection(database, 'books'),
  where('author', '==', 'Patrick Rothfuss')
)

onSnapshot(q, (snapshot) => {
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  console.log(data)
})
