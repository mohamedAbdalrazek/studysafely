import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../api/firestore";
import { Link } from "react-router-dom";

interface children {
    filter: string;
}
interface PrivateMap {
    body?: string;
    fee?: number;
    fieldsHeader?: string;
    backgroundUrl?: string;
    backgroundName?: string;
    fieldsList?: {
        buttonLink: string;
        duration: number;
        fee: number;
        language: string;
        name: string;
    }[];
    location?: string;
    logoName?: string;
    logoUrl?: string;
    name?: string;
    studentsNumber?: number;
    whatsLink?: string;
    id:string
}

const SidePrivate = (children: children) => {
    const [privateUniList, setPrivateUniList] = useState<PrivateMap[]>();
    useEffect(() => {
        const privateUniRef = collection(
            doc(collection(db, "private"), "privateUni"),
            "privateUni"
        );
        onSnapshot(privateUniRef, (res): void => {
            const data: PrivateMap[] = res.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPrivateUniList(data);
        });
    }, []);

    function getRandomElemnts(arr: PrivateMap[] | undefined) {
        if (arr === undefined) {
            return;
        }
        if (arr.length < 2) {
            return [arr[0]];
        }

        const index1 = Math.floor(Math.random() * arr.length);

        let index2;
        do {
            index2 = Math.floor(Math.random() * arr.length);
        } while (index2 === index1);

        // Return the two elements
        return [arr[index1], arr[index2]];
    }
    const filteredList = getRandomElemnts(
        privateUniList?.filter((uni) => uni.name != children.filter)
    );
    const listElement = filteredList?.map((uni) => {
        const url: string = uni.name?uni?.name.replace(/ /g, "-"):"";
        return (
            <Link to={"/private/" + url} key={uni?.name}>
                <div className="image">
                    <img src={uni?.logoUrl} alt={uni?.logoName} />
                </div>
                <div className="content">
                    <h3>{uni?.name}</h3>
                    <span className="location">{uni?.location}</span>
                </div>
            </Link>
        );
    });
    const check = filteredList ? filteredList[0] : undefined
    return (
        <>
            {check   && (
                <div className="side-uni">
                    <h1 className="side-header">بعض الجامعات الخاصة</h1>
                    {listElement}
                </div>
            )}
        </>
    );
};
export default SidePrivate;
