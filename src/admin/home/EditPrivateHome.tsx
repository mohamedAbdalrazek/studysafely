import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db, mediaUrl } from "../../api/firestore";
import UploadImage from "../global/UploadImage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

interface FormMap {
    [key: string]: string;
}
interface DataMap {
    [key: string]: string;
}
const EditPrivateHome = () => {
    const navigate = useNavigate();

    const [data, setData] = useState<DataMap>();
    const [image, setImage] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormMap>();

    useEffect(() => {
        const docRef = doc(collection(db, "home"), "private");
        const getData = async () => {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const tempData = docSnap.data();
                reset(docSnap.data())
                return tempData as DataMap;
            } else {
                console.error("No such document!");
                return undefined;
            }
        };
        getData()
            .then((res) => {
                setData(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [reset]);
    
    const onSubmit = async (tempData: FormMap) => {
        let formedData = {
            ...tempData,
            imageUrl: data?.imageUrl,
            imageName: data?.imageName,
        };

        const uploadImages = async () => {
            if (image) {
                const imageName = image?.name.split(".")[0];
                const imageRef = ref(mediaUrl,`home/${imageName}${uuidv4()}`);
                const uploadResult = await uploadBytes(imageRef, image);
                const imageUrl = await getDownloadURL(uploadResult.ref);
                formedData = {
                    ...formedData,
                    imageUrl: imageUrl,
                    imageName: imageName,
                };
            }
        };
        await uploadImages();
        const docRef = doc(collection(db, "home"), "private");
        await setDoc(docRef, formedData);
        navigate("/");
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="admin-main-header">Edit Private Home</h1>
            <label htmlFor="header" className="admin-label">
                Private Home Header
            </label>
            <input
                id="header"
                defaultValue={data?.header}
                type="text"
                {...register("header", { required: true })}
                placeholder="Header"
                className="admin-input"
            />
            {errors.header && (
                <p className="admin-error">
                    Private Home Header is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="title" className="admin-label">
                Private Home Title
            </label>
            <input
                id="title"
                type="text"
                defaultValue={data?.title}
                {...register("title", { required: true })}
                placeholder="Title"
                className="admin-input"
            />
            {errors.title && (
                <p className="admin-error">Private Home Title is required</p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="subTitle" className="admin-label">
                Private Home Sub Title
            </label>
            <textarea
                id="subTitle"
                defaultValue={data?.subTitle}
                {...register("subTitle", { required: true })}
                placeholder="Sub Title"
                className="admin-textarea"
            />
            {errors.subTitle && (
                <p className="admin-error">
                    Private Home Sub Title is required
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="link" className="admin-label">
                Private Home Link Text
            </label>
            <input
                id="link"
                defaultValue={data?.link}
                type="text"
                {...register("link", { required: true })}
                placeholder="Link Text"
                className="admin-input"
            />
            {errors.link && (
                <p className="admin-error">
                    Private Home Link Text is required and must be valid
                </p>
            )}

            <UploadImage setImage={setImage} name="private-home-image" />
            {!image && (
                <img src={data?.imageUrl} alt="" className="preview-image" />
            )}
            {/* ---------------------------------------------------------------------------------- */}
            <button type="submit" className="admin-button">
                Submit
            </button>
        </form>
    );
};
export default EditPrivateHome;
