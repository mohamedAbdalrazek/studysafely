// import { collection, doc, getDoc } from "firebase/firestore";
// import { db } from "../api/firestore";
// import { useEffect, useState } from "react";
import Landing from "../components/home/Landing"
import NewsHome from "../components/home/NewsHome"
import PublicHome from "../components/home/PublicHome"
const Home: React.FC = ()=>{
    return(
        <>
            <Landing />
            <NewsHome />
            <PublicHome />
        </>
    )
}
export default Home