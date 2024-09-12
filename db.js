import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as Firestore from "firebase/firestore";
import * as Auth from "firebase/auth";

export default class DataBase {
  app;
  db;
  analytics;
  auth;
  provider;

  #data;
  #bin;
  #user;

  constructor() {
    this.app = initializeApp(
      JSON.parse(atob(import.meta.env.VITE_FIREBASE_TOKEN))
    );
    this.db = Firestore.getFirestore(this.app);
    this.analytics = getAnalytics(this.app);
    this.auth = Auth.getAuth(this.app);
    this.provider = new Auth.GoogleAuthProvider();

    this.#data = {};
    this.#bin = {};
    this.#user = {};
  }

  async signInWithGoogle() {
    try {
      const user = await Auth.signInWithPopup(this.auth, this.provider);
      if (user) {
        this.#user.displayName = user.displayName;
        this.#user.email = user.email;
        this.#user.photoURL = user.photoURL;
      }
      return true;
    } catch (error) {
      console.error("Error during sign-in:", error);
      return false;
    }
  }

  async checkUserLoginStatus() {
    return new Promise((resolve) =>
      Auth.onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.#user.displayName = user.displayName;
          this.#user.email = user.email;
          this.#user.photoURL = user.photoURL;
        }
        resolve(!!user);
      })
    );
  }

  async getCollection(path) {
    const collection = Firestore.collection(this.db, path);
    const querySnapshot = await Firestore.getDocs(collection);

    return querySnapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = doc.data();
      return acc;
    }, {});
  }

  async updateData() {
    this.#data = await this.getCollection("Data");
    this.#bin = await this.getCollection("Bin");
  }

  async deleteDoc(id) {
    const collection = "Data";
    const thisDoc = Firestore.doc(this.db, collection, id);
    const copyOfThisDoc = Object.assign({}, this.data[id]);

    try {
      await Firestore.deleteDoc(thisDoc);

      const docRef = Firestore.doc(Firestore.collection(this.db, "Bin"));
      await Firestore.setDoc(docRef, copyOfThisDoc);

      await this.updateData();
    } catch (error) {
      console.error(`Failed to delete document with ID: ${id}.`, error);
    }
  }

  async editDoc(id, newDoc) {
    const collection = "Data";
    const thisDoc = Firestore.doc(this.db, collection, id);

    try {
      await Firestore.updateDoc(thisDoc, newDoc);
      this.updateData();
    } catch (error) {
      console.error(`Failed to edit document with ID: ${id}.`, error);
    }
  }

  async deleteDocFromBin(id) {
    const collection = "Bin";
    const thisDoc = Firestore.doc(this.db, collection, id);

    try {
      await Firestore.deleteDoc(thisDoc);
      await this.updateData();
    } catch (error) {
      console.error(`Failed to delete document with ID: ${id}.`, error);
    }
  }

  async recoverDoc(id) {
    const collection = "Bin";
    const thisDoc = Firestore.doc(this.db, collection, id);
    const copyOfThisDoc = Object.assign({}, this.bin[id]);

    try {
      await Firestore.deleteDoc(thisDoc);

      const docRef = Firestore.doc(Firestore.collection(this.db, "Data"));
      await Firestore.setDoc(docRef, copyOfThisDoc);

      await this.updateData();
    } catch (error) {
      console.error(`Failed to delete document with ID: ${id}.`, error);
    }
  }

  get data() {
    return this.#data;
  }

  get bin() {
    return this.#bin;
  }

  get user() {
    return this.#user;
  }
}
