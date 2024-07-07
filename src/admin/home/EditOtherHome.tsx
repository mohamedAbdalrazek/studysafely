import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../api/firestore";
import { useNavigate } from "react-router-dom";
interface FormMap{
    [key:string]:string
}
interface DataMap {
    header:string
}
const EditOtherHome = () => {
    const [data, setData] = useState<DataMap>()
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormMap>();
    useEffect(()=>{
        const docRef = doc(collection(db, "home"), "other");
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
    
    
    const onSubmit = (data:FormMap) => {
        const docRef = doc(collection(db, "home"), "other")
        setDoc(docRef, data).then(()=>{
            navigate("/" );
        })
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="admin-main-header">
                Edit Other Home
            </h1>
            <label htmlFor="header" className="admin-label">Other Home Header</label>
            <input id="header" defaultValue={data?.header} type="text" {...register("header", { required: true})} placeholder="Header" className="admin-input" />
            {errors.header && <p className="admin-error">Other Home Header is required and must be valid</p>}
            {/* ---------------------------------------------------------------------------------- */}

            <button type="submit" className="admin-button">Submit</button>
        </form>
    );
};
export default EditOtherHome;
