
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firestore";
import "./list.css"
interface childrenMap {
    listHeader: string | undefined;
    listNumber: number | undefined;
}
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
const List = ()=>{
    const [scholarList, setScholarList] = useState<ScholarListMap[]>([]);
    useEffect(() => {
        const scholarListRef = collection(
            doc(collection(db, "partial"), "partialScholars"),
            "partialScholars"
        );
        onSnapshot(scholarListRef, (res: paramtersMap): void => {
            const scholarData: ScholarListMap[] = res.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setScholarList(scholarData);
        });
    }, []);
    console.log(scholarList)
    const scholarListElement = scholarList.map((scholar)=>{
        const hashtagesArray = scholar.hashtages.split(".");
        console.log(hashtagesArray)
        return(
            <div className="scholar">
                <div className="content">
                    <h3>
                        {scholar.mainInfo}
                    </h3>
                    <div className="sub-info">
                        <div className="left">
                            <button className="global-btn">اقرأ المزيد</button>
                            <button className="global-btn">{scholar.buttonText}</button>
                        </div>
                        <div className="right">
                            <div className="prices">
                                <span>
                                    {scholar.priceAfter}
                                </span>
                                <span>
                                    {scholar.priceBefore}
                                </span>
                            </div>
                            <div className="hashtages">
                                {
                                    hashtagesArray.map((hashtage)=>{
                                        return(
                                            <span className="hashtage">{hashtage}</span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="logo">
                    <img src={scholar.logoUrl} alt={scholar.logoName} />
                </div>
            </div>
        )
    })
    return(
        <div className="scholar-list">
            {scholarListElement}
        </div>
    )
}
export default List