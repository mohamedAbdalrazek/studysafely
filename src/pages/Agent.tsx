import "./agent.css"
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../api/firestore";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
<<<<<<< HEAD
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";
=======
>>>>>>> origin/main
interface AgentMap {
    [key: string]: string;
}
interface paramtersMap{
    [key: string]: any;
}
const Agent = ()=>{
    const [agentData, setAgentData] = useState<AgentMap>({});
    const [video, setVideo] = useState<AgentMap>({});
    useEffect(() => { 
        const docRef = doc(collection(db, "agent"), "agentPage");
        const fetchData  = async ()=>{
            await getDoc(docRef).then((res: paramtersMap): void => {
                const date = res.data();
                setAgentData(date);
            });
        }
        fetchData()
        const videoRef = collection(doc(collection(db, "videos"), "other"), "videosList")
        const q = query(videoRef , where("domain" , "==", "agent"))
        onSnapshot(q, (res: paramtersMap): void => {
            const videos: AgentMap[] = res.docs.map((doc:any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setVideo(videos[videos.length - 1]);
        });
    }, []);
    return(
        <div className="agent">
            <div className="container">
                <h1 className="special-header">
                    {agentData.header}
                </h1>
                <div className="content">
                
                    <div className="video">
                        <ReactPlayer url={video.videoUrl} controls={true} width={"100%"} height={"auto"} />
                        <h3>
                            {video.videoName}
                        </h3>
                    </div>
                    <div className="body">
                        {agentData?.body && parse(agentData?.body)}
                    </div>
                </div>
            </div>
<<<<<<< HEAD
            <Link to={agentData?.whatsapp??""} className="whatsapp">
                <FontAwesomeIcon icon={faSquareWhatsapp} style={{color: "#6ada5f",}} />
            </Link>
=======
>>>>>>> origin/main
        </div>
    )
}
export default Agent