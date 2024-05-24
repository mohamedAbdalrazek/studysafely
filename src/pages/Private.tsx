import Slider from "../components/global/Slider"
import "./private.css"
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../api/firestore";
import { useEffect, useState } from "react";
import PrivateVideos from "../components/private/PrivateVideos";
import UniList from "../components/private/UniList";
const Private= ()=>{
    interface paramtersMap {
        [key: string]: any;
    }
    interface pageDatamap{
        info:[{
            [key: string]: string;
        }];
        infoHeader:string;
        listHeader:string;
        listNumber:number;
        moreVideos:string;
        videosHeader:string;
        whatsLink:string;
    }
    interface UniListMap{
        body:string;
        fee:number;
        fieldsHeader:string;
        fieldsList:{
            buttonLink:string;
            duration:number;
            fee:number;
            language:string;
            name:string
        }[];
        location:string;
        logoName:string;
        logoUrl:string;
        name:string;
        studentsNumber:number;
        whatsLink:string
    }
    const [pageData, setPageData] = useState<pageDatamap>();
    useEffect(() => {
        const docRef = doc(collection(db, "private"), "private");
        getDoc(docRef).then((res: paramtersMap): void => {
            const date = res.data();
            setPageData(date);
        });
        // const newsUniRef = collection(
        //     doc(collection(db, "news"), "newsList"),
        //     "newsList"
        // );
        // onSnapshot(newsUniRef, (res: paramtersMap): void => {
        //     const UniData: UniListMap[] = res.docs.map((doc: any) => ({
        //         ...doc.data(),
        //         id: doc.id,
        //     }));
        //     setUniList(UniData);
        // })
        
    },[]);
    return(
        <div className="private">
            <div className="container">

                <Slider header={pageData?.infoHeader} dataList={pageData?.info} linkTo={undefined} />
                <PrivateVideos header={pageData?.videosHeader} more={pageData?.moreVideos} />
                <UniList />
            </div>
        </div>
    )
}
export default Private