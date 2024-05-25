import Slider from "../components/global/Slider";
import "./private.css";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../api/firestore";
import { useEffect, useState } from "react";
import PrivateVideos from "../components/private/PrivateVideos";
import UniList from "../components/private/UniList";
const Private = () => {
    interface paramtersMap {
        [key: string]: any;
    }
    interface pageDatamap {
        info: [
            {
                [key: string]: string;
            }
        ];
        infoHeader: string;
        listHeader: string;
        listNumber: number;
        moreVideos: string;
        videosHeader: string;
        whatsLink: string;
    }

    const [pageData, setPageData] = useState<pageDatamap>();
    useEffect(() => {
        const docRef = doc(collection(db, "private"), "private");
        getDoc(docRef).then((res: paramtersMap): void => {
            const date = res.data();
            setPageData(date);
        });
    }, []);
    return (
        <div className="private">
            <div className="container">
                <Slider
                    header={pageData?.infoHeader}
                    dataList={pageData?.info}
                    linkTo={undefined}
                />
                <PrivateVideos
                    header={pageData?.videosHeader}
                    more={pageData?.moreVideos}
                />
                <UniList
                    listHeader={pageData?.listHeader}
                    listNumber={pageData?.listNumber}
                />
            </div>
        </div>
    );
};
export default Private;
