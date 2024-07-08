import React, { useState } from "react";
import UploadImage from "./UploadImage"; // Ensure the correct import path
import "./upload-image.css";

interface Image {
    imageName: string;
    imageUrl: string;
}

interface ParamMap {
    setImagesList: (images: File[]) => void;
    initialImages: Image[]|undefined;
    setInitialImages: React.Dispatch<React.SetStateAction<Image[]|undefined>> | undefined;
}

const UploadMultipleImages: React.FC<ParamMap> = ({
    setImagesList,
    initialImages,
    setInitialImages,
}) => {
    const [images, setImages] = useState<File[]>([]);

    const addImage = (file: File | null) => {
        if (file) {
            setImages((prevImages) => {
                const newImages = [...prevImages, file];
                setImagesList(newImages);
                return newImages;
            });
        }
    };

    const removeImage = (index: number) => {
        setImages((prevImages) => {
            const updatedImages = prevImages.filter((_, i) => i !== index);
            setImagesList(updatedImages);
            return updatedImages;
        });
    };

    const removeInitialImage = (index: number) => {
        if (setInitialImages) {
            setInitialImages((prevImages) =>
                prevImages?.filter((_, i) => i !== index)
            );
        }
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
                {originalImagesElement}
                {images.map((image, index) => (
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
};

export default UploadMultipleImages;
