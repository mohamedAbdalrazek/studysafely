// import { collection, doc, getDoc } from "firebase/firestore";
// import { db } from "../api/firestore";
// import { useEffect, useState } from "react";
import Landing from "../components/home/Landing"
import NewsHome from "../components/home/NewsHome"
const Home: React.FC = ()=>{
    return(
        <>
            <Landing />
            <NewsHome />
        </>
    )
}
export default Home