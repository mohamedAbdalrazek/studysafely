import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    collection,
    doc,
    onSnapshot,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../api/firestore";


interface ScholarListMap {
    body?: string;
    buttonLink?: string;
    buttonText?: string;
    hashtages?: string;
    header?: string;
    mainInfo?: string;
    priceAfter?: number;
    priceBefore?: number;
    uniName?: string;
    logoUrl?: string;
    logoName?: string;
    id:string;
}
const EditPartialScholar = () => {
    const navigate = useNavigate();
    const encodedMainInfo = useLocation().pathname.split("/")[3].split("-").join(" ");
    const mainInfo = decodeURIComponent(encodedMainInfo)
    console.log(mainInfo)
    const [sending, setSending] = useState<boolean>(false);
    const [scholar, setScholar] = useState<ScholarListMap>();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ScholarListMap>();
    useEffect(() => {
        const partialScholarRef = collection(
            doc(collection(db, "partial"), "partialScholars"),
            "partialScholars"
        );

        const q = query(partialScholarRef, where("mainInfo", "==", mainInfo));
        onSnapshot(q, (res): void => {
            const scholarArr: ScholarListMap[] = res.docs?.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setScholar(scholarArr[scholarArr.length - 1]);
            reset(scholarArr[scholarArr.length - 1]);
        });
    }, [mainInfo, reset]);
    const onParentSubmit = async (data: ScholarListMap) => {
        setSending(true);
        const formedData = {
            ...scholar,
            ...data,
        }
        const docRef = doc(
            collection(doc(collection(db, "partial"), "partialScholars"), "partialScholars"),
            scholar?.id
        );
        await setDoc(docRef, formedData);
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
                defaultValue={scholar?.uniName}
            >
                <option disabled value={scholar?.uniName}>{scholar?.uniName}</option>
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
                defaultValue={scholar?.hashtages}
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
                defaultValue={scholar?.mainInfo}
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
                defaultValue={scholar?.priceBefore}
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
                defaultValue={scholar?.priceAfter}
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
                defaultValue={scholar?.buttonLink}
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
                defaultValue={scholar?.body}
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
                value={sending ? "sending..." : "Edit Partial Scholar"}
                disabled={sending}
                className="admin-button"
            />
        </form>
    );
};
export default EditPartialScholar;
