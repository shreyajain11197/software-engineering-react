import Like from "./like";

const Likes = ({likes = []}) => {
    return (
        <div>
            {
                likes.map(like =>
                    <Like
                        key={like._id}
                        tuit={like.tuit}
                        likedBy={like.likedBy}
                    />
                )
            }
        </div>
    )
}
export default Likes;