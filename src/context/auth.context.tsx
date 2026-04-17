import { createContext, useEffect, useState } from "react";
import authSvc from "../services/auth.service";

const AuthContext = createContext({})
export type AuthData = {
    loggedInUser: any,
    setLoggedInUser: any
}
export const AuthProvider = ({ children }: { children: any }) => {
    const [loading, setLoading] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<any>();
    const loginCheck = async () => {
        try {
            const authUser = await authSvc.getLoggedInUser()
            setLoggedInUser(authUser.data.result);
        } catch (exception) {
            console.log(exception);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loginCheck()
    }, [])
    return (
        <>
            {loading ? <><span className="loading loading-dots loading-xl"></span></>
                : <>
                    <AuthContext.Provider value={{
                        loggedInUser: loggedInUser,
                        setLoggedInUser: setLoggedInUser
                    } as AuthData}>
                        {children}
                    </AuthContext.Provider>

                </>}

        </>
    )
}
export default AuthContext