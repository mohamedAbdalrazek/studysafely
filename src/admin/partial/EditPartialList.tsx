import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firestore";
import EditListItem from "../global/EditListItem";
import { Link } from "react-router-dom";

interface paramtersMap {
    [key: string]: any;
}
interface PartialListMap {
    body:string;
    buttonLink:string;
    buttonText:string;
    hashtages:string;
    header:string;
    mainInfo:string;
    priceAfter:number;
    priceBefore:number;
    uniName:string;
    logoUrl:string;
    logoName:string;
}
const EditPartialList = ()=>{
    const [partialList, setPartialList] = useState<PartialListMap[]>([]);
    useEffect(() => {
        const newsUniRef = collection(
            doc(collection(db, "partial"), "partialScholars"),
            "partialScholars"
        );
        onSnapshot(newsUniRef, (res: paramtersMap): void => {
            const UniData: PartialListMap[] = res.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPartialList(UniData);
        });
    }, []);
    const handleDelete = async (name:string) => {
        const itemToBeDeleted = partialList?.filter((partial)=>partial.mainInfo == name)[0]
        const docRef = doc(doc(collection(db, "partial"), "partialScholars"),"partialScholars", itemToBeDeleted?.id);
        await deleteDoc(docRef)
    };
    const listElement = partialList.map((item)=>{
        const url:string = item.mainInfo.replace(/ /g, "-")

        return(
            <EditListItem name={item.mainInfo} isEdit={true} domain={url} handleDelete={handleDelete} />
        )
    })
    return(
        <div className="admin-list">
            <h1 className="admin-header">
                المنح الجزئية
            </h1>
            {listElement}
            <Link to={"add"} className="admin-button">
                Add a Partial Scholar
            </Link>
        </div>
    )
}
export default EditPartialList