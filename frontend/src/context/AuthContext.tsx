import React, { createContext, ReactNode, useContext, useState } from 'react'


interface AuthContextType {
    authUser: any;
    setAuthUser: React.Dispatch<React.SetStateAction<any>>;
}


const defaultAuthContext: AuthContextType = {
    authUser: null,
    setAuthUser: () => { },
};


export const AuthContext = createContext<AuthContextType>(defaultAuthContext);


export const useAuthContext = () => {
    return useContext(AuthContext)
}


interface IAuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: IAuthContextProviderProps) => {

    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")!) || null);



    return <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {children}
    </AuthContext.Provider>
}

