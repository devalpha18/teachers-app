import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';
import firebaseApp from '../firebase';

class FirebaseApiService {
  private _db: Firestore;

  constructor() {
    this._db = getFirestore(firebaseApp);
  }
}

export default FirebaseApiService;
