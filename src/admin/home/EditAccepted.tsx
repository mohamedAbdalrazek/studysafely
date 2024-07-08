import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../api/firestore";
import { Link, useNavigate } from "react-router-dom";
import EditListItem from "../global/EditListItem";

interface FormMap {
    [key: string]: string;
}

interface Image {
    imageName: string;
    imageUrl: string;
}

interface DataMap {
    acceptedList?: Image[]; // Make acceptedList optional
    header: string;
}

const EditAccepted = () => {
    const [data, setData] = useState<DataMap>({ header: "", acceptedList: [] }); // Initialize with an empty array

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormMap>();

    useEffect(() => {
        const docRef = doc(collection(db, "home"), "accepted");

        const getData = async () => {
            try {
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const tempData = docSnap.data();
                    reset(docSnap.data());
                    setData(tempData as DataMap);
                } else {
                    console.error("No such document!");
                }
            } catch (error) {
                console.log(error);
            }
        };

        getData();
    }, [reset]);

    const onSubmit = (tempData: FormMap) => {
        const formedData = {
            ...data,
            header: tempData.header,
        };

        const docRef = doc(collection(db, "home"), "accepted");
        setDoc(docRef, formedData).then(() => {
            navigate("/");
        });
    };

    const handleDelete = async (name: string) => {
        const filteredList = data?.acceptedList?.filter(
            (image) => image.imageName !== name
        );

        const formedData: DataMap = {
            ...data,
            acceptedList: filteredList,
        };

        setData(formedData); 

        const docRef = doc(collection(db, "home"), "accepted");
        await setDoc(docRef, formedData);
    };

    const listElement = data?.acceptedList?.map((item) => (
        <EditListItem
            key={item.imageName} 
            name={item.imageName}
            isEdit={false}
            domain=""
            handleDelete={handleDelete}
        />
    ));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="admin-main-header">Edit Accepted Home</h1>
            <label htmlFor="header" className="admin-label">
                Accepted Home Header
            </label>
            <input
                id="header"
                defaultValue={data?.header}
                type="text"
                {...register("header", { required: true })}
                placeholder="Header"
                className="admin-input"
            />
            {errors.header && (
                <p className="admin-error">
                    Accepted Home Header is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}
            <h3
                style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    textAlign: "center",
                }}
            >
                Image of the accepted students
            </h3>
            {listElement}
            <Link
                to={"add"}
                className="admin-button"
                style={{
                    display: "block",
                    margin: "auto",
                    width: "fit-content",
                    textDecoration: "none",
                }}
            >
                Add Image
            </Link>
            <button type="submit" className="admin-button">
                Submit
            </button>
        </form>
    );
};

export default EditAccepted;
