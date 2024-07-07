import { Link } from "react-router-dom";
import "./edit-list-item.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface childrenMap {
    name: string;
    domain: string;
    isEdit: boolean;
    handleDelete: (name: string) => Promise<void>;
}
const EditList = ({
    name,
    domain,
    isEdit = true,
    handleDelete,
}: childrenMap) => {
    const [showPopup, setShowPopup] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const handleConfirmDelete = async () => {
        setDeleting(true);
        await handleDelete(name);
        setShowPopup(false);
        setDeleting(false);
    };

    const handleCancelDelete = () => {
        setShowPopup(false);
    };
    return (
        <div className="admin-item">
            <div className="admin-item-name">{name}</div>
            <div className="admin-item-options">
                {isEdit && (
                    <Link to={domain} className="admin-item-edit">
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                )}

                <span className="admin-item-delete">
                    <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => setShowPopup(true)}
                    />
                </span>
            </div>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <p>Are you sure you want to delete this item</p>
                        <div>
                            <button
                                onClick={handleConfirmDelete}
                                disabled={deleting}
                            >
                                {deleting ? "Deleting.." : "Delete"}
                            </button>
                            <button
                                onClick={handleCancelDelete}
                                disabled={deleting}
                            >
                                {deleting ? "Deleting.." : "Cancel"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default EditList;
