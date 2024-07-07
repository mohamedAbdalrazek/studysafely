import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, mediaUrl } from "../../api/firestore";
import { v4 as uuidv4 } from "uuid";
import UploadImage from "../global/UploadImage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface paramtersMap {
    [key: string]: any;
}
interface newsListMap {
    hashtages: string;
    parentDomain: string;
    subDomain: string;
    subTitle: string;
    title: string;
}
interface FormedDataMap {
    hashtages: string[];
    date: string;
    imageName: string;
    imageUrl: string;
    sortDate: number;
    parentDomain: string;
    subDomain: string;
    subTitle: string;
    title: string;
}
const AddNews = () => {
    const navigate = useNavigate();
    const [names, setNames] = useState<string[]>([]);
    const [sending, setSending] = useState(false);
    const [image, setImage] = useState<File>();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const months = [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
    ];
    const handleDropdownChange = async (event) => {
        const value = event.target.value;
        const subRefKey =
            value == "private"
                ? "privateUni"
                : value == "public"
                ? "publicUni"
                : value == "partial"
                ? "partialScholars"
                : value == "other"
                ? "other"
                : "";
        let ref;
        if (subRefKey === "other") {
            ref = collection(db, subRefKey);
        } else if (subRefKey) {
            ref = collection(doc(collection(db, value), subRefKey), subRefKey);
        }
        if (subRefKey) {
            onSnapshot(ref, (res: paramtersMap): void => {
                const arr: [] = res.docs.map((doc: any) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                const names: string[] = [];
                arr.forEach((item) => {
                    if (value != "partial") {
                        names.push(item?.name);
                    } else {
                        names.push(item?.mainInfo);
                    }
                });
                setNames(names);
            });
        } else {
            setNames([]);
        }
    };
    const onParentSubmit = async (data: newsListMap) => {
        setSending(true);
        const hashtages = data.hashtages.split(".");
        const date = new Date();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const currentDate = (`${month}/${year}`);
        const sortDate = (Math.floor(date.getTime() / 1000));
        const url:string = data.subDomain.replace(/ /g, "-")
        let formedData:FormedDataMap = {
            ...data,
            hashtages:hashtages,
            subDomain:url,
            date:currentDate,
            sortDate:sortDate,
            imageName:"",
            imageUrl:""
        }
        const uploadImage = async () => {
            if (image) {
                const imageName = image?.name.split(".")[0];
                const imageRef = ref(
                    mediaUrl,
                    `news/${imageName}${uuidv4()}`
                );
                const uploadResult = await uploadBytes(
                    imageRef,
                    image
                );
                const imageUrl = await getDownloadURL(uploadResult.ref);
                formedData = {
                    ...formedData,
                    imageUrl: imageUrl,
                    imageName: imageName,
                };
            }
        };
        const docRef = collection(
            doc(collection(db, "news"), "newsList"),
            "newsList"
        );
        await uploadImage();
        await addDoc(docRef, formedData);
        setSending(false);
        navigate("/4ebdeab6-4058-4671-942a-258434abb061/news-list");
    };
    return (
        <form onSubmit={handleSubmit(onParentSubmit)}>
            <h1 className="admin-main-header">Add News</h1>
            <label htmlFor="parentDomain" className="admin-label">
                Select an the Main subject
            </label>
            <select
                id="parentDomain"
                {...register("parentDomain", { required: true })}
                className="admin-input"
                onChange={handleDropdownChange}
            >
                <option value="">Select the main subject</option>
                <option value="public">public</option>
                <option value="private">private</option>
                <option value="partial">partial</option>
                <option value="other">other</option>
            </select>
            {errors.parentDomain && (
                <p className="admin-error">Main subject is required</p>
            )}

            {names.length > 0 && (
                <div style={{ marginLeft: "30px" }}>
                    <label htmlFor="subDomain" className="admin-label">
                        Select a Your sub Subject
                    </label>
                    <select
                        id="name"
                        {...register("subDomain", { required: true })}
                        className="admin-input"
                    >
                        <option value="">Select a sub Subject</option>
                        {names.map((name, index) => (
                            <option key={index} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                    {errors.subDomain && (
                        <p className="admin-error">subDomain is required</p>
                    )}
                </div>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="title" className="admin-label">
                Title of the news
            </label>
            <input
                id="title"
                type="text"
                {...register("title", { required: true })}
                placeholder="Title"
                className="admin-input"
            />
            {errors.title && <p className="admin-error">Title is required</p>}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="SubTitle" className="admin-label">
                Sub Title of the news
            </label>
            <input
                id="SubTitle"
                type="text"
                {...register("SubTitle", { required: true })}
                placeholder="Sub Title"
                className="admin-input"
            />
            {errors.SubTitle && (
                <p className="admin-error">Sub Title is required</p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="hashtages" className="admin-label">
                Hashtages seprated by (.)
            </label>
            <input
                id="hashtages"
                type="text"
                {...register("hashtages", { required: true })}
                placeholder="Hashtages"
                className="admin-input"
            />
            {errors.hashtages && (
                <p className="admin-error">Hashtages are required</p>
            )}

            {/* ---------------------------------------------------------------------------------- */}
            <label className="admin-label">Upload a Image for the News</label>
            <UploadImage
                setImage={setImage}
                name="news-image"
                isRequied={true}
            />
            {/* ---------------------------------------------------------------------------------- */}
            <input
                type="submit"
                value={sending ? "sending..." : "Add News"}
                disabled={sending}
                className="admin-button"
            />
        </form>
    );
};
export default AddNews;
