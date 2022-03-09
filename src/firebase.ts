import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDQfOY6C_TRqK26nE5fUYS9_k35nVtyt8I',
  authDomain: 'incubadora-de-ases.firebaseapp.com',
  projectId: 'incubadora-de-ases',
  storageBucket: 'incubadora-de-ases.appspot.com',
  messagingSenderId: '388807107406',
  appId: '1:388807107406:web:c0267f296cc5229cdb741f',
  measurementId: 'G-448K1N7RTY',
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
