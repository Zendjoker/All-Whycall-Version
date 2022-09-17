import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Feed from "../../../components/feed/Feed";
import Rightbar from "../../../components/rightbar/Rightbar";
import "../../home/home.css"
import Test from "../Test";

export default function HomeTest() {
  return (
    <>
      <Topbar/>
      <div className="homeContainer">
    <Test/>
        <Feed/>
        <Rightbar/>
      </div>
    </>
  );
}
