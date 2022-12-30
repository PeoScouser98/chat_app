import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBNImfeTviGT9suPkolj9hWpgUeoungI-E",
	authDomain: "chat-app-1103f.firebaseapp.com",
	projectId: "chat-app-1103f",
	storageBucket: "chat-app-1103f.appspot.com",
	messagingSenderId: "596337274472",
	appId: "1:596337274472:web:f204d417d373eae48395dd",
	measurementId: "G-2ZG7J23JZL",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export default app;
