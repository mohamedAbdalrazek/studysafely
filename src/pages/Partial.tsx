import "./partial.css";
import Slider from "../components/global/Slider";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../api/firestore";
import { useEffect, useState } from "react";
import List from "../components/partial/List";
import SideBar from "../components/global/SideBar";
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
    const scholarListRef = collection(
        doc(collection(db, "partial"), "partialScholars"),
        "partialScholars"
    );
    return (
        <div className="partial">
            <div className="container sub-page">
                <div className="left-section">
                    <Slider
                        dataList={pageData?.infoList}
                        header={pageData?.infoTitle}
                        linkTo={undefined}
                    />
                    <List listRef={scholarListRef} />
                </div>
                <div className="right-section">
                    <SideBar root="partial" filter=""/>
                </div>
            </div>
        </div>
    );
};
export default Partial;
