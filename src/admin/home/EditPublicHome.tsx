import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db, mediaUrl } from "../../api/firestore";
import UploadImage from "../global/UploadImage";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

interface FormMap {
    [key: string]: string;
}
interface DataMap {
    dataList: {
        [key: string]: string;
    }[];
    header: string;
    link: string;
}

const EditPublicHome = () => {
    const navigate = useNavigate();

    const [data, setData] = useState<DataMap>();
    const [firstImage, setFirstImage] = useState();
    const [secondImage, setSecondImage] = useState();
    const [thirdImage, setThirdImage] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormMap>();
    useEffect(() => {
        const docRef = doc(collection(db, "home"), "public");
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
    

    const onSubmit = async (data: FormMap) => {
        let formedData: DataMap = {
            header: data.header,
            link: data.link,
            dataList: [
                {
                    imageUrl: data.dataList[0].imageUrl,
                    imageName: data.dataList[0].imageName,
                    header: data.firstHeader,
                    subHeader: data.firstSubHeader,
                },
                {
                    imageUrl: data.dataList[1].imageUrl,
                    imageName: data.dataList[1].imageName,
                    header: data.secondHeader,
                    subHeader: data.secondSubHeader,
                },
                {
                    imageUrl: data.dataList[2].imageUrl,
                    imageName: data.dataList[2].imageName,
                    header: data.thirdHeader,
                    subHeader: data.thirdSubHeader,
                },
            ],
        };
    
    
        const firstImageName = firstImage?.name.split(".")[0];
        const secondImageName = secondImage?.name.split(".")[0];
        const thirdImageName = thirdImage?.name.split(".")[0];
        const firstImageRef = ref(mediaUrl, `home/${firstImageName}${uuidv4()}`);
        const secondImageRef = ref(mediaUrl, `home/${secondImageName}${uuidv4()}`);
        const thirdImageRef = ref(mediaUrl, `home/${thirdImageName}${uuidv4()}`);
    
        const uploadImages = async () => {
            if (firstImage) {
                const firstUploadResult = await uploadBytes(firstImageRef, firstImage);
                const firstImageUrl = await getDownloadURL(firstUploadResult.ref);
    
                formedData = {
                    ...formedData,
                    dataList: [
                        {
                            ...formedData.dataList[0],
                            imageUrl: firstImageUrl,
                            imageName: firstImageName,
                        },
                        ...formedData.dataList.slice(1),
                    ],
                };
            }
    
            if (secondImage) {
                const secondUploadResult = await uploadBytes(secondImageRef, secondImage);
                const secondImageUrl = await getDownloadURL(secondUploadResult.ref);
    
                formedData = {
                    ...formedData,
                    dataList: [
                        formedData.dataList[0],
                        {
                            ...formedData.dataList[1],
                            imageUrl: secondImageUrl,
                            imageName: secondImageName,
                        },
                        formedData.dataList[2],
                    ],
                };
            }
    
            if (thirdImage) {
                const thirdUploadResult = await uploadBytes(thirdImageRef, thirdImage);
                const thirdImageUrl = await getDownloadURL(thirdUploadResult.ref);
    
                formedData = {
                    ...formedData,
                    dataList: [
                        formedData.dataList[0],
                        formedData.dataList[1],
                        {
                            ...formedData.dataList[2],
                            imageUrl: thirdImageUrl,
                            imageName: thirdImageName,
                        },
                    ],
                };
            }
        };
    
        await uploadImages();
    
        const docRef = doc(collection(db, "home"), "public");
        await setDoc(docRef, formedData);
    
        navigate("/");
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="admin-main-header">Edit Public Home</h1>

            <label htmlFor="header" className="admin-label">
                Public Home Header
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
                    Public Home Header is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="link" className="admin-label">
                Public Home Link Text
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
                    Public Home Link Text is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <h3 className="admin-sub-header">First Slide</h3>
            <label htmlFor="firstHeader" className="admin-label">
                First Slide Header
            </label>
            <input
                id="firstHeader"
                defaultValue={data?.dataList[0].header}
                type="text"
                {...register("firstHeader", { required: true })}
                placeholder="First Header"
                className="admin-input"
            />
            {errors.firstHeader && (
                <p className="admin-error">
                    First Slide Header is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="firstSubHeader" className="admin-label">
                First Slide Sub Header
            </label>
            <textarea
                id="firstSubHeader"
                defaultValue={data?.dataList[0].subHeader}
                {...register("firstSubHeader", { required: true })}
                placeholder="First Sub Header"
                className="admin-textarea"
            />
            {errors.firstSubHeader && (
                <p className="admin-error">
                    First slide sub header is required and must be valid
                </p>
            )}
            <UploadImage
                setImage={setFirstImage}
                name="first-public-home-background"
            />
            {!firstImage && (
                <img
                    src={data?.dataList[0].imageUrl}
                    alt=""
                    className="preview-image"
                />
            )}
            {/* ---------------------------------------------------------------------------------- */}
            <h3 className="admin-sub-header">Second Slide</h3>
            <label htmlFor="secondHeader" className="admin-label">
                Second Slide Header
            </label>
            <input
                id="secondHeader"
                defaultValue={data?.dataList[1].header}
                type="text"
                {...register("secondHeader", { required: true })}
                placeholder="Second Header"
                className="admin-input"
            />
            {errors.secondHeader && (
                <p className="admin-error">
                    Second Slide Header is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="secondSubHeader" className="admin-label">
                Second Slide Sub Header
            </label>
            <textarea
                id="secondSubHeader"
                defaultValue={data?.dataList[1].subHeader}
                {...register("secondSubHeader", { required: true })}
                placeholder="Second Sub Header"
                className="admin-textarea"
            />
            {errors.secondSubHeader && (
                <p className="admin-error">
                    Second slide sub header is required and must be valid
                </p>
            )}

            <UploadImage
                setImage={setSecondImage}
                name="second-public-home-background"
            />
            {!secondImage && (
                <img
                    src={data?.dataList[1].imageUrl}
                    alt=""
                    className="preview-image"
                />
            )}
            {/* ---------------------------------------------------------------------------------- */}
            <h3 className="admin-sub-header">Third Slide</h3>
            <label htmlFor="thirdHeader" className="admin-label">
                Third Slide Header
            </label>
            <input
                id="thirdHeader"
                defaultValue={data?.dataList[2].header}
                type="text"
                {...register("thirdHeader", { required: true })}
                placeholder="Third Header"
                className="admin-input"
            />
            {errors.thirdHeader && (
                <p className="admin-error">
                    Third Slide Header is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="thirdSubHeader" className="admin-label">
                Third Slide Sub Header
            </label>
            <textarea
                id="thirdSubHeader"
                defaultValue={data?.dataList[2].subHeader}
                {...register("thirdSubHeader", { required: true })}
                placeholder="Third Sub Header"
                className="admin-textarea"
            />
            {errors.thirdSubHeader && (
                <p className="admin-error">
                    Third slide sub header is required and must be valid
                </p>
            )}
            <UploadImage
                setImage={setThirdImage}
                name="third-public-home-background"
            />
            {!thirdImage && (
                <img
                    src={data?.dataList[2].imageUrl}
                    alt=""
                    className="preview-image"
                />
            )}
            {/* ---------------------------------------------------------------------------------- */}
            <button type="submit" className="admin-button">
                Submit
            </button>
        </form>
    );
};
export default EditPublicHome;
