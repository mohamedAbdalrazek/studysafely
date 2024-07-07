import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../api/firestore";
import { useNavigate } from "react-router-dom";
interface FormMap {
    [key: string]: string;
}
interface DataMap {
    [key: string]: string;
}
const EditFooter = () => {
    const [data, setData] = useState<DataMap>()
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormMap>();
    useEffect(()=>{
        const docRef = doc(collection(db, "global"), "footer");
        const getData = async ()=>{
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                const tempData = docSnap.data()
                reset(docSnap.data())
                return tempData as DataMap
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
    

    const onSubmit = (data: FormMap) => {
        const docRef = doc(collection(db, "global"), "footer")
        setDoc(docRef, data).then(()=>{
            navigate("/" );
        })
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="admin-main-header">Edit Footer</h1>
            <label htmlFor="address" className="admin-label">
                Address
            </label>
            <input
                id="address"
                defaultValue={data?.address}
                type="text"
                {...register("address", { required: true })}
                placeholder="Address"
                className="admin-input"
            />
            {errors.address && (
                <p className="admin-error">
                    Address is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="copyright" className="admin-label">
                Copyright
            </label>
            <input
                id="copyright"
                defaultValue={data?.copyright}
                type="text"
                {...register("copyright", { required: true })}
                placeholder="Copyright"
                className="admin-input"
            />
            {errors.copyright && (
                <p className="admin-error">
                    Copyright is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="header" className="admin-label">
                Links Header
            </label>
            <input
                id="header"
                defaultValue={data?.header}

                type="text"
                {...register("header", { required: true })}
                placeholder="Links Header"
                className="admin-input"
            />
            {errors.header && (
                <p className="admin-error">
                    Links Header is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="facebook" className="admin-label">
                Facebook Link
            </label>
            <input
                id="facebook"
                defaultValue={data?.facebook}
                type="text"
                {...register("facebook", {
                    required: true,
                    pattern: {
                        value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                        message: "Facbook link must be a valid URL",
                    },
                })}
                placeholder="Facebook Link"
                className="admin-input"
            />
            {errors.facebook && (errors.facebook.message?(
                <p className="admin-error">
                    {errors.facebook.message}
                </p>
            ):<p className="admin-error"> Footer Facebook link is required</p>)}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="instgram" className="admin-label">
                Instgram Link
            </label>
            <input
                id="instgram"
                defaultValue={data?.instgram}

                type="text"
                {...register("instgram", {
                    required: true,
                    pattern: {
                        value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                        message: "Instgram link must be a valid URL",
                    },
                })}
                placeholder="Instgram Link"
                className="admin-input"
            />
            {errors.instgram && (errors.instgram.message?(
                <p className="admin-error">
                    {errors.instgram.message}
                </p>
            ):<p className="admin-error"> Footer Instgram link is required</p>)}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="whatsapp" className="admin-label">
                Whatsapp Link
            </label>
            <input
                id="whatsapp"
                defaultValue={data?.whatsapp}

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
            ):<p className="admin-error"> Footer whatsapp link is required</p>)}
            {/* ---------------------------------------------------------------------------------- */}

            <button type="submit" className="admin-button">
                Submit
            </button>
        </form>
    );
};
export default EditFooter;
