import { createContext } from "react";
import { useState } from "react";
import Cookies from "js-cookie";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const cookie = Cookies.get("authenticatedUser");
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

  /* sign in method
     returns user if sign in success
     and sets user cookies
     else returns error object 
  */

  const signIn = async (credentials) => {
    const encodedCredentials = btoa(
      `${credentials.emailAddress}:${credentials.password}`
    );

    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`
      }
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/users",
        fetchOptions
      );
      if (response.status === 200) {
        const { user } = await response.json();
        Cookies.set("authenticatedUser", JSON.stringify(user), {
          expires: 1
        });
        setAuthUser(user);
        return { user };
      } else if (response.status === 401) {
        const { errors } = await response.json();
        console.log(errors);
        return { errors };
      } else if (response.status === 400) {
        const { errors } = await response.json();
        console.log(errors);
        return { errors };
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // sign out method sets user to null and removes user cookies
  const signOut = () => {
    setAuthUser(null);
    Cookies.remove("authenticatedUser");
  };

  return (
    <UserContext.Provider
      value={{
        authUser,
        actions: {
          signIn: signIn,
          signOut: signOut
        }
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
