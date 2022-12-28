import { createContext, useState } from "react";


export type UserContent = {
  currentUser: object,
  setCurrentUser: (c: object) => void
}

export const UserContext = createContext<UserContent>({
  currentUser: {},
  setCurrentUser: () => null,
});

UserContext.displayName = 'UserContext'

export const UserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState({});
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
