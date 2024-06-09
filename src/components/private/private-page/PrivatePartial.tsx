import { collection, doc, query, where } from "firebase/firestore"
import { useLocation } from "react-router-dom"
import { db } from "../../../api/firestore"
import List from "../../partial/List";

const PrivatePartial = ()=>{
    const location = useLocation().pathname.split("/")[2].split("-").join(" ")
    const uniListRef = collection(
        doc(collection(db, "partial"), "partialScholars"),
        "partialScholars"
    );
    const q = query(uniListRef, where("uniName", "==", location));
    
    return(
        <div>
            <List listRef={q} />
        </div>
    )
}
export default PrivatePartial
