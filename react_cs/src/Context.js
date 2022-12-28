import { createContext, useState } from "react";

export const UserContext = createContext({
  currentUser: false,
  setCurrentUser: () => null,
});
UserContext.displayName = 'UserContext'

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
