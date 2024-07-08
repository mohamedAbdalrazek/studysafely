import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firestore";
import "./uni-list.css"
import { Link } from "react-router-dom";
interface childrenMap {
    listHeader: string | undefined;
    listNumber: number | undefined;
}
interface UniListMap {
    body?: string;
    fee?: number;
    fieldsHeader?: string;
    backgroundUrl?: string;
    backgroundName?: string;
    desc?: string;
    imagesList?: {
        [key: string]: string;
    }[];
    location?: string;
    logoName?: string;
    logoUrl?: string;
    name?: string;
    studentsNumber?: number;
    whatsLink?: string;
    id:string
}
const UniList = (children: childrenMap) => {
    const [uniList, setUniList] = useState<UniListMap[]>([]);
    useEffect(() => {
        const newsUniRef = collection(
            doc(collection(db, "public"), "publicUni"),
            "publicUni"
        );
        onSnapshot(newsUniRef, (res): void => {
            const UniData = res.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUniList(UniData);
        });
    }, []);
    const uniListElement = uniList.map((uni, index) => {
        const url:string = uni.name?uni.name.replace(/ /g, "-"):""
        
        return (
            <Link to={url} className={`uni ${index%2 &&"reverse"}`} key={uni.name}>
                <div className="background">
                    <img src={uni.backgroundUrl} alt={uni.backgroundName} />
                </div>
                <div className="text">
                    <h3>{uni.name}</h3>
                    <span>{uni.location}</span>
                    <p>{uni.desc}</p>
                </div>
                <div className="logo">
                    <img src={uni.logoUrl} alt={uni.logoName} />
                </div>
            </Link>
        );
    });
    return (
        <div className="public-uni-list">
            <h1 className="special-header">
                {children.listHeader}
            </h1>
            <div className="list">
                {uniListElement}
            </div>
        </div>
    );
};

export default UniList;
