import "./partial.css";
import Slider from "../components/global/Slider";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../api/firestore";
import { useEffect, useState } from "react";
import List from "../components/partial/List";
import SideBar from "../components/global/SideBar";
const Partial = () => {
    interface pageDatamap {
        infoList?: [
            {
                [key: string]: string;
            }
        ];
        infoTitle?: string;
        listNumber?: number;
    }

    const [pageData, setPageData] = useState<pageDatamap>();
    useEffect(() => {
        const docRef = doc(collection(db, "partial"), "partial");
        getDoc(docRef).then((res): void => {
            const date = res.data();
            setPageData(date);
        });
    }, []);
    return (
        <div className="partial">
            <div className="container sub-page">
                <div className="left-section">
                    <Slider 
                        dataList={pageData?.infoList}
                        header={pageData?.infoTitle}
                        linkTo={undefined}
                    />
                    <List isPrivate={false} location={undefined} />
                </div>
                <div className="right-section">
                    <SideBar root="partial" filter=""/>
                </div>
            </div>
        </div>
    );
};
export default Partial;
