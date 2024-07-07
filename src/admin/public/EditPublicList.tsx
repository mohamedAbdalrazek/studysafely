import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firestore";
import EditListItem from "../global/EditListItem";
import { Link } from "react-router-dom";

interface paramtersMap {
    [key: string]: any;
}
interface UniListMap {
    body: string;
    fee: number;
    fieldsHeader: string;
    backgroundUrl: string;
    backgroundName: string;
    desc: string;
    imagesList: {
        [key: string]: string;
    }[];
    location: string;
    logoName: string;
    logoUrl: string;
    name: string;
    studentsNumber: number;
    whatsLink: string;
    id:string
}
const EditPublicList = ()=>{
    const [uniList, setUniList] = useState<UniListMap[]>([]);
    useEffect(() => {
        const newsUniRef = collection(
            doc(collection(db, "public"), "publicUni"),
            "publicUni"
        );
        onSnapshot(newsUniRef, (res: paramtersMap): void => {
            const UniData: UniListMap[] = res.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUniList(UniData);
        });
    }, []);
    const handleDelete = async (name:string) => {
        const itemToBeDeleted = uniList?.filter((uni)=>uni.name == name)[0]
        const docRef = doc(doc(collection(db, "public"), "publicUni"),"publicUni", itemToBeDeleted?.id);
        await deleteDoc(docRef)
    };
    const listElement = uniList.map((item)=>{
        const url:string = item.name.replace(/ /g, "-")

        return(
            <EditListItem name={item.name} isEdit={true} domain={url} handleDelete={handleDelete} />
        )
    })
    return(
        <div className="admin-list">
            <h1 className="admin-header">
                الجامعات الحكومية
            </h1>
            {listElement}
            <Link to={"add"} className="admin-button">
                Add a University
            </Link>
        </div>
    )
}
export default EditPublicList