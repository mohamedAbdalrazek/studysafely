import { Link } from "react-router-dom"
import "./error.css"
import image from "../../assets/images/error.png"
export default function Error(){
    return(
        <div className="error">
            <div className="error-image">
                <img src={image} />
            </div>
            <div className="error-button">
                <Link to="/">
                    Go Back to Home Page
                </Link>
            </div>
        </div>
    )
}