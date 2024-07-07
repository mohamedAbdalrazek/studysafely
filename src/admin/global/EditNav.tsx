import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../api/firestore";
import { useNavigate } from "react-router-dom";
interface FormMap{
    [key:string]:string
}
interface DataMap {
    [key: string]: string;
}
const EditNav = () => {
    const [data, setData] = useState<DataMap>()
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormMap>();

    useEffect(()=>{
        const docRef = doc(collection(db, "global"), "nav");
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
        const docRef = doc(collection(db, "global"), "nav")
        setDoc(docRef, data).then(()=>{
            navigate("/" );
        })
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="admin-main-header">
                Edit Nav
            </h1>
            <label htmlFor="home" className="admin-label">Home</label>
            <input id="home" defaultValue={data?.home} type="text" {...register("home", { required: true})} placeholder="Home" className="admin-input" />
            {errors.home && <p className="admin-error">Home in nav bar is required and must be valid</p>}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="public" className="admin-label">Public</label>
            <input id="public" defaultValue={data?.public}  type="text" {...register("public", { required: true})} placeholder="Public" className="admin-input" />
            {errors.public && <p className="admin-error">Public in nav bar is required and must be valid</p>}
            {/* ---------------------------------------------------------------------------------- */}
            
            <label htmlFor="private" className="admin-label">Private</label>
            <input id="private" defaultValue={data?.private}  type="text" {...register("private", { required: true})} placeholder="Private" className="admin-input" />
            {errors.private && <p className="admin-error">Private in nav bar is required and must be valid</p>}
            {/* ---------------------------------------------------------------------------------- */}
            
            <label htmlFor="news" className="admin-label">News</label>
            <input id="news" defaultValue={data?.news}  type="text" {...register("news", { required: true})} placeholder="News" className="admin-input" />
            {errors.news && <p className="admin-error">News in nav bar is required and must be valid</p>}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="partial" className="admin-label">Partial</label>
            <input id="partial" defaultValue={data?.partial}  type="text"  {...register("partial", { required: true})} placeholder="Partial" className="admin-input" />
            {errors.partial && <p className="admin-error">Partial in nav bar is required and must be valid</p>}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="videos" className="admin-label">Videos</label>
            <input id="videos" defaultValue={data?.videos}  type="text" {...register("videos", { required: true})} placeholder="Videos" className="admin-input" />
            {errors.videos && <p className="admin-error">Videos in nav bar is required and must be valid</p>}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="agent" className="admin-label">Agent</label>
            <input id="agent" defaultValue={data?.agent}  type="text"  {...register("agent", { required: true})} placeholder="Agent" className="admin-input" />
            {errors.agent && <p className="admin-error">Agent in nav bar is required and must be valid</p>}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="button" className="admin-label">Button Text</label>
            <input id="button" defaultValue={data?.button}  type="text" {...register("button", { required: true})} placeholder="Button Text" className="admin-input" />
            {errors.button && <p className="admin-error">Button Text in nav bar is required and must be valid</p>}
            {/* ---------------------------------------------------------------------------------- */}

            <button type="submit" className="admin-button">Submit</button>
        </form>
    );
};
export default EditNav;
