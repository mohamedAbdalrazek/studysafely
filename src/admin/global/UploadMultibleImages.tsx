import { useEffect, useState } from "react";
import UploadImage from "./UploadImage"; // Ensure the correct import path
import "./upload-image.css";

interface Image {
    imageName: string;
    imageUrl: string;
}

interface ParamMap {
    setImagesList: (images: File[]) => void;
    initialImages: Image[];
    setInitialImages: (initialImages: Image[]) => void;
}

export default function UploadMultipleImages({
    setImagesList,
    initialImages,
    setInitialImages,
}: ParamMap) {
    const [images, setImages] = useState<File[]>([]);

    const addImage = (file: File) => {
        setImages((prevImages) => {
            const newImages = [...prevImages, file];
            setImagesList(newImages);
            return newImages;
        });
    };

    const removeImage = (index: number) => {
        setImages((prevImages) => {
            const updatedImages = prevImages.filter((_, i) => i !== index);
            setImagesList(updatedImages);
            return updatedImages;
        });
    };

    const removeInitialImage = (index: number) => {
        setInitialImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const originalImagesElement = initialImages?.map((image, index) => (
        <div key={index} className="image-container">
            <p className="image-name">{image?.imageName}</p>
            <button
                type="button"
                onClick={() => removeInitialImage(index)}
                className="delete-image-button"
            >
                x
            </button>
        </div>
    ));

    return (
        <div>
            <UploadImage setImage={addImage} name="multiple-images" />
            <div className="images-preview">
                {initialImages && originalImagesElement}
                {images?.map((image, index) => (
                    <div key={index} className="image-container">
                        <p className="image-name">{image.name}</p>
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="delete-image-button"
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
