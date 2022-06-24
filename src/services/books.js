import { database } from '@/firebase'
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'

export const getBooks = async () => {
  const collectionReference = collection(database, 'books')

  const snapshot = await getDocs(collectionReference)
  const books = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

  return books
}

export const addBook = async (book) => {
  const collectionReference = collection(database, 'books')
  await addDoc(collectionReference, {
    ...book,
    createdAt: serverTimestamp(),
  })
}

export const deleteBook = async (id) => {
  const book = doc(database, 'books', id)
  await deleteDoc(book)
}
