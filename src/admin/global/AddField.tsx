import React, { useState } from "react";

interface FieldFormProps {
    onSave: (field: Field) => void;
    onClose: () => void;
}

interface Field {
    buttonLink: string;
    duration: number;
    fee: number;
    language: "en" | "ar";
    name: string;
}

const AddField: React.FC<FieldFormProps> = ({ onSave, onClose }) => {
    const [fieldData, setFieldData] = useState<Field>({
        buttonLink: "",
        duration: 0,
        fee: 0,
        language: "en",
        name: "",
    });

    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFieldData({
            ...fieldData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Basic validation
        if (
            !fieldData.buttonLink ||
            !fieldData.name ||
            !fieldData.fee ||
            !fieldData.duration ||
            !fieldData.language
        ) {
            setErrors(["All fields are required"]);
            return;
        }

        onSave(fieldData);
        onClose();
    };
    return (
        <div className="admin-pop">
            <div>
                <label htmlFor="buttonLink" className="admin-label">
                    Whatsapp Link to apply for this field
                </label>
                <input
                    id="buttonLink"
                    type="text"
                    name="buttonLink"
                    value={fieldData.buttonLink}
                    onChange={handleChange}
                    placeholder="Whatsapp Link"
                    className="admin-input"
                />
                {errors.includes("buttonLink") && (
                    <p className="admin-error">
                        Whatsapp link must be a valid URL
                    </p>
                )}

                {/* Other input fields similarly */}
                <label htmlFor="name" className="admin-label">
                    Field's name
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={fieldData.name}
                    onChange={handleChange}
                    placeholder="Field's name"
                    className="admin-input"
                />
                {/* Error message for name */}
                {errors.includes("name") && (
                    <p className="admin-error">Field's name is required</p>
                )}

                {/* Fee input */}
                <label htmlFor="fee" className="admin-label">
                    Field's fee
                </label>
                <input
                    id="fee"
                    type="number"
                    name="fee"
                    value={fieldData.fee.toString()}
                    onChange={handleChange}
                    placeholder="Field's fee"
                    className="admin-input"
                />
                {/* Error message for fee */}
                {errors.includes("fee") && (
                    <p className="admin-error">Field's fee is required</p>
                )}

                {/* Duration input */}
                <label htmlFor="duration" className="admin-label">
                    Duration of Study in Years
                </label>
                <input
                    id="duration"
                    type="number"
                    name="duration"
                    value={fieldData.duration.toString()}
                    onChange={handleChange}
                    placeholder="Field's duration"
                    className="admin-input"
                />
                {/* Error message for duration */}
                {errors.includes("duration") && (
                    <p className="admin-error">Duration of study is required</p>
                )}

                {/* Language select */}
                <label htmlFor="language" className="admin-label">
                    Language of Study
                </label>
                <select
                    id="language"
                    name="language"
                    value={fieldData.language}
                    onChange={handleChange}
                    className="admin-input admin-select"
                >
                    <option value="en">English</option>
                    <option value="tr">Turkish</option>
                </select>
                {/* Error message for language */}
                {errors.includes("language") && (
                    <p className="admin-error">Language of study is required</p>
                )}

                {/* Cancel button */}
                <div onClick={onClose} className="admin-pop-cancel">Cancel</div>
                {/* Submit button */}
                <div onClick={handleSubmit} className="admin-pop-save">Save</div>
            </div>
        </div>
    );
};

export default AddField;
