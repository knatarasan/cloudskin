import { createContext, useState } from "react";


type User = {
  username: string, // eg'admin',
  email: string,
  tokenAccess: string,
  tokenRefresh: string
}

export type UserContent = {
  currentUser: object,
  setCurrentUser: (c?: User) => void
}

export const UserContext = createContext<UserContent>({
  currentUser: {},
  setCurrentUser: () => null, 
});

UserContext.displayName = 'UserContext'


export const UserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>({});
  const value: UserContent = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
