import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UploadImage from "../global/UploadImage";
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

interface ImageData {
    imageUrl: string;
    imageName: string;
}
interface pageDataMap {
    backgroundUrl?: string;
    backgroundName?: string;
    imagesList?: ImageData[];
    name?: string;
    body?: string;
    whatsLink?: string;
    id:string
}
const EditOtherServices = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState<File[]|null>();
    const encodedMainInfo = useLocation()
        .pathname.split("/")[3]
        .split("-")
        .join(" ");
    const serviceName = decodeURIComponent(encodedMainInfo);
    const [background, setBackground] = useState<File|null>();
    const [sending, setSending] = useState<boolean>(false);
    const [serviceData, setServiceData] = useState<pageDataMap>();
    const [initialImages, setInitialImages] =
        useState<ImageData[]|undefined>();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<pageDataMap>();
    useEffect(() => {
        const newsRef = collection(db, "other");
        const q = query(newsRef, where("name", "==", serviceName));
        onSnapshot(q, (res): void => {
            const serviceData: pageDataMap[] = res.docs?.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setServiceData(serviceData[serviceData.length - 1]);
            setInitialImages(serviceData[serviceData.length - 1].imagesList);
            reset(serviceData[serviceData.length - 1]);
        });
    }, [serviceName, reset]);
    const onSubmitTest = async (data: pageDataMap) => {
        setSending(true);
        data.imagesList = []
        const uploadBackground = async () => {
            if (background) {
                const backgroundName = background?.name.split(".")[0];
                const backgroundRef = ref(
                    mediaUrl,
                    `other/${backgroundName}${uuidv4()}`
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
                        `other/${imageName}${uuidv4()}`
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
        await uploadBackground();
        await uploadImages();
        const docRef = doc(collection(db, "other"), serviceData?.id);
        await setDoc(docRef, data);
        setSending(false);
        navigate("/4ebdeab6-4058-4671-942a-258434abb061/other-services");
    };
    return (
        <form onSubmit={handleSubmit(onSubmitTest)}>
            <h1 className="admin-main-header">Add Other Service</h1>
            <label htmlFor="name" className="admin-label">
                Service's Name
            </label>
            <input
                id="name"
                type="text"
                defaultValue={serviceData?.name}
                {...register("name", { required: true })}
                placeholder="name"
                className="admin-input"
            />
            {errors.name && (
                <p className="admin-error">
                    Service's Name is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="body" className="admin-label">
                Service's Infromation (Code){" "}
            </label>
            <textarea
                id="body"
                defaultValue={serviceData?.body}
                {...register("body", { required: true })}
                placeholder="body"
                className="admin-textarea"
            />
            {errors.body && (
                <p className="admin-error">Service's Infromation is required</p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="whatsLink" className="admin-label">
                Whats Link
            </label>
            <input
                id="whatsLink"
                defaultValue={serviceData?.whatsLink}
                type="text"
                {...register("whatsLink", {
                    required: true,
                    pattern: {
                        value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                        message: "Whatslink must be a valid URL",
                    },
                })}
                placeholder="Whats Link"
                className="admin-input"
            />
            {errors.whatsLink &&
                (errors.whatsLink.message ? (
                    <p className="admin-error">{errors.whatsLink.message}</p>
                ) : (
                    <p className="admin-error"> Whats link is required</p>
                ))}
            {/* ---------------------------------------------------------------------------------- */}

            <label className="admin-label">
                Upload a Main Image for the Service
            </label>
            <UploadImage
                setImage={setBackground}
                name="other-background"
                isRequired={true}
            />
            {/* ---------------------------------------------------------------------------------- */}

            <label className="admin-label">Upload Other Images </label>
            <UploadMultibleImages
                setImagesList={setImages}
                initialImages={initialImages}
                setInitialImages={setInitialImages}
            />
            {/* ---------------------------------------------------------------------------------- */}

            <input
                type="submit"
                value={sending ? "sending..." : "ُEdit Service"}
                disabled={sending}
                className="admin-button"
            />
        </form>
    );
};
export default EditOtherServices;
