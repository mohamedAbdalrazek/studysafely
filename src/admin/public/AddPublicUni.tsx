import { useState } from "react";
import { useForm } from "react-hook-form";
import UploadImage from "../global/UploadImage";
import AddFieldList from "../global/AddFieldList";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, mediaUrl } from "../../api/firestore";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import UploadMultibleImages from "../global/UploadMultibleImages";

interface Field {
    buttonLink: string;
    duration: number;
    fee: number;
    language: "en" | "tr";
    name: string;
}
interface ImageData {
    imageUrl: string;
    imageName: string;
}
interface UniMap {
    body: string;
    fee: number;
    fieldsHeader: string;
    backgroundUrl: string;
    backgroundName: string;
    desc:string;
    fieldsList:Field[];
    imagesList: ImageData[];
    location: string;
    logoName: string;
    logoUrl: string;
    name: string;
    studentsNumber: number;
    whatsapp: string;
}

const AddPublicUni = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState<File[]|null>();
    const [logo, setLogo] = useState<File|null>();
    const [background, setBackground] = useState<File|null>();
    const [fields, setFields] = useState<Field[]>([]);
    const [sending, setSending] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UniMap>();
    const onSubmitTest = async (data: UniMap) => {
        setSending(true);
        const uploadLogo = async () => {
            if (logo) {
                const logoName = logo?.name.split(".")[0];
                const logoRef = ref(mediaUrl, `public/${logoName}${uuidv4()}`);
                const uploadResult = await uploadBytes(logoRef, logo);
                const logoUrl = await getDownloadURL(uploadResult.ref);
                data = {
                    ...data,
                    logoUrl: logoUrl,
                    logoName: logoName,
                };
            }
        };
        const uploadBackground = async () => {
            data = {
                ...data,
                fieldsList: fields,
            };
            if (background) {
                const backgroundName = background?.name.split(".")[0];
                const backgroundRef = ref(
                    mediaUrl,
                    `public/${backgroundName}${uuidv4()}`
                );
                const uploadResult = await uploadBytes(
                    backgroundRef,
                    background
                );
                const backgroundUrl = await getDownloadURL(uploadResult.ref);
                data = {
                    ...data,
                    backgroundUrl: backgroundUrl,
                    backgroundName: backgroundName,
                };
            }
        };
        const uploadImages = async () => {
            if (images) {
                for (const image of images) {
                    const imageName = image?.name.split(".")[0];
                    const imageRef = ref(
                        mediaUrl,
                        `public/${imageName}${uuidv4()}`
                    );
                    const uploadResult = await uploadBytes(imageRef, image);
                    const imageUrl = await getDownloadURL(uploadResult.ref);
                    data = {
                        ...data,
                        imagesList: [
                            ...(data.imagesList ?? []),
                            { imageUrl: imageUrl, imageName: imageName },
                        ],
                    };
                }
            }
        };

        await uploadLogo();
        await uploadBackground();
        await uploadImages();
        setSending(false);
        const docRef = collection(
            doc(collection(db, "public"), "publicUni"),
            "publicUni"
        );
        await addDoc(docRef, data);
        navigate("/4ebdeab6-4058-4671-942a-258434abb061/public-list");
    };
    return (
        <form onSubmit={handleSubmit(onSubmitTest)}>
            <h1 className="admin-main-header">Add public university</h1>
            <label htmlFor="name" className="admin-label">
                University's Name
            </label>
            <input
                id="name"
                type="text"
                {...register("name", { required: true })}
                placeholder="name"
                className="admin-input"
            />
            {errors.name && (
                <p className="admin-error">
                    University Name is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="desc" className="admin-label">
                University's Brief Description
            </label>
            <input
                id="desc"
                type="text"
                {...register("desc", { required: true })}
                placeholder="Description"
                className="admin-input"
            />
            {errors.desc && (
                <p className="admin-error">
                    University's Description is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="location" className="admin-label">
                University's Location
            </label>
            <input
                id="location"
                type="text"
                {...register("location", { required: true })}
                placeholder="location"
                className="admin-input"
            />
            {errors.location && (
                <p className="admin-error">University's Location is required</p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="fee" className="admin-label">
                University's Avrage fee in Dollars
            </label>
            <input
                id="fee"
                type="number"
                min="0"
                {...register("fee", { required: true })}
                placeholder="fee"
                className="admin-input"
            />
            {errors.fee && (
                <p className="admin-error">University's fee is required</p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="studentsNumber" className="admin-label">
                Number of Students in the University
            </label>
            <input
                id="studentsNumber"
                type="number"
                min="0"
                {...register("studentsNumber", { required: true })}
                placeholder="Number of students"
                className="admin-input"
            />
            {errors.studentsNumber && (
                <p className="admin-error">Number of Students is required</p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="whatsapp" className="admin-label">
                Whatsapp Link
            </label>
            <input
                id="whatsapp"
                type="text"
                {...register("whatsapp", {
                    required: true,
                    pattern: {
                        value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                        message: "Whatsapp link must be a valid URL",
                    },
                })}
                placeholder="Whatsapp Link"
                className="admin-input"
            />
            {errors.whatsapp && (errors.whatsapp.message?(
                <p className="admin-error">
                    {errors.whatsapp.message}
                </p>
            ):<p className="admin-error"> Whatsapp link is required</p>)}
            {/* ---------------------------------------------------------------------------------- */}

            <label className="admin-label">Upload The University's Logo</label>
            <UploadImage setImage={setLogo} name="uni-logo" isRequired={true} />
            {/* ---------------------------------------------------------------------------------- */}

            <label className="admin-label">
                Upload a Main Image for the University
            </label>
            <UploadImage
                setImage={setBackground}
                name="uni-background"
                isRequired={true}
            />
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="body" className="admin-label">
                University's Infromation (Code){" "}
            </label>
            <textarea
                id="body"
                {...register("body", { required: true })}
                placeholder="body"
                className="admin-textarea"
            />
            {errors.body && (
                <p className="admin-error">
                    University's Infromation is required
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label className="admin-label">Upload Other Images </label>
            <UploadMultibleImages setImagesList={setImages} initialImages={[]} setInitialImages={undefined} />

            <AddFieldList setFieldsList={setFields} fieldsList={fields} />
            <input
                type="submit"
                value={sending ? "sending..." : "Add University"}
                disabled={sending}
                className="admin-button"
            />
        </form>
    );
};
export default AddPublicUni;
