import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UploadImage from "../global/UploadImage";
import AddFieldList from "../global/AddFieldList";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, mediaUrl } from "../../api/firestore";
import { v4 as uuidv4 } from "uuid";
import {
    collection,
    doc,
    onSnapshot,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import UploadMultibleImages from "../global/UploadMultibleImages";

interface UniMap {
    body: string;
    fee: number;
    fieldsHeader: string;
    backgroundUrl: string;
    backgroundName: string;
    fieldsList: {
        buttonLink: string;
        duration: number;
        fee: number;
        languege: "en" | "tr";
        name: string;
    }[];
    imagesList: { [key: string]: string }[];
    location: string;
    logoName: string;
    logoUrl: string;
    name: string;
    studentsNumber: number;
    whatsapp: string;
    id: string;
}
interface Field {
    buttonLink: string;
    duration: number;
    fee: number;
    languege: "en" | "tr";
    name: string;
}
interface paramtersMap {
    [key: string]: any;
}
const EditPrivateUni = () => {
    const navigate = useNavigate();
    const uniName = useLocation().pathname.split("/")[3].split("-").join(" ");
    const [images, setImages] = useState<File[]>();
    const [logo, setLogo] = useState<File>();
    const [background, setBackground] = useState<File>();
    const [fields, setFields] = useState<Field[]>([]);
    const [sending, setSending] = useState<boolean>(false);
    const [initialImages, setInitialImages] =
        useState<{ [key: string]: string }[]>();
    const [uni, setUni] = useState<UniMap>();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    useEffect(() => {
        const uniListRef = collection(
            doc(collection(db, "private"), "privateUni"),
            "privateUni"
        );

        const q = query(uniListRef, where("name", "==", uniName));
        onSnapshot(q, (res: paramtersMap): void => {
            const uniArr: UniMap[] = res.docs?.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUni(uniArr[uniArr.length - 1]);
            reset(uniArr[uniArr.length - 1]);
            setInitialImages(uniArr[uniArr.length - 1].imagesList);
        });
    }, [uniName, reset]);
    const onParentSubmit = async (data: UniMap) => {
        setSending(true);
        data.imagesList = []
        const uploadLogo = async () => {
            if (logo) {
                const logoName = logo?.name.split(".")[0];
                const logoRef = ref(mediaUrl, `private/${logoName}${uuidv4()}`);
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
                    `private/${backgroundName}${uuidv4()}`
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
                        `private/${imageName}${uuidv4()}`
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
        if (initialImages) {
            for (const image of initialImages) {
                data = {
                    ...data,
                    imagesList: [
                        ...(data.imagesList ?? []),
                        {
                            imageUrl: image.imageUrl,
                            imageName: image.imageName,
                        },
                    ],
                };
            }
        }
        await uploadLogo();
        await uploadBackground();
        await uploadImages();
        setSending(false);
        const docRef = doc(
            collection(doc(collection(db, "private"), "privateUni"), "privateUni"),
            uni?.id
        );
        await setDoc(docRef, data);
        navigate("/4ebdeab6-4058-4671-942a-258434abb061/private-list");
    };
    return (
        <form onSubmit={handleSubmit(onParentSubmit)}>
            <h1 className="admin-main-header">Edit private university</h1>
            <label htmlFor="name" className="admin-label">
                University's Name
            </label>
            <input
                id="name"
                type="text"
                defaultValue={uni?.name}
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

            <label htmlFor="location" className="admin-label">
                University's Location
            </label>
            <input
                id="location"
                type="text"
                defaultValue={uni?.location}
                {...register("location", { required: true })}
                placeholder="location"
                className="admin-input"
            />
            {errors.location && (
                <p className="admin-error">University's Location is required</p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="fee" className="admin-label">
                University's avrage fee in Dollars
            </label>
            <input
                id="fee"
                min="0"
                type="number"
                defaultValue={uni?.fee}
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
                defaultValue={uni?.studentsNumber}
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
                defaultValue={uni?.whatsapp}
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
            <UploadImage setImage={setLogo} name="uni-logo" isRequied={true} />
            {!logo && (
                <img src={uni?.logoUrl} alt="" className="preview-image" />
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label className="admin-label">
                Upload a Main Image for the University
            </label>
            <UploadImage
                setImage={setBackground}
                name="uni-background"
                isRequied={true}
            />
            {!background && (
                <img
                    src={uni?.backgroundUrl}
                    alt=""
                    className="preview-image"
                />
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="body" className="admin-label">
                University's Infromation (Code){" "}
            </label>
            <textarea
                id="body"
                defaultValue={uni?.body}
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
            <UploadMultibleImages
                setImagesList={setImages}
                initialImages={initialImages}
                setInitialImages={setInitialImages}
            />
            <AddFieldList
                setFieldsList={setFields}
                fieldsList={uni?.fieldsList}
            />
            <input
                type="submit"
                value={sending ? "sending..." : "Add University"}
                disabled={sending}
                className="admin-button"
            />
        </form>
    );
};
export default EditPrivateUni;
