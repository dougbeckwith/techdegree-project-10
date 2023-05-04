import { createContext } from "react";
import { useState } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);

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
    console.log(fetchOptions);

    const response = await fetch(
      "http://localhost:5000/api/users",
      fetchOptions
    );
    if (response.status === 200) {
      const { user } = await response.json();
      console.log(user);
      console.log(`SUCCESS ${user.firstName} is now signed in!`);
      setAuthUser(user);
      return user;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  };

  const signOut = () => {
    setAuthUser(null);
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