import "./videos.css"
import VideosList from"../components/global/VideosList"
const Videos = ()=>{
    return(
        <div className="videos">
            <div className="container">
                <h1 className="special-header">
                    فيديوهات تعريفية
                </h1>
                <div>
                    <h3>
                        الجامعات الخاصة
                    </h3>
                    <VideosList root="private" />
                </div>
                <div>
                    <h3>
                        الجامعات الحكومية
                    </h3>
                    <VideosList root="public" />
                </div>
                <div>
                    <h3>
                        فيديوهات اخري
                    </h3>
                    <VideosList root="other" />
                </div>
            </div>
        </div>
    )
}
export default Videos