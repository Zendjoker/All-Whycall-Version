import "./topbar.css";
import { Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import logotop from "../../pages/logo banner/logo0.png"
import {  useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome ,faUserCircle,faSignOutAlt ,faCog ,faComments ,faSearch,faStore,faBell} from '@fortawesome/free-solid-svg-icons'

export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [setUser] = useState({});
  const {profilePicture} =useContext(AuthContext);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${user.profilePicture}`);
      setUser(res.data);
    };
    fetchUser();
  }, [profilePicture]);

  return (
    <div className="navigation">
  <div className="logo">
    <Link to=""  className="no-underline">
      <img className="logotopbar" src={logotop}alt="Logo"/>
      Whycall
      </Link>
  </div>
  <div className="navigation-search-container">
    <i className="fa fa-search" />
    <input className="search-field" type="text" placeholder="Search" />
    <div className="search-container">
      <div className="search-container-box">
        <div className="search-results"></div>
      </div>
    </div>
  </div>
  
  <div className="navigation-icons">
    <a
      href=""
      target="_blank"
      className="navigation-link"
    >
      
    </a>
    <a className="navigation-link notifica">
      <i className="far fa-heart">
        <div className="notification-bubble-wrapper">
          <div className="notification-bubble">
            <span className="notifications-count">99</span>
          </div>
        </div>
      </i>
    </a>
    <Link to={`/profile/${user.username}`}>
    <img
                className="topbarprofilepic"
                src={
                      user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
    </Link>
    <a
      href="#"
      id="signout"
      className="navigation-link"
    >
      <i className="fas fa-sign-out-alt" />
    </a>
  </div>
</div>

   
  );
}
