import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../api/firestore";
import { useNavigate } from "react-router-dom";
interface FormMap {
    [key: string]: string;
}
interface DataMap {
    number: number;
    sidebarPrivate: string;
    sidebarPublic: string;
    sidebarVideos: string;
    title: string;
}
const EditNewsPage = () => {
    const [data, setData] = useState<DataMap>();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormMap>();
    useEffect(() => {
        const docRef = doc(collection(db, "news"), "page");
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
    

    const onSubmit = (data: FormMap) => {
        const docRef = doc(collection(db, "news"), "page")
        setDoc(docRef, data).then(()=>{
            navigate("/news" );
        })
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="admin-main-header">Edit Partial Page</h1>
            <label htmlFor="title" className="admin-label">
                News Page Header
            </label>
            <input
                id="title"
                defaultValue={data?.title}
                type="text"
                {...register("title", { required: true })}
                placeholder="Header"
                className="admin-input"
            />
            {errors.header && (
                <p className="admin-error">
                    News Page Header is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="number" className="admin-label">
                Number of News Per Page
            </label>
            <input
                id="number"
                type="number"
                defaultValue={data?.number}
                {...register("number", { required: true })}
                placeholder="Number"
                className="admin-input"
            />
            {errors.header && (
                <p className="admin-error">
                    Number of News is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <button type="submit" className="admin-button">
                Submit
            </button>
        </form>
    );
};
export default EditNewsPage;
