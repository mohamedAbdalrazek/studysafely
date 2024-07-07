import { Link, useOutletContext } from "react-router-dom";
import ImageSlider from "../../global/ImagesSlider";
import parse from 'html-react-parser';
import { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../api/firestore";

interface UniMap {
    body: string;
    fee: number;
    fieldsHeader: string;
    backgroundUrl: string;
    backgroundName: string;
    fieldsList: {
        buttonLink: string;
        duration: number;
        fee: number;
        language: string;
        name: string;
    }[];
    imagesList:[{[key:string]:string}]
    location: string;
    logoName: string;
    logoUrl: string;
    name: string;
    studentsNumber: number;
    whatsLink: string;
}
interface paramtersMap {
    [key: string]: any;
}
interface FlagsMap{
    [key: string]: string;

}
const PrivateMain = () => {
    const unitemp:UniMap[] = useOutletContext();
    const uni:UniMap = unitemp[0];
    const [flags, setFlags] = useState<FlagsMap>()
    useEffect(()=>{
        const flagsRef = doc(collection(db, "global"), "flags")
        getDoc(flagsRef).then((res: paramtersMap): void => {
            const date = res.data();
            setFlags(date);
        });
    },[])
    const fieldsList = uni?.fieldsList.map((field)=>{
        return(
            <div className="field" key={field.name}>
                <h3>
                    {field.name}
                </h3>
                <p className="duration">
                    {field.duration} سنين
                </p>
                <div className="language">
                    {field.language=="en" ? "اللغة الأنجليزية":"اللغة العربية"}
                    <img src={field.language=="en" ?flags?.english:flags?.turkish} alt="" />
                </div>
                <p className="fee">
                    {field.fee}$/سنة
                </p>
                <Link to={field.buttonLink}>
                    قدم علي التخصص
                </Link>
            </div>
        )
    })
    return (
        <div>
            <div className="main-info">
                <div className="logo">
                    <img src={uni?.logoUrl} alt={uni?.logoName} />
                </div>
                <div className="info">
                    <span>Location: {uni?.location}</span>
                    <span>Average fee: {uni?.fee}$</span>
                    <span>Students: {uni?.studentsNumber}</span>
                </div>
            </div>
            <h3 className="special-sub-header">صور من الجامعة</h3>
            <ImageSlider images={uni?.imagesList} />
            <div className="body">{uni?.body && parse(uni?.body)}</div>
            <div className="fields">
                <h3 className="special-sub-header">التخصصات</h3>
                <div className="fields-list">
                    {fieldsList}
                </div>
            </div>
        </div>
    );
};
export default PrivateMain;
