import axios, { isAxiosError } from "axios";
import Constants from "../shared/Constants";
import UserSearch from "../components/UserSearch";
import Friendlist from "../components/Friendlist";
import Rooms from "../components/Rooms";
import Usercontrol from "../components/Usercontrol";
import Utilityboard from "../components/utilityboard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  interface User {
    userId?: string; // Adjust fields based on your data structure
    username?: string;
    message?: string;
    // Add other fields as necessary
  }

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [friendList, setFriendList] = useState([]);

  const baseUrl = Constants.baseUrl;
  const navigate = useNavigate();

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

  useEffect(() => {
    const data = localStorage.getItem("userData");

    if (data) {
      try {
        setCurrentUser(JSON.parse(data));
      } catch (error) {
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }

    // calling fetch friends api

    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/${Constants.fetchFriends}`,
          {
            withCredentials: true,
          }
        );
        setFriendList(response.data.FriendList);
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status === Constants.unauthorized) {
            navigate("/login");
          }
        }
      }
    };

    fetchFriends();
  }, []);

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
          <UserSearch currentUser={currentUser} />
        </div>
        <div className="h-[75vh] bg-slate-400 m-2 flex rounded-lg">
          <Friendlist friendList={friendList} />
        </div>
      </div>
    </div>
  );
}
