import { createContext, useState } from "react";
import { boolean } from "zod";



export const AuthContext = createContext(null);

const AuthProvider = ({ children }: any) => {
    const [loading, setLoading] = useState(true);



    const authInfo = {
        user,
        createUser,
        logIn,
        logOut,
        updateUserProfile,
        loading,
        googleSighIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;