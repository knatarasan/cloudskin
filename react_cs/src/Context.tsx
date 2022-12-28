import { createContext, useState } from "react";


export type UserContent = {
  currentUser: boolean,
  setCurrentUser: (c: boolean) => void
}

export const UserContext = createContext<UserContent>({
  currentUser: false,
  setCurrentUser: () => null,
});

UserContext.displayName = 'UserContext'

export const UserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState(false);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
