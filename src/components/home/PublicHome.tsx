import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firestore";
import { useEffect, useState } from "react";
import "./public-home.css"

import "./news-home.css";

import Slider  from "../global/Slider"
const PublicHome:React.FC = ()=>{
    interface paramtersMap {
        [key: string]: any;
    }
    interface publicHomeMap {
        dataList : [{
            [key: string]: string;
        }]
        header:string,
        link:string
    }
    const [publicHome, setPublicHome] = useState<publicHomeMap>()
    useEffect(() => {
        // getting the new data related to the home page
        const fetchDataHome = async () => {
            const docRef = doc(collection(db, "home"), "public");
            await getDoc(docRef).then((res: paramtersMap): void => {
                const date: publicHomeMap = res.data();
                setPublicHome(date);
            });
        };
        fetchDataHome();       
    }, []);
    return(
        <div className="public-home">
            <div className="container">
                    <Slider header={publicHome?.header} dataList={publicHome?.dataList} linkTo={publicHome?.header} />
            </div>
        </div>
    )
}
export default PublicHome