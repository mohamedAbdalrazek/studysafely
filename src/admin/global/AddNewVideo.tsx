import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, mediaUrl } from "../../api/firestore";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import UploadVideo from "./UploadVideo";

interface VideoMap {
    [key: string]: string;
}

const AddNewVideo = () => {
    const navigate = useNavigate();
    const [video, setVideo] = useState<File|undefined>();
    const [names, setNames] = useState<string[]>();
    const [sending, setSending] = useState<boolean>(false);
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
    useEffect(() => {
        const otherServicesRef = collection(db, "other");
        onSnapshot(otherServicesRef, (res): void => {
            const videosData:VideoMap[] = res.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            const tempNames: string[] = [];
            videosData.forEach((item) => {
                tempNames.push(item.name);
            });
            setNames(tempNames);
        });
    }, []);
    const onParentSubmit = async (data: VideoMap) => {
        setSending(true);
        const date = new Date();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const currentDate = (`${month}/${year}`);
        data = {
            ...data,
            date:currentDate
        }
        const uploadVideo = async () => {
            if (video) {
                const videoName = video?.name.split(".")[0];
                const videoRef = ref(
                    mediaUrl,
                    `news/${videoName}${uuidv4()}`
                );
                const uploadResult = await uploadBytes(
                    videoRef,
                    video
                );
                const videoUrl = await getDownloadURL(uploadResult.ref);
                data = {
                    ...data,
                    videoUrl: videoUrl,
                };
            }
        };
        const docRef = collection(
            doc(collection(db, "videos"), "allVideos"),
            "allVideos"
        );
        await uploadVideo();
        await addDoc(docRef, data);
        setSending(false);
        navigate("/4ebdeab6-4058-4671-942a-258434abb061/videos");
    };
    const servicesElement = names?.map((name) => (
        <option value={name}>{name}</option>
    ));
    return (
        <form onSubmit={handleSubmit(onParentSubmit)}>
            <h1 className="admin-main-header">Add Video</h1>
            <label htmlFor="domain" className="admin-label">
                Select the Subject
            </label>
            <select
                id="domain"
                {...register("domain", { required: true })}
                className="admin-input"
            >
                <option value="">Select the main subject</option>
                <option value="public">public</option>
                <option value="private">private</option>
                <option value="partial">partial</option>
                <option value="agent">agent</option>
                <option value="apply">apply</option>
                {servicesElement}
            </select>
            {errors.domain && (
                <p className="admin-error"> Subject is required</p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="videoName" className="admin-label">
                Title of the video
            </label>
            <input
                id="videoName"
                type="text"
                {...register("videoName", { required: true })}
                placeholder="Title"
                className="admin-input"
            />
            {errors.videoName && (
                <p className="admin-error"> Title of the video</p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="description" className="admin-label">
                Video's Description
            </label>
            <textarea
                id="description"
                {...register("description", { required: true })}
                placeholder="Description"
                className="admin-textarea"
            />
            {errors.description && (
                <p className="admin-error">Video's Description</p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="buttonText" className="admin-label">
                Video's button text
            </label>
            <input
                id="buttonText"
                type="text"
                {...register("buttonText", { required: true })}
                placeholder="Text"
                className="admin-input"
            />
            {errors.buttonText && (
                <p className="admin-error"> Button Text of the video</p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label className="admin-label">Upload the Video</label>
            <UploadVideo setVideo={setVideo} name="news-video" /> 
            {/* ---------------------------------------------------------------------------------- */}
            <input
                type="submit"
                value={sending ? "sending..." : "Add Video"}
                disabled={sending}
                className="admin-button"
            />
        </form>
    );
};
export default AddNewVideo;
