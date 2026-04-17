import { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import AuthContext from "../context/auth.context";
const PermissionChecker = ({
    children,
    allowedBy,
    requireLoginOnly = false

}: {
    children: any,
    allowedBy: string,
    requireLoginOnly?: boolean,
}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const Navigate = useNavigate();
    const auth: any = useContext(AuthContext);

    const checkPermission = () => {
        if (auth.loggedInUser) {
            if (requireLoginOnly || auth.loggedInUser.role === allowedBy) {
                setLoading(false);
            } else {
                toast.warn("You do not have permission to access this panel.");
                Navigate('/admin');
            }
        } else {
            setLoading(false);
            Navigate('/login');
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("access") || null;
        if (token) {
            if (auth) {
                checkPermission();
            }
        } else {
            if (requireLoginOnly) {
                toast.error("Please login to access this page.");
                Navigate('/login');
            } else {
                toast.error("You have not logged in. Please login.");
                Navigate('/login');
            }
        }
    }, [auth]);

    if (loading) {
        return <span className="loading loading-dots loading-xl"></span>;
    } else {
        return children;
    }
}

export default PermissionChecker;