import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from '@/config/env'

export const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
