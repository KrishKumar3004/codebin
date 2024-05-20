import { Injectable } from '@angular/core';
import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { AuthService } from './auth.service';
import { Snippet } from '../../models/snippet';
import { firebaseConfig } from '../../../firebaseConfig';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db?: any;
  private app = initializeApp(firebaseConfig);
  constructor(private authService: AuthService) {
    this.db = getFirestore(this.app);
  }

  async createSnippet(snippet: Snippet) {
    try {
      const docRef = await addDoc(collection(this.db, "snippets"), {
        ...snippet, by: this.authService.getUid()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error while creating the code snippet");
    }
  }

  async getAllSnippets() {
    const result: any[] = [];
    const querySnapshot = await getDocs(collection(this.db, "snippets"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      result.push({ id: doc.id, ...doc.data() });
    });
    return result;
  }

  async getSnippet(docId: string) {


    const docRef = doc(this.db, "snippets", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log(docId, "No such document!");
      return ({
        id: "",
        title: "",
        snippet: ""
      })
    }
  }
}
