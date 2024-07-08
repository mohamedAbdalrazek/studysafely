import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./list.css";
import { Link } from "react-router-dom";
import { db } from "../../api/firestore";

interface ScholarListMap {
    body?: string;
    buttonLink?: string;
    buttonText?: string;
    hashtages?: string;
    header?: string;
    mainInfo?: string;
    priceAfter?: number;
    priceBefore?: number;
    uniName?: string;
    logoUrl?: string;
    logoName?: string;
    id: string;
}
const List = ({
    isPrivate,
    location,
}: {
    isPrivate: boolean;
    location: string | undefined;
}) => {
    const [scholarList, setScholarList] = useState<ScholarListMap[]>([]);
    useEffect(() => {
        const scholarListRef = collection(
            doc(collection(db, "partial"), "partialScholars"),
            "partialScholars"
        );
        const q = query(scholarListRef, where("uniName", "==", location?location:""));
        onSnapshot(isPrivate ? q : scholarListRef, (res): void => {
            const scholarData: ScholarListMap[] = res.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setScholarList(scholarData);
        });
    }, [isPrivate, location]);
    const scholarListElement = scholarList.map((scholar) => {
        const hashtagesArray = scholar.hashtages
            ? scholar.hashtages.split(".")
            : [];
        const url: string = scholar.mainInfo
            ? scholar.mainInfo.replace(/ /g, "-")
            : "";
        return (
            <div className="scholar">
                <div className="content">
                    <h3>{scholar.mainInfo}</h3>
                    <div className="sub-info">
                        <div className="left">
                            <Link to={`/partial/${url}`} className="global-btn">
                                اقرأ المزيد
                            </Link>
                            <a href={scholar.buttonLink} className="global-btn">
                                {scholar.buttonText}
                            </a>
                        </div>
                        <div className="right">
                            <div className="prices">
                                <span>{scholar.priceAfter}</span>
                                <span>{scholar.priceBefore}</span>
                            </div>
                            <div className="hashtages">
                                {hashtagesArray.map((hashtage) => {
                                    return (
                                        <span className="hashtage">
                                            {hashtage}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="logo">
                    <img src={scholar.logoUrl} alt={scholar.logoName} />
                </div>
            </div>
        );
    });
    return (
        <>
            {scholarList.length > 0 ? (
                <div className="scholar-list">{scholarListElement}</div>
            ) : (
                <h1
                    style={{
                        textAlign: "center",
                        marginTop: "40px",
                        color: "var(--sub-dark)",
                    }}
                >
                    لا توجد منح حاليا
                </h1>
            )}
        </>
    );
};
export default List;
