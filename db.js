// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwTbTG_auMrWy_e4aVUFMHs3794zZ4AXE",
  authDomain: "hgregusersdb.firebaseapp.com",
  projectId: "hgregusersdb",
  storageBucket: "hgregusersdb.appspot.com",
  messagingSenderId: "996459139126",
  appId: "1:996459139126:web:c4f73b0298e90734618897",
  measurementId: "G-J4RYP9B18W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const RESERVED_ID = "test";

const data = {
  imported: false,
  services: {
    advanced: {},
    basic: {},
    ultra: {},
  },
};

const bin = {
  imported: false,
  services: {
    advanced: {},
    basic: {},
    ultra: {},
  },
};

async function getCollection(path) {
  const thisCollection = {};
  const querySnapshot = await getDocs(collection(db, path));
  querySnapshot.forEach((doc) => {
    const id = doc.id;
    if (id !== RESERVED_ID) {
      thisCollection[id] = doc.data();
    }
  });

  return thisCollection;
}

export async function getData(force = false) {
  if (data.imported && !force) {
    return data;
  }

  console.log("Getting data from firebase;");

  data.services.advanced = await getCollection("Data/Services/Advanced");
  data.services.basic = await getCollection("Data/Services/Basic");
  data.services.ultra = await getCollection("Data/Services/Ultra");
  data.imported = true;

  return data;
}

export async function getBin() {
  if (bin.imported) {
    return bin;
  }

  console.log("Getting data from firebase;");

  bin.services.advanced = await getCollection("Bin/Services/Advanced");
  bin.services.basic = await getCollection("Bin/Services/Basic");
  bin.services.ultra = await getCollection("Bin/Services/Ultra");
  bin.imported = true;

  return bin;
}

export async function deleteForm(id) {
  const thisDoc = getDocRef(id);

  try {
    await deleteDoc(thisDoc);
    console.log(`Document with ID: ${id} has been deleted from collection.`);
    getData(true);
  } catch (error) {
    console.error(
      `Failed to delete document with ID: ${id} from collection.`,
      error
    );
  }
}

export async function editForm(id, newForm) {
  const thisForm = getDocRef(id);

  try {
    await updateDoc(thisForm, newForm);
    console.log(`Document with ID: ${id} has been edited.`);
    getData(true);
  } catch (error) {
    console.error(`Failed to edit document with ID: ${id}.`, error);
  }
}

function getDocRef(id) {
  const services = data.services;
  const collections = ["advanced", "basic", "ultra"];
  let collection = "";
  let keyCollecation = "";

  for (const key of collections) {
    if (Object.keys(services[key]).includes(id)) {
      keyCollecation = key;
      collection = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize the first letter
      break;
    }
  }

  if (!collection) {
    throw new Error(`No matching collection found for ID: ${id}`);
  }

  const path = `Data/Services/${collection}`;
  console.log(path);
  const thisDoc = doc(db, path, id);
  return thisDoc;
}
