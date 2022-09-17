import "./post.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify,faComments,faShareSquare} from '@fortawesome/free-solid-svg-icons'
export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [staticModal, setStaticModal] = useState(false);
  const toggleShow = () => setStaticModal(!staticModal);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="boxess">
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <div>
            <span className="postusername">{user.username}</span>
            </div>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
          <div className="dropdown" style={{ float: "left" }}>
          <FontAwesomeIcon icon={faAlignJustify} className="param" style={{width:"80px"}}/>
  <div className="dropdown-content" style={{ left: 0 }}>
    <a href="#">Edit your post</a>
    <a href="#">Update your post</a>
    <a href="#">Delete this post</a>
  </div>
</div>
          </div>
        </div>
        <div className="postcenter">
          <div >
          <span className="posttext">{post?.desc}</span>
          </div>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          
          <div className="postBottomLeft"> 
          <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,700"
        />
        <div onClick={likeHandler} className="icon">
          <svg
            className="heart-main"
            viewBox="0 0 512 512"
            width={100}
            title="heart"
          >
            <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
          </svg>
          <svg
            className="heart-background"
            viewBox="0 0 512 512"
            width={100}
            title="heart"
          >
            <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
          </svg>
        </div>
            <span className="postLikeCounter" >{like} </span>
          </div>
          <div className="postBottomLeft"> 
              <FontAwesomeIcon icon={faComments} onClick={toggleShow} className="likeIcon comment" style={{width:"27px"}}    />
              {/*Pop Up Post*/}
             
            <span className="postCommentCounter" >0 </span>
          </div> 
          <div className="postBottomLeft"> 
              <FontAwesomeIcon icon={faShareSquare} className="likeIcon sharer" style={{width:"27px"}}   />
            <span className="postshareCounter"  >0 </span>
          </div>      
        </div>
      </div>
    </div>
    </div>
  );
}
