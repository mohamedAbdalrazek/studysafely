import { useEffect, useState } from "react";
import AddField from "./AddField";

interface Field {
    buttonLink: string;
    duration: number;
    fee: number;
    languege: "en" | "ar";
    name: string;
}
interface ParamMap {
    setFieldsList: (images: Field[]) => void;
    fieldsList:Field[]
}
const AddFieldList = ({setFieldsList, fieldsList}:ParamMap) => {
    const [fields, setFields] = useState<Field[]>(fieldsList);
    useEffect(()=>{
        setFieldsList(fields)
    },[fields, setFieldsList])
    useEffect(()=>{
        setFields(fieldsList)
    },[fieldsList])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAddField = (field: Field) => {
        setFields((prevFields) => [...prevFields, field]);
    };
    const handleDeleteField = (index: number) => {
        setFields((prevFields) => prevFields.filter((_, i) => i !== index));
    };

    return (
        <div>
            <label className="admin-label">Field List</label>
            <div onClick={() => setIsModalOpen(true)} className="add-field-button">Add Field</div>
            {isModalOpen && (
                <AddField
                    onSave={handleAddField}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            <div className="fields-list">
                {fields?.map((field, index) => (
                    <div key={index} className="field-item">
                        <p>{field.name}</p>
                        <button onClick={() => handleDeleteField(index)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddFieldList;
