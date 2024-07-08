import React, { useRef } from "react";
import "./upload-image.css";

interface UploadVideoProps {
    setVideo: React.Dispatch<React.SetStateAction<File | undefined>>;
    name: string;
}

const UploadVideo: React.FC<UploadVideoProps> = ({ setVideo, name }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setVideo(file);
        }
    };

    const handleDelete = () => {
        setVideo(undefined); // Reset to undefined when deleting
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <label
            htmlFor={name ? name : "video"}
            className="drop-container"
            id="dropcontainer"
        >
            <span className="drop-title">Upload Video</span>
            <input
                ref={inputRef}
                required={true}
                type="file"
                id={name ? name : "video"}
                accept="video/*"
                className="upload"
                onChange={(e) => handleChange(e)}
            />
            <button type="button" onClick={handleDelete} className="delete-button">
                x
            </button>
        </label>
    );
};

export default UploadVideo;
