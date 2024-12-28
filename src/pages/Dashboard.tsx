import axios from "axios";
import Constants from "../shared/Constants";
import UserSearch from "../components/UserSearch";
import Friendlist from "../components/Friendlist";
import Rooms from "../components/Rooms";
import Usercontrol from "../components/Usercontrol";
import Utilityboard from "../components/utilityboard";

const baseUrl = Constants.baseUrl;

export default function Dashboard() {

  //   async function handleClick(){
  //     try {
  //       const response = await axios.get(`${baseUrl}/api/v1/dashboard/friends/fetchfriends`, {
  //          withCredentials: true
  //       });
  //       console.log(response.data.FriendList);
  //   }
  //   catch (error) {
  //     console.error("Error submitting the form:", error);
  //   }
  // }
  return (
    <div className="h-screen bg-black flex">
      <div className="w-[12vw] bg-white m-4 rounded-lg flex flex-col">
        <Rooms />
        <Usercontrol />
      </div>
      <div className="w-[68vw] bg-zinc-500 m-4 rounded-lg flex">
        <Utilityboard />
      </div>
      <div className="w-[20vw] bg-red-600 m-4 rounded-lg flex flex-col">
        <div className="h-[20vh] bg-black m-2 flex justify-between">
          <UserSearch />
        </div>
        <div className="h-[75vh] bg-slate-400 m-2 flex rounded-lg">
          <Friendlist />
        </div>
      </div>
    </div>
  );
}
