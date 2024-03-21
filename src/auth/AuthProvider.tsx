import { FC, PropsWithChildren, createContext, useContext, useState } from "react"

interface AuthContextProps{
    token:string

}
const AuthContext = createContext<AuthContextProps>(undefined!);

export const AuthProvider:FC<PropsWithChildren> = ({children}) =>{
    const [token1, setToken] = useState<string>();
    const updateData = (token:string) => {
        setToken(token);
      };
return(
    <AuthContext.Provider value={{token: ''}}>
        {children}

    </AuthContext.Provider>
)
}
export const useMyContext = () => {
    return useContext(AuthContext);
  };