import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../api/firestore";
import { useNavigate } from "react-router-dom";

interface FormMap{
    title:string;
    numberOfNews:number;
}
interface DataMap {
    numberOfNews: number;
    title: string;
}
const EditNewsHome = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<DataMap>()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormMap>();
    useEffect(()=>{
        const docRef = doc(collection(db, "home"), "news");
        const getData = async ()=>{
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                const tempData = docSnap.data()
                return tempData as DataMap
            }
            else{
                console.error("No such document!");
                return undefined;
            }
        }
        getData().then(res=>{
            setData(res);
            reset()
        }).catch((err)=>{
            console.log(err)
        })
    },[reset])
    
    
    const onSubmit = (data:FormMap) => {
        data.numberOfNews = Number(data.numberOfNews)
        const docRef = doc(collection(db, "home"), "news")
        setDoc(docRef, data).then(()=>{
            navigate("/" );
        })
        
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="admin-main-header">
                Edit News Home
            </h1>
            <label htmlFor="title" className="admin-label">News Home Header</label>
            <input id="title" defaultValue={data?.title} type="text" {...register("title", { required: true})} placeholder="Header" className="admin-input" />
            {errors.title && <p className="admin-error">News Home Header is required and must be valid</p>}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="numberOfNews" className="admin-label">Number of News at home page</label>
            <input id="numberOfNews" defaultValue={data?.numberOfNews} type="number"  min="0" {...register("numberOfNews", { required: true })} placeholder="News Number" className="admin-input"/>
            {errors.numberOfNews && <p className="admin-error">Number of News is required</p>}
            {/* ---------------------------------------------------------------------------------- */}
            <button type="submit" className="admin-button">Submit</button>
        </form>
    );
};
export default EditNewsHome;
