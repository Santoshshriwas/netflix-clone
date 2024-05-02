
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDnOoXGvfMrW_lAw5f8mYUnvrz7s4Q3kt4",
  authDomain: "netflix-clone-c0c02.firebaseapp.com",
  projectId: "netflix-clone-c0c02",
  storageBucket: "netflix-clone-c0c02.appspot.com",
  messagingSenderId: "679720692143",
  appId: "1:679720692143:web:501d8adbd2b072ce80675a"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async(name,email,password)=>{
   try {
     const res= await createUserWithEmailAndPassword(auth,email,password);
     const user = res.user;
     await addDoc(collection(db, "user"),{
      uid:user.uid,
      name,
      authProvider: "local",
      email,
     })
   } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
   }
}

const login = async (email,password)=>{
  try {

   await signInWithEmailAndPassword(auth,email,password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = ()=>{
  signOut(auth);
}

export {auth,db,login,signup,logout}