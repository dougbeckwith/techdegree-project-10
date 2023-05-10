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
    try {
      const response = await fetch(
        "http://localhost:5000/api/users",
        fetchOptions
      );
      if (response.status === 200) {
        const { user } = await response.json();
        console.log(`SUCCESS ${user.emailAddress} is now signed in!`);
        console.log(user);
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
