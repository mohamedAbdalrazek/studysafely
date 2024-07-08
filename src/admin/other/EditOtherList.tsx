import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firestore";
import EditListItem from "../global/EditListItem";
import { Link } from "react-router-dom";


interface OtherListMap {
    backgroundUrl?: string;
    backgroundName?: string;
    imagesList?: ImageData[];
    name?: string;
    body?: string;
    whatsLink?: string;
    id:string
}

const EditOtherList = ()=>{
    const [otherList, setOtherList] = useState<OtherListMap[]>([]);
    useEffect(() => {
        const otherListRef = collection(db, "other")
        onSnapshot(otherListRef, (res): void => {
            const otherData: OtherListMap[] = res.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setOtherList(otherData);
        });
    }, []);
    const handleDelete = async (name:string) => {
        const itemToBeDeleted = otherList?.filter((service)=>service.name == name)[0]
        const docRef = doc(collection(db, "other"), itemToBeDeleted?.id);
        await deleteDoc(docRef)
    };
    const listElement = otherList.map((item)=>{
        const url: string = item?.name ? item.name.replace(/ /g, "-") : "";
        return(
            <EditListItem name={item.name||""} isEdit={true} domain={url} handleDelete={handleDelete} />
        )
    })
    return(
        <div className="admin-list">
            <h1 className="admin-header">
                الخدمات الأخري
            </h1>
            {listElement}
            <Link to={"add-news"} className="admin-button">
                Add other service
            </Link>
        </div>
    )
}
export default EditOtherList