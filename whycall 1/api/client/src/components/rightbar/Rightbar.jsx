import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import "../../Font/FontAwesome/fontAwesome"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
} from 'mdb-react-ui-kit'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const HomeRightbar = () => {
    return (
      <>
       <MDBCarousel showIndicators showControls fade>
      <MDBCarouselInner className="Publicitewhycall">
        <MDBCarouselItem className='active'>
          <MDBCarouselElement src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQbbmGuYtMbm2eSZcDxSkVy9Ze_0oP0OHy9Ghx6fwxKZ7ygFuvrWscg_RW-irwYWJCzJA&usqp=CAU' alt='...' />
          <MDBCarouselCaption>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem className="Publicitewhycall">
          <MDBCarouselElement src='https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-6/245184554_4388612771229861_9206615348541656321_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_ohc=X89CUQPGFtsAX8VgrLi&_nc_ht=scontent.ftun16-1.fna&oh=00_AT-03YJbKwgu2eU1sJ0TUTuvAKU18eADtU29OXX5PzHyTA&oe=62103293' alt='...' />
          <MDBCarouselCaption>
            <h1></h1>
            <p>@Adam.Azouz Full Stack Developer</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem className="Publicitewhycall">
          <MDBCarouselElement src='https://www.entreprises-magazine.com/wp-content/uploads/2020/05/Gomycode-et-Tunisia-Jobs-696x385.jpg' alt='...' />
          <MDBCarouselCaption>
            
            <p>Learn development by making.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    <br/>
        <h4 className="rightbarTitle">Suggestions pour vous</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
        <div className="Publicite">
    </div>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      <div className="rightbarprofilee">
      <ul className="rightbarclickpar">
      
      <li><FontAwesomeIcon icon="calendar" className="rightbarclickicon" />
        Calendar
        </li>
      <li><FontAwesomeIcon icon="video" className="rightbarclickicon" />
      Watch
        </li>
      <li><FontAwesomeIcon icon="pager" className="rightbarclickicon" /> 
        Pages
      </li>
      <li><FontAwesomeIcon icon="users" className="rightbarclickicon" /> 
        Groups
      </li>
      
      </ul>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        
        <h4 className="rightbarTitle">
          <FontAwesomeIcon icon="info" className="rightbarclickicon" />
        User information
        </h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              <FontAwesomeIcon icon="city" className="rightbarclickicon" />
              City :
              </span>
            <span className="rightbarInfoValue">
              {user.city}
              </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              <FontAwesomeIcon icon="globe" className="rightbarclickicon" />
              From :
              </span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
            <FontAwesomeIcon icon="ring" className="rightbarclickicon" />
              Relationship :
              </span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">
        <FontAwesomeIcon icon="users" className="rightbarclickicon" />
          User friends
          </h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
    
  );
}
