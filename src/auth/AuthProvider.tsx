import { FC, PropsWithChildren, createContext, useContext, useState } from "react"

interface AuthContextProps{
    token:string|undefined

    updateToken:(token:string)=>void
}
export const AuthContext = createContext<AuthContextProps>(undefined!);

export const AuthProvider:FC<PropsWithChildren> = ({children}) =>{
    const [token, setToken] = useState<string | undefined>();
    const updateToken = (token:string) => {
        setToken(token);
      };
return(
    <AuthContext.Provider value={{token,updateToken}}>
        {children}

    </AuthContext.Provider>
)
}
export const useMyContext = () => {
    return useContext(AuthContext);
  };