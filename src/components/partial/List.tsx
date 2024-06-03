
import { collection, doc, onSnapshot } from "firebase/firestore";
import { forwardRef, useEffect, useState } from "react";
import { db } from "../../api/firestore";
import "./list.css"
import { Link } from "react-router-dom";
interface childrenMap {
    [key: string]: any;
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
const List = (children:childrenMap)=>{
    const [scholarList, setScholarList] = useState<ScholarListMap[]>([]);
    useEffect(() => {
        
        const scholarListRef = children.listRef
        onSnapshot(scholarListRef, (res: paramtersMap): void => {
            const scholarData: ScholarListMap[] = res.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setScholarList(scholarData);
        });
    }, []);
    const scholarListElement = scholarList.map((scholar)=>{
        const hashtagesArray = scholar.hashtages.split(".");
        const url:string = scholar.mainInfo.replace(/ /g, "-")
        return(
            <div className="scholar">
                <div className="content">
                    <h3>
                        {scholar.mainInfo}
                    </h3>
                    <div className="sub-info">
                        <div className="left">
                            <Link to={"/partial/"+url} className="global-btn">اقرأ المزيد</Link>
                            <a  href={scholar.buttonLink} className="global-btn">{scholar.buttonText}</a>
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