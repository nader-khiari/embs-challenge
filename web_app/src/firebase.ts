import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  projectId: 'embs-e9839',
  apiKey: 'AIzaSyCrmEAnks6hQnaBrsTsQoZgTN4MmJEyX8I',
  authDomain: 'embs-e9839.firebaseapp.com',
  databaseURL: 'https://embs-e9839-default-rtdb.firebaseio.com'
}

const app = initializeApp(firebaseConfig, 'embs')

const database = getDatabase(app)

export { database }
