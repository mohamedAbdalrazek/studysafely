import "./partial.css";
import Slider from "../components/global/Slider";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../api/firestore";
import { useEffect, useState } from "react";
import List from "../components/partial/List";
const Partial = () => {
    interface paramtersMap {
        [key: string]: any;
    }
    interface pageDatamap {
        infoList: [
            {
                [key: string]: string;
            }
        ];
        infoTitle: string;
        listNumber: number;
    }

    const [pageData, setPageData] = useState<pageDatamap>();
    useEffect(() => {
        const docRef = doc(collection(db, "partial"), "partial");
        getDoc(docRef).then((res: paramtersMap): void => {
            const date = res.data();
            setPageData(date);
        });
    }, []);
    return (
        <div className="partial">
            <div className="container sub-page">
                <div className="left-section">
                    <Slider dataList={pageData?.infoList} header={pageData?.infoTitle} linkTo={undefined} />
                    <List />
                </div>
            </div>
        </div>
    );
};
export default Partial;
