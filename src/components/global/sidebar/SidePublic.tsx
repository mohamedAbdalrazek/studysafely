import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../api/firestore";
import { Link } from "react-router-dom";
interface paramtersMap {
    [key: string]: any;
}
interface children {
    filter: string;
}
interface PublicMap {
    body: string;
    fee: number;
    fieldsHeader: string;
    backgroundUrl: string;
    backgroundName: string;
    desc: string;
    imagesList: {
        [key: string]: string;
    }[];
    location: string;
    logoName: string;
    logoUrl: string;
    name: string;
    studentsNumber: number;
    whatsLink: string;
}
const SidePublic = (children: children) => {
    const [publicUniList, setPublicUniList] = useState<PublicMap[]>();
    useEffect(() => {
        const publiceUniRef = collection(
            doc(collection(db, "public"), "publicUni"),
            "publicUni"
        );
        onSnapshot(publiceUniRef, (res: paramtersMap): void => {
            const data: PublicMap[] = res.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPublicUniList(data);
        });
    }, []);
    function getRandomElemnts(arr: PublicMap[] | undefined) {
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
        publicUniList?.filter((uni) => uni.name != children.filter)
    );
    console.log(children.filter)
    const listElement = filteredList?.map((uni) => {
        const url: string = uni?.name.replace(/ /g, "-");
        return (
            <Link to={"/public/" + url} key={uni?.name}>
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
    const check = filteredList ? filteredList[0] : undefined;

    return (
        <>
            {check && (
                <div className="side-uni">
                    <h1 className="side-header">بعض الجامعات الحكومية</h1>
                    {listElement}
                </div>
            )}
        </>
    );
};
export default SidePublic;
