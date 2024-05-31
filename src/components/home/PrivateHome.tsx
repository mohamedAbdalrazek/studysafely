import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./private-home.css"

const PrivateHome:React.FC = ()=>{
    interface paramtersMap {
        [key: string]: any;
    }
    interface privateHomeMap {
        [key: string]: string;
    }
    const [privateHome, setPrivateHome] = useState<privateHomeMap>()
    useEffect(() => {
        // getting the new data related to the home page
        const fetchDataHome = async () => {
            const docRef = doc(collection(db, "home"), "private");
            await getDoc(docRef).then((res: paramtersMap): void => {
                const date: privateHomeMap = res.data();
                setPrivateHome(date);
            });
        };
        fetchDataHome();       
    }, []);
    return(
        <div className="private-home">
            <div className="container">
                <h1 className="special-header">
                    {privateHome?.header}
                </h1>
                <div className="content">
                    <div className="left">
                        <div >
                            <h3>
                                {privateHome?.title}
                            </h3>
                            <p>
                                {privateHome?.subTitle}
                            </p>
                            <Link className="special-link" to="private">{privateHome?.link}</Link>
                        </div>
                    </div>
                    <div className="right">
                        <img src={privateHome?.imageUrl} alt={privateHome?.imageName} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PrivateHome