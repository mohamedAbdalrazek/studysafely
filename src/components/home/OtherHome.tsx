import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../api/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./other-home.css"
const OtherHome:React.FC = ()=>{
    //type script interfaces
    interface otherHomeDataMap {
        header?:string
    }
    interface otherListMap {
        [key: string]: string;
    }
    const [otherHomeData, setOtherHomeData] = useState<otherHomeDataMap>(); //data related to home page
    const [otherList, setOtherList] = useState<otherListMap[]>([]); //list of all the other services
    useEffect(() => {
        // getting the new data related to the home page
        const fetchDataHome = async () => {
            const docRef = doc(collection(db, "home"), "other");
            await getDoc(docRef).then((res): void => {
                const date = res.data();
                setOtherHomeData(date);
            });
        };
        fetchDataHome();

        //getting the other services list
        const listRef = collection(db,"other");
        onSnapshot(listRef, (res): void => {
            const otherArr: otherListMap[] = res.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setOtherList(otherArr);
        });
    }, []);
    //mapping over the list to create html elemnts
    const otherListElement = otherList?.map((other)=>{
        //getting the url from the name of the service
        let url:string = ""
        for (let i = 0; i < other.name.length; i++) {
            if(other.name[i] === " "){
                url += "-"
            }
            else{
                url += other.name[i]
            }
        }
        return(
            <Link to={url} key={other.name}>
                <span>
                    {other.name}
                </span>
                <img src={other.backgroundUrl} alt={other.backgroundName} />
            </Link>
        )
    })
    return(
        <div className="other-home">
            <div className="container">
                <h1 className="special-header">
                    {otherHomeData?.header}
                </h1>
                <div className="list">
                    {otherListElement}
                </div>
            </div>
            
        </div>
    )
}
export default OtherHome