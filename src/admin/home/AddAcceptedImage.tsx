import { useState } from "react";
import { useForm } from "react-hook-form";
import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, mediaUrl } from "../../api/firestore";
import { v4 as uuidv4 } from "uuid";
import UploadImage from "../global/UploadImage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";



const AddNews = () => {
    const navigate = useNavigate();
    const [sending, setSending] = useState(false);
    const [image, setImage] = useState<File>();
    const {
        handleSubmit,
    } = useForm();
    const onParentSubmit = async () => {
        setSending(true);
        let imageObject:{imageUrl:string, imageName:string}={imageName:'', imageUrl:""}
        const uploadImage = async () => {
            if (image) {
                const imageName = image?.name.split(".")[0];
                const imageRef = ref(
                    mediaUrl,
                    `news/${imageName}${uuidv4()}`
                );
                const uploadResult = await uploadBytes(
                    imageRef,
                    image
                );
                const imageUrl = await getDownloadURL(uploadResult.ref);
                imageObject = {imageUrl:imageUrl, imageName:imageName}
            }
        };

        const docRef = doc(collection(db, "home"), "accepted")
        await uploadImage();
        await updateDoc(docRef, {
            acceptedList:arrayUnion(imageObject)
        });
        setSending(false);
        navigate("/4ebdeab6-4058-4671-942a-258434abb061/accepted");
    };
    const addImage = (file:File|null)=>{
        if(file){
            setImage(file)
        }
    }
    return (
        <form onSubmit={handleSubmit(onParentSubmit)}>
            <h1 className="admin-main-header">Add Image for an accepted student</h1>
            {/* ---------------------------------------------------------------------------------- */}
            <label className="admin-label">Upload a Image</label>
            <UploadImage
                setImage={addImage}
                name="news-image"
                isRequired={true}
            />
            {/* ---------------------------------------------------------------------------------- */}
            <input
                type="submit"
                value={sending ? "sending..." : "Add Image"}
                disabled={sending}
                className="admin-button"
            />
        </form>
    );
};
export default AddNews;
