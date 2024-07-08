import { useRef } from "react";
import "./upload-image.css";

interface ParamMap {
    setImage: (file:File|null) => void;
    name: string;
    isRequired?: boolean; 
}

export default function UploadImage({
    setImage,
    name,
    isRequired = false, 
}: ParamMap) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        } else {
            setImage(null);
        }
    };

    const handleDelete = () => {
        setImage(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <label
            htmlFor={name ? name : "image"}
            className="drop-container"
            id="dropcontainer"
        >
            <span className="drop-title">Upload Image</span>
            <input
                ref={inputRef}
                required={isRequired}
                type="file"
                id={name ? name : "image"}
                accept="image/*"
                className="upload"
                onChange={(e) => handleChange(e)}
            />
            <button
                type="button"
                onClick={handleDelete}
                className="delete-button"
            >
                x
            </button>
        </label>
    );
}
