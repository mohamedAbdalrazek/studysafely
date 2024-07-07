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
    infoHeader: string;
    listHeader: string;
    listNumber:number;
    videosHeader:string;
    whatsapp:string;
    infoList: {
        [key: string]: string;
    }[];
}

const EditPublicPage = () => {
    const [data, setData] = useState<FormedDataMap>()
    const navigate = useNavigate();

    const [firstImage, setFirstImage] = useState()
    const [secondImage, setSecondImage] = useState()
    const [thirdImage, setThirdImage] = useState()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormMap>();
    useEffect(()=>{
        const docRef = doc(collection(db, "public"), "public");
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
    

    const onSubmit = async (data: FormMap) => {
        let formedData: FormedDataMap = {
            infoHeader: data.infoHeader,
            listHeader:data.listHeader,
            listNumber: Number(data.listNumber),
            videosHeader:data.videosHeader,
            whatsapp:data.whatsapp,
            infoList: [
                {
                    imageUrl: data.infoList[0].imageUrl,
                    imageName: data.infoList[0].imageName,
                    header: data.firstHeader,
                    subHeader: data.firstSubHeader,
                },
                {
                    imageUrl: data.infoList[1].imageUrl,
                    imageName: data.infoList[1].imageName,
                    header: data.secondHeader,
                    subHeader: data.secondSubHeader,
                },
                {
                    imageUrl: data.infoList[2].imageUrl,
                    imageName: data.infoList[2].imageName,
                    header: data.thirdHeader,
                    subHeader: data.thirdSubHeader,
                },
            ],
        };
        const firstImageName = firstImage?.name.split(".")[0];
        const secondImageName = secondImage?.name.split(".")[0];
        const thirdImageName = thirdImage?.name.split(".")[0];
        const firstImageRef = ref(mediaUrl, `public/${firstImageName}${uuidv4()}`);
        const secondImageRef = ref(mediaUrl, `public/${secondImageName}${uuidv4()}`);
        const thirdImageRef = ref(mediaUrl, `public/${thirdImageName}${uuidv4()}`);
    
        const uploadImages = async () => {
            if (firstImage) {
                const firstUploadResult = await uploadBytes(firstImageRef, firstImage);
                const firstImageUrl = await getDownloadURL(firstUploadResult.ref);
    
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
                const secondUploadResult = await uploadBytes(secondImageRef, secondImage);
                const secondImageUrl = await getDownloadURL(secondUploadResult.ref);
    
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
                const thirdUploadResult = await uploadBytes(thirdImageRef, thirdImage);
                const thirdImageUrl = await getDownloadURL(thirdUploadResult.ref);
    
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
    
        const docRef = doc(collection(db, "public"), "public");
        await setDoc(docRef, formedData);
        navigate("/public");
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="admin-main-header">Edit Public Page</h1>

            <label htmlFor="infoHeader" className="admin-label">
                Public Page Info Header
            </label>
            <input
                id="infoHeader"
                defaultValue={data?.infoHeader}
                type="text"
                {...register("infoHeader", { required: true })}
                placeholder="Info Header"
                className="admin-input"
            />
            {errors.infoHeader && (
                <p className="admin-error">
                    Public Page Info Header is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="listHeader" className="admin-label">
                Public Page List Header
            </label>
            <input
                id="listHeader"
                defaultValue={data?.listHeader}
                type="text"
                {...register("listHeader", { required: true })}
                placeholder="List Header"
                className="admin-input"
            />
            {errors.listHeader && (
                <p className="admin-error">
                    Public Page List Header is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="listNumber" className="admin-label">
                Number of universities per page
            </label>
            <input
                id="listNumber"
                defaultValue={data?.listNumber}
                type="number"
                {...register("listNumber", { required: true })}
                placeholder="Number of universities"
                className="admin-input"
            />
            {errors.listNumber && (
                <p className="admin-error">
                    Number of universities is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="videosHeader" className="admin-label">
                Public Page Videos Header
            </label>
            <input
                id="videosHeader"
                defaultValue={data?.videosHeader}
                type="text"
                {...register("videosHeader", { required: true })}
                placeholder="Videos Header"
                className="admin-input"
            />
            {errors.videosHeader && (
                <p className="admin-error">
                    Public Page Videos Header is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="whatsapp" className="admin-label">
                Whatsapp Link
            </label>
            <input
                id="whatsapp"
                defaultValue={data?.whatsapp}
                type="text"
                {...register("whatsapp", { required: true })}
                placeholder="Whatsapp Link"
                className="admin-input"
            />
            {errors.whatsapp && (
                <p className="admin-error">
                    Whatsapp Link is required and must be valid
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
                name="first-public-page-image"
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
                name="second-public-page-image"
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
            <UploadImage setImage={setThirdImage} name="third-public-page-image" />
            {!thirdImage && <img src={data?.infoList[2].imageUrl} alt="" className="preview-image" />}
            {/* ---------------------------------------------------------------------------------- */}
            <button type="submit" className="admin-button">
                Submit
            </button>
        </form>
    );
};
export default EditPublicPage;
