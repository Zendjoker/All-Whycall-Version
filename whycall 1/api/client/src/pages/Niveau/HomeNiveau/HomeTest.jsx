import Feed from "../../../components/feed/Feed";
import Rightbar from "../../../components/rightbar/Rightbar";
import Story from "../../../components/Story/Story";
import Topbar from "../../../components/topbar/Topbar";
import "../../home/home.css"
import Test from "../Test";
import Sidebar from "../../../components/sidebar/Sidebar"
export default function HomeTest() {
  return (
    <>
      
      <div className="homeContainer">
      <Topbar/>
      <div className="acceuilalign">
      <Sidebar />
        <Feed />
        
        <Rightbar/>
        </div>
      </div>
    </>
  );
}
