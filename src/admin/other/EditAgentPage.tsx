import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../api/firestore";
import { useNavigate } from "react-router-dom";
interface FormMap {
    body: string;
    header: string;
    whatsapp: string;
}
interface DataMap {
    [key: string]: string;
}
const EditAgentPage = () => {
    const [data, setData] = useState<DataMap>();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormMap>();
    useEffect(() => {
        const docRef = doc(collection(db, "agent"), "agentPage");
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
        const docRef = doc(collection(db, "agent"), "agentPage");
        await setDoc(docRef, data);
        navigate("/");
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="admin-main-header">Edit Agent Page</h1>
            <label htmlFor="body" className="admin-label">
                Body of the post (Code)
            </label>
            <textarea
                id="body"
                defaultValue={data?.body}
                {...register("body", { required: true })}
                placeholder="Post Body code"
                className="admin-textarea"
            />
            {errors.body && (
                <p className="admin-error">
                    Body of the post is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="header" className="admin-label">
                Agent Page Header
            </label>
            <textarea
                id="header"
                defaultValue={data?.header}
                {...register("header", { required: true })}
                placeholder="Header"
                className="admin-textarea"
            />
            {errors.header && (
                <p className="admin-error">Agent Page Header is required</p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="whatsapp" className="admin-label">
                Agent Page whatsapp link
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
                placeholder="link"
                className="admin-input"
            />
            {errors.whatsapp &&
                (errors.whatsapp.message ? (
                    <p className="admin-error">{errors.whatsapp.message}</p>
                ) : (
                    <p className="admin-error">
                        Agent Page whatsapp link is required
                    </p>
                ))}
            {/* ---------------------------------------------------------------------------------- */}
            <button type="submit" className="admin-button">
                Submit
            </button>
        </form>
    );
};
export default EditAgentPage;
