import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./landing.css"


const Landing:React.FC  = ()=>{
    interface LinkMap {
        [key: string]: string|undefined;
    }

    const [landingData, setLandingData] = useState<LinkMap|undefined>({});
    useEffect(() => {
        const docRef = doc(collection(db, "home"), "landing");
        getDoc(docRef).then((res): void => {
            const date = res.data();
            setLandingData(date);
        });
    }, []);
    return(
        <div className="landing">
            <div className="background">
                <img src={landingData?.backgroundUrl} alt={landingData?.backgroundName} />
            </div>
            <div className="content">
                <h1>
                    {landingData?.header}
                </h1>
                <p>
                    {landingData?.subHeader}
                </p>
                <Link to="apply" className="global-btn">{landingData?.button}</Link>
            </div>
        </div>
    )
}
export default Landing