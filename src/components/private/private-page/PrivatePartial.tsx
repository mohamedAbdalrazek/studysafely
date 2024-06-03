import { collection, doc, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { db } from "../../../api/firestore"
import List from "../../partial/List";
interface paramtersMap {
    [key: string]: any;
}
interface ScholarListMap {
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
const PrivatePartial = ()=>{
    const location = useLocation().pathname.split("/")[2].split("-").join(" ")
    // console.log(location)
    // const [scholar, setScholar] = useState<ScholarListMap[]>()
    // useEffect(()=>{
        
    //     onSnapshot(q, (res: paramtersMap): void => {
    //         const scholarData: ScholarListMap[] = res.docs.map((doc: any) => ({
    //             ...doc.data(),
    //             id: doc.id,
    //         }));
    //         setScholar(scholarData);
    //     });
    // },[])
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
