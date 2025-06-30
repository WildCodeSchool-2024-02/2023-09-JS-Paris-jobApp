import { createContext, type ReactNode, useState } from "react";
import type { User } from "../types/vite-env";

export interface OutletContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const UserContext = createContext<OutletContextType | undefined>(undefined);

export const UserProvider = ({children} : {children: ReactNode}) => {
	const [user, setUser] = useState<User>();

	return (
		<UserContext.Provider value={{user, setUser}}>
			{children}
		</UserContext.Provider>
	);
}