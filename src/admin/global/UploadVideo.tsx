import { useRef } from "react";
import "./upload-image.css"
interface ParamMap {
    setVideo: React.Dispatch<React.SetStateAction<string>>;
    name:string;
}
export default function UploadVideo({
    setVideo,
    name,
}:ParamMap) {
    const inputRef = useRef<HTMLInputElement>(null);
    function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        setVideo(e.target.files[0]);
    }
    function handleDelete() {
        setVideo(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }   
    return (
        <label
            htmlFor={name ? name : "image"}
            className="drop-container"
            id="dropcontainer"
        >
            <span className="drop-title">Upload Video</span>
            <input
                ref={inputRef}
                required={true}
                type="file"
                id={name ? name : "image"}
                accept="video/*"
                className="upload"
                onChange={(e) => handleChange(e)}
            />
            <button type="button" onClick={handleDelete} className="delete-button">
                x
            </button>
        </label>
    );
}
