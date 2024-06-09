import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../api/firestore";
import { Link } from "react-router-dom";
import SidePrivate from "./sidebar/SidePrivate";
import SidePublic from "./sidebar/SidePublic";
import SideNews from "./sidebar/SideNews";
import SideVideos from "./sidebar/SideVideos";
import "./sidebar/sidebar.css"
interface ChildrenMap {
    root: "public" | "private" | "news" | "videos" | "partial";
    filter:string|undefined
}
const SideBar = (children: ChildrenMap) => {
    const root = children.root;
    const filter = children.filter
    return (
        <div className="sidebar">
            <SidePrivate filter={`${root === "private" ? filter :""}`} />
            <SidePublic filter={`${root === "public" ? filter :""}`} />
            {!(root === "news") &&<SideNews />}
            {!(root === "videos") && <SideVideos />}
        </div>
    );
};
export default SideBar;
