import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db, mediaUrl } from "../../api/firestore";
import { v4 as uuidv4 } from "uuid";
import UploadImage from "../global/UploadImage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
interface FormMap {
    [key: string]: string;
}
interface FormedDataMap {
    infoTitle: string;
    listNumber: number;
    infoList: {
        imageUrl?: string;
        imageName?: string;
        header:string;
        subHeader:string
    }[];
}

const EditPartialPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<FormedDataMap>()
    const [firstImage, setFirstImage] = useState<File|null>()
    const [secondImage, setSecondImage] = useState<File|null>()
    const [thirdImage, setThirdImage] = useState<File|null>()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormMap>();
    useEffect(()=>{
        const docRef = doc(collection(db, "partial"), "partial");
        const getData = async ()=>{
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                const tempData = docSnap.data()
                reset(docSnap.data())
                return tempData as FormedDataMap
            }
            else{
                console.error("No such document!");
                return undefined;
            }
        }
        getData().then(res=>{
            setData(res);
        }).catch((err)=>{
            console.log(err)
        })
    },[reset])
    

    const onSubmit = async (formData: FormMap) => {
        let formedData: FormedDataMap = {
            infoTitle: formData.infoHeader,
            listNumber: Number(formData.listNumber),
            infoList: [
                {
                    imageUrl: data?.infoList[0].imageUrl,
                    imageName: data?.infoList[0].imageName,
                    header: formData.firstHeader,
                    subHeader: formData.firstSubHeader,
                },
                {
                    imageUrl: data?.infoList[1].imageUrl,
                    imageName: data?.infoList[1].imageName,
                    header: formData.secondHeader,
                    subHeader: formData.secondSubHeader,
                },
                {
                    imageUrl: data?.infoList[2].imageUrl,
                    imageName: data?.infoList[2].imageName,
                    header: formData.thirdHeader,
                    subHeader: formData.thirdSubHeader,
                },
            ],
        };
        const firstImageName = firstImage?.name.split(".")[0];
        const secondImageName = secondImage?.name.split(".")[0];
        const thirdImageName = thirdImage?.name.split(".")[0];
        const firstImageRef = ref(
            mediaUrl,
            `partial/${firstImageName}${uuidv4()}`
        );
        const secondImageRef = ref(
            mediaUrl,
            `partial/${secondImageName}${uuidv4()}`
        );
        const thirdImageRef = ref(
            mediaUrl,
            `partial/${thirdImageName}${uuidv4()}`
        );
        const uploadImages = async () => {
            if (firstImage) {
                const firstUploadResult = await uploadBytes(
                    firstImageRef,
                    firstImage
                );
                const firstImageUrl = await getDownloadURL(
                    firstUploadResult.ref
                );

                formedData = {
                    ...formedData,
                    infoList: [
                        {
                            ...formedData.infoList[0],
                            imageUrl: firstImageUrl,
                            imageName: firstImageName,
                        },
                        ...formedData.infoList.slice(1),
                    ],
                };
            }

            if (secondImage) {
                const secondUploadResult = await uploadBytes(
                    secondImageRef,
                    secondImage
                );
                const secondImageUrl = await getDownloadURL(
                    secondUploadResult.ref
                );

                formedData = {
                    ...formedData,
                    infoList: [
                        formedData.infoList[0],
                        {
                            ...formedData.infoList[1],
                            imageUrl: secondImageUrl,
                            imageName: secondImageName,
                        },
                        formedData.infoList[2],
                    ],
                };
            }

            if (thirdImage) {
                const thirdUploadResult = await uploadBytes(
                    thirdImageRef,
                    thirdImage
                );
                const thirdImageUrl = await getDownloadURL(
                    thirdUploadResult.ref
                );

                formedData = {
                    ...formedData,
                    infoList: [
                        formedData.infoList[0],
                        formedData.infoList[1],
                        {
                            ...formedData.infoList[2],
                            imageUrl: thirdImageUrl,
                            imageName: thirdImageName,
                        },
                    ],
                };
            }
        };

        await uploadImages();

        const docRef = doc(collection(db, "partial"), "partial");
        await setDoc(docRef, formedData);
        navigate("/partial");
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="admin-main-header">Edit Partial Page</h1>

            <label htmlFor="infoHeader" className="admin-label">
                Partial Page Info Header
            </label>
            <input
                id="infoHeader"
                defaultValue={data?.infoTitle}
                type="text"
                {...register("infoHeader", { required: true })}
                placeholder="Info Header"
                className="admin-input"
            />
            {errors.infoHeader && (
                <p className="admin-error">
                    Partial Page Info Header is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}


            <label htmlFor="listNumber" className="admin-label">
                Number of partial sholars per page
            </label>
            <input
                id="listNumber"
                defaultValue={data?.listNumber}
                type="number"
                min="0"
                {...register("listNumber", { required: true })}
                placeholder="Number"
                className="admin-input"
            />
            {errors.listNumber && (
                <p className="admin-error">
                    Number of partial sholars is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <h3 className="admin-sub-header">First Slide</h3>
            <label htmlFor="firstHeader" className="admin-label">
                First Slide Header
            </label>
            <input
                id="firstHeader"
                defaultValue={data?.infoList[0].header}
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
                defaultValue={data?.infoList[0].subHeader}
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
                name="first-partial-page-image"
            />
            {!firstImage && (
                <img
                    src={data?.infoList[0].imageUrl}
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
                defaultValue={data?.infoList[1].header}
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
                defaultValue={data?.infoList[1].subHeader}
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
                name="second-partial-page-image"
            />
            {!secondImage && (
                <img
                    src={data?.infoList[1].imageUrl}
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
                defaultValue={data?.infoList[2].header}
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
                defaultValue={data?.infoList[2].subHeader}
                {...register("thirdSubHeader", { required: true })}
                placeholder="Third Sub Header"
                className="admin-textarea"
            />
            {errors.thirdSubHeader && (
                <p className="admin-error">
                    Third slide sub header is required and must be valid
                </p>
            )}
            <UploadImage setImage={setThirdImage} name="third-partial-page-image" />
            {!thirdImage && <img src={data?.infoList[2].imageUrl} alt="" className="preview-image" />}
            {/* ---------------------------------------------------------------------------------- */}
            <button type="submit" className="admin-button">
                Submit
            </button>
        </form>
    );
};
export default EditPartialPage;
