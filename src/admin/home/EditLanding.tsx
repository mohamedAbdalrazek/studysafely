import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db, mediaUrl } from "../../api/firestore";
import UploadImage from "../global/UploadImage";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
interface FormMap{
    [key:string]:string
}
interface DataMap {
    [key: string]: string;
}
const EditLanding = () => {
    const [data, setData] = useState<DataMap>()
    const [image, setImage] = useState<File|null>(null)
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    useEffect(()=>{
        const docRef = doc(collection(db, "home"), "landing");
        const getData = async ()=>{
            const docSnap = await getDoc(docRef);
            return docSnap
        }
        getData().then(res=>{
            setData(res.data());
            reset(res.data()); 
        })
    },[reset])
    
    
    const onSubmit = (data:FormMap) => {
        const imageName = image?.name.split(".")[0]
        const id = uuidv4();
        const imageRef = ref(mediaUrl, `home/${imageName}${id}`);
        if (image instanceof File) {
            uploadBytes(imageRef, image).then((res) => {
                getDownloadURL(res.ref).then((url) => {
                    const formedData: FormMap = {
                        ...data,
                        backgroundUrl: url,
                        backgroundName: image.name,
                    };

                    const docRef = doc(collection(db, "home"), "landing");
                    setDoc(docRef, formedData).then(() => {
                        navigate("/");
                    });
                });
            });
        }
        
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="admin-main-header">
                Edit Landing
            </h1>
            <label htmlFor="header" className="admin-label">Landing Header</label>
            <textarea id="header" defaultValue={data?.header} {...register("header", { required: true})} placeholder="Header" className="admin-textarea" />
            {errors.header && <p className="admin-error">Header is required and must be valid</p>}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="subHeader" className="admin-label">Sub Header</label>
            <textarea id="subHeader" defaultValue={data?.subHeader} {...register("subHeader", { required: true })} placeholder="Sub Header" className="admin-textarea"/>
            {errors.subHeader && <p className="admin-error">Sub Header is required</p>}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="button" className="admin-label">Landing Button Text</label>
            <input id="button" type="text" defaultValue={data?.button} {...register("button", { required: true })} placeholder="Button Text" className="admin-input"/>
            {errors.button && <p className="admin-error">Landing button text is required</p>}
            {/* ---------------------------------------------------------------------------------- */}
            <UploadImage setImage={setImage} name="landing-background" />
            {!image && <img src={data?.backgroundUrl} alt="" className="preview-image" />}
            <button type="submit" className="admin-button">Submit</button>
        </form>
    );
};
export default EditLanding;
