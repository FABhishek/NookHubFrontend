const Constants = {
  baseUrl: "http://localhost:8080",
  register: "api/v1/users/register",
  inputAvailable: "api/v1/users/inputAvailable",
  login: "api/v1/users/login",
  searchUser: "api/v1/dashboard/friends/searchuser",
  addFriend: "api/v1/dashboard/friends/requestsent",
  fetchFriends: "api/v1/dashboard/friends/fetchfriends",
  removeFriend: "api/v1/dashboard/friends/requeststatus",
  passwordRegex:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:'",.<>?/`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{}|;:'",.<>?/`~]{8,20}$/,
  usernameRegex:
    /^(?!.*[_.]{2})[a-zA-Z0-9](?!.*[_.]$)[a-zA-Z0-9_.]{1,48}[a-zA-Z0-9]$/,
  emailRegex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  errorUsername:
    "Username must be 3–20 characters, no consecutive or trailing dots/underscores.",
  errorPassword:
    "Password must be 8–20 characters with at least one uppercase, one lowercase, one number, and one special character.",
  invalidEmail: "Please provide a valid mail address",
  statusOk: 200,
  unauthorized: 401,
};

export default Constants;
