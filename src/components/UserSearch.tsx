import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Constants from "../shared/Constants";
import DefaultProfilePhoto from "../images/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.avif";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface foundUserSchema {
  friendid?: number;
  friendname?: string;
  profilephoto?: string;
  status?: string;
}

export type UserSearchProps = {
  currentUser: any;
};

export default function UserSearch({ currentUser }: UserSearchProps) {
  const baseUrl = Constants.baseUrl;
  const pathSearch = Constants.searchUser;
  const pathAdd = Constants.addFriend;
  const unfriend = Constants.removeFriend;
  const navigate = useNavigate();

  const [searchedUser, setSearchedUser] = useState("");
  const [searchError, setSearchError] = useState("");
  const [userFound, setUserFound] = useState<foundUserSchema | null>(null);
  const [friendRquest, setFriendRequest] = useState(false);

  const { register } = useForm({
    defaultValues: {
      usersearch: null,
    },
  });

  const handleInputChange = (e: any) => {
    setSearchError("");
    setUserFound(null);
    setSearchedUser(e.target.value.trim());
  };

  const searchUser = async () => {
    setUserFound(null);
    try {
      const response = await axios.get(`${baseUrl}/${pathSearch}`, {
        params: { friendname: searchedUser },
        withCredentials: true,
      });

      if (response.status == Constants.statusOk)
        setUserFound(response?.data?.result);
      else setSearchError(`No user with name: ${searchedUser} found!!`);
    } catch (error) {
      console.log(error);
      if (error) {
        if (error?.response?.status === Constants.unauthorized) {
          navigate("/login");
        }
      }
    }

    console.log("check", userFound);
  };

  const handleAddFriend = async () => {
    const data = {
      UserId: currentUser.userId,
      Username: currentUser.username,
      FriendId: userFound?.friendid,
      FriendName: userFound?.friendname,
      Status: userFound?.status,
    };
    try {
      const addFriend = await axios.post(`${baseUrl}/${pathAdd}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (addFriend.status == Constants.statusOk)
        setFriendRequest(!friendRquest);
    } catch (error) {
      if (error) {
        if (error?.response?.status === Constants.unauthorized) {
          navigate("/login");
        }
      }
    }
  };

  const removeFriend = async () => {
    const data = {
      userid: currentUser.userId,
      friendid: userFound?.friendid,
      requeststaus: "decline",
    };
    try {
      const unFriend = await axios.put(`${baseUrl}/${unfriend}`, data, {
        withCredentials: true,
      });

      if (unFriend.status === Constants.statusOk)
        setFriendRequest(!friendRquest);
    } catch (error) {
      if (error) {
        if (error?.response?.status === Constants.unauthorized) {
          navigate("/login");
        }
      }
    }
  };

  useEffect(() => {
    if (userFound?.status !== null) {
      setFriendRequest(true);
    } else {
      setFriendRequest(false);
    }
  }, [userFound]);

  return (
    <>
      <div>
        <div className="searchBar m-1 flex">
          <TextField
            {...register("usersearch")}
            variant="filled"
            onChange={handleInputChange}
            InputProps={{
              disableUnderline: true,
              style: {
                height: "35px",
                background: "white",
                borderRadius: "8px",
                margin: "8px",
              },
              inputProps: { maxLength: 20 },
            }}
          />
          <button
            className="bg-purple-500 m-2 h-8 text-white rounded-md py-2 px-4 text-sm"
            onClick={searchUser}
          >
            Search
          </button>
        </div>
        {userFound ? (
          <div
            className="w-[17vw] m-2 p-3 bg-white flex items-center rounded-lg shadow-lg"
            style={{
              backgroundColor: "#f8f9fa", // Light background
              border: "1px solid #e0e0e0", // Subtle border
              //   width: "300px", // Fixed width for tile
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                color: "#333", // Darker text color
                fontWeight: "bold",
                display: "flex",
                alignContent: "center",
              }}
            >
              <span
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%", // Makes the image round
                  overflow: "hidden", // Ensures the image stays within the rounded border
                  border: "2px solid black", // Adds a black border
                  display: "inline-block",
                  marginRight: "10px",
                }}
              >
                <img src={userFound.profilephoto || DefaultProfilePhoto}></img>
              </span>
              <span className="mt-2">{userFound?.friendname}</span>
            </div>
            {!friendRquest ? (
              <button
                style={{
                  backgroundColor: "#4CAF50", // Green for Add Friend
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px", // Space between icon and text
                }}
                onClick={handleAddFriend}
              >
                <FontAwesomeIcon icon={faUserPlus} />
              </button>
            ) : (
              <button
                style={{
                  backgroundColor: "#FF5733", // Red for Cancel Request
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px", // Space between icon and text
                }}
                onClick={removeFriend}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
        ) : (
          <div className="m-2 p-2 text-sm flex">{searchError}</div>
        )}
      </div>
    </>
  );
}
