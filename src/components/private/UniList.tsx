import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firestore";
import "./uni-list.css";
import { Link } from "react-router-dom";
interface childrenMap {
    listHeader: string | undefined;
    listNumber: number | undefined;
}
interface paramtersMap {
    [key: string]: any;
}
interface UniListMap {
    body: string;
    fee: number;
    fieldsHeader: string;
    backgroundUrl: string;
    backgroundName: string;
    fieldsList: {
        buttonLink: string;
        duration: number;
        fee: number;
        language: string;
        name: string;
    }[];
    location: string;
    logoName: string;
    logoUrl: string;
    name: string;
    studentsNumber: number;
    whatsLink: string;
}
const UniList = (children: childrenMap) => {
    const [uniList, setUniList] = useState<UniListMap[]>([]);
    useEffect(() => {
        const newsUniRef = collection(
            doc(collection(db, "private"), "privateUni"),
            "privateUni"
        );
        onSnapshot(newsUniRef, (res: paramtersMap): void => {
            const UniData: UniListMap[] = res.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUniList(UniData);
        });
    }, []);
    const uniListElement = uniList?.map((uni) => {
        const url:string = uni.name.replace(/ /g, "-")
        return (
            <Link to={url} className="uni">
                <div className="background">
                    <img src={uni?.backgroundUrl} alt={uni.backgroundName} />
                </div>
                <div className="uni-info">
                    <div className="main-info">
                        <div className="logo">
                            <img src={uni?.logoUrl} alt={uni?.logoName} />
                        </div>
                        <div className="text">
                            <h3>{uni?.name}</h3>
                            <p>{uni?.location}</p>
                        </div>
                    </div>
                    <div className="sub-info">
                        <span>مصاريف تبدأ من</span>
                        <span>{uni?.fee}</span>
                    </div>
                </div>
            </Link>
        );
    });
    return (
        <div className="uni-list">
            <h1 className="special-header">{children.listHeader}</h1>
            <div className="list">
                {uniListElement}
                {uniListElement}
                {uniListElement}
                {uniListElement}
                {uniListElement}
                {uniListElement}
            </div>
        </div>
    );
};
export default UniList;
