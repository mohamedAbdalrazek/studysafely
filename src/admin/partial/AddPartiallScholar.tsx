import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../api/firestore";

interface paramtersMap {
    [key: string]: any;
}
interface UniMap {
    body: string;
    fee: number;
    fieldsHeader: string;
    backgroundUrl: string;
    backgroundName: string;
    fieldsList: {
        buttonLink: string;
        duration: number;
        fee: number;
        language: string;
        name: string;
    }[];
    imagesList: [{ [key: string]: string }];
    location: string;
    logoName: string;
    logoUrl: string;
    name: string;
    studentsNumber: number;
    whatsLink: string;
}
interface ScholarListMap {
    body: string;
    buttonLink: string;
    buttonText: string;
    hashtages: string;
    header: string;
    mainInfo: string;
    priceAfter: number;
    priceBefore: number;
    uniName: string;
    logoUrl: string;
    logoName: string;
}
const AddPartialScholar = () => {
    const navigate = useNavigate();
    const [sending, setSending] = useState<boolean>(false);
    const [privateUniNames, setPrivateUniNames] = useState<string[]>([]);
    const [privateUniList, setPrivateUniList] = useState<UniMap[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    useEffect(() => {
        const uniListRef = collection(
            doc(collection(db, "private"), "privateUni"),
            "privateUni"
        );
        onSnapshot(uniListRef, (res: paramtersMap): void => {
            const uniArr: UniMap[] = res.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id,
            }));
            const names: string[] = [];
            uniArr.forEach((uni) => {
                names.push(uni.name);
            });
            setPrivateUniNames(names);
            setPrivateUniList(uniArr);
        });
    }, []);
    const onParentSubmit = async (data: ScholarListMap) => {
        setSending(true);
        const currentUni = privateUniList.filter((uni)=>(uni.name == data.uniName))[0]
        const formedData = {
            ...data,
            buttonText: "قدم علي المنحة",
            logoUrl:currentUni.logoUrl,
            logoName:currentUni.logoName
        };
        const docRef = collection(
            doc(collection(db, "partial"), "partialScholars"),
            "partialScholars"
        );
        await addDoc(docRef, formedData);
        setSending(false);
        navigate("/4ebdeab6-4058-4671-942a-258434abb061/partial-list");
    };
    return (
        <form onSubmit={handleSubmit(onParentSubmit)}>
            <h1 className="admin-main-header">Add Partial Scholar</h1>
            <label htmlFor="uniName" className="admin-label">
                University Name
            </label>
            <select
                id="uniName"
                {...register("uniName", { required: true })}
                className="admin-input"
            >
                <option value="">Select a University</option>
                {privateUniNames.map((name, index) => (
                    <option key={index} value={name}>
                        {name}
                    </option>
                ))}
            </select>
            {errors.uniName && (
                <p className="admin-error">
                    University Name is required and must be valid
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="hashtages" className="admin-label">
                Hashtages seprated by (.)
            </label>
            <input
                id="hashtages"
                type="text"
                {...register("hashtages", { required: true })}
                placeholder="Hashtages"
                className="admin-input"
            />
            {errors.hashtages && (
                <p className="admin-error">Hashtages are required</p>
            )}
            {/* ---------------------------------------------------------------------------------- */}
            <label htmlFor="mainInfo" className="admin-label">
                Main Information of the partial scholar
            </label>
            <textarea
                id="mainInfo"
                {...register("mainInfo", { required: true })}
                placeholder="Main Info"
                className="admin-textarea"
            />
            {errors.mainInfo && (
                <p className="admin-error">Main Info is required</p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <label htmlFor="priceBefore" className="admin-label">
                Price before the discount in dolars
            </label>
            <input
                id="priceBefore"
                type="number"
                min="0"
                {...register("priceBefore", { required: true })}
                placeholder="Price Before"
                className="admin-input"
            />
            {errors.priceBefore && (
                <p className="admin-error">Main Info is required</p>
            )}
            {/* ---------------------------------------------------------------------------------- */}
            <label htmlFor="priceAfter" className="admin-label">
                Price after the discount in dolars
            </label>
            <input
                id="priceAfter"
                type="number"
                min="0"
                {...register("priceAfter", { required: true })}
                placeholder="Price after"
                className="admin-input"
            />
            {errors.priceAfter && (
                <p className="admin-error">Price after is required</p>
            )}
            {/* ---------------------------------------------------------------------------------- */}
            <label htmlFor="buttonLink" className="admin-label">
                Apply whatsapp link
            </label>
            <input
                id="buttonLink"
                type="text"
                {...register("buttonLink", {
                    required: true,
                    pattern: {
                        value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                        message: "whatsapp link must be a valid URL",
                    },
                })}
                placeholder="Whatsapp link"
                className="admin-input"
            />
            {errors.buttonLink &&
                (errors.buttonLink.message ? (
                    <p className="admin-error">{errors.buttonLink.message}</p>
                ) : (
                    <p className="admin-error">Whatsapp link is required</p>
                ))}
            {/* ---------------------------------------------------------------------------------- */}
            <label htmlFor="body" className="admin-label">
                Partial Scholar's Infromation (Code)
            </label>
            <textarea
                id="body"
                {...register("body", { required: true })}
                placeholder="body"
                className="admin-textarea"
            />
            {errors.body && (
                <p className="admin-error">
                    Partial Scholar's Infromation is required
                </p>
            )}
            {/* ---------------------------------------------------------------------------------- */}

            <input
                type="submit"
                value={sending ? "sending..." : "Add Partial Scholar"}
                disabled={sending}
                className="admin-button"
            />
        </form>
    );
};
export default AddPartialScholar;
