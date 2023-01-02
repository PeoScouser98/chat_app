import { storage } from "./firebase.config";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const uploadImage = async (image) => {
	try {
		const storageRef = ref(storage, "attachments/" + image.name);
		const uploadTask = uploadBytesResumable(storageRef, image);
		return await getDownloadURL(uploadTask.snapshot.ref);
	} catch (error) {
		console.log("upload error:>>>", error.message);
	}
};

export default uploadImage;
