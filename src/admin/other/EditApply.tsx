import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../api/firestore";
import { useNavigate } from "react-router-dom";

interface FormMap {
    title: string;
    subTitle: string;
    whatsapp: string;

}
interface DataMap {
    [key: string]: string;
}
const EditApply = () => {
    const [data, setData] = useState<DataMap>();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormMap>();
    useEffect(() => {
        const docRef = doc(collection(db, "apply"), "apply");
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
        const docRef = doc(collection(db, "apply"), "apply");
        await setDoc(docRef, data);
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="admin-main-header">Edit Apply Page</h1>
            <label htmlFor="title" className="admin-label">
                Apply Page Header
            </label>
            <input
                id="title"
                defaultValue={data?.title}
                type="text"
                {...register("title", { required: true })}
                placeholder="Header"
                className="admin-input"
            />
            {errors.title && (
                <p className="admin-error">
                    Apply Page Header is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="subTitle" className="admin-label">
                Apply Page Sub Header
            </label>
            <textarea
                id="subHeader"
                defaultValue={data?.subTitle}
                {...register("subTitle", { required: true })}
                placeholder="Sub Header"
                className="admin-textarea"
            />
            {errors.subTitle && (
                <p className="admin-error">Apply Page Sub Header is required</p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="whatsapp" className="admin-label">
                Apply Page whatsapp link
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
                        {" "}
                        Apply Page whatsapp link is required
                    </p>
                ))}

            {/* <UploadVideo setVideo={setVideo} name="apply-page-video" />
            {!video && (
                <ReactPlayer
                    url={data?.videoUrl}
                    width={"45%"}
                    height={"500"}
                />
            )} */}
            {/* ---------------------------------------------------------------------------------- */}
            <button type="submit" className="admin-button">
                Submit
            </button>
        </form>
    );
};
export default EditApply;
