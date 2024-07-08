import { useLocation } from "react-router-dom"
import List from "../../partial/List";

const PrivatePartial = ()=>{
    const location = useLocation().pathname.split("/")[2].split("-").join(" ")
    
    return(
        <div>
            <List isPrivate={true} location={location} />
        </div>
    )
}
export default PrivatePartial
