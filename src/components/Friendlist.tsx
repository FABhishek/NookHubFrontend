import { useEffect } from "react";

export type FriendListProps = {
  friendList: any;
};

export default function Friendlist({ friendList }: FriendListProps) {
  return (
    <>
      <div>
        {friendList.map((friend: any) => (
          //   <div
          //     key={friend.friendid}
          //     className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          //   >
          //     <img
          //       src={friend.profilephoto}
          //       alt={`${friend.name}'s avatar`}
          //       className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
          //     />
          //     <h3 className="text-center text-xl font-semibold">
          //       {friend.friendname}
          //     </h3>
          //   </div>
          <div
            className="w-[15vw]h-15 m-1 p-3 bg-white items-center rounded-lg shadow-lg"
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
                // display: "flex",
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
                <img src={friend.profilephoto}></img>
              </span>
              <span className="mt-2">{friend?.friendname}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
