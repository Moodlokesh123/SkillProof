import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function AdminProtected({ children }) {

    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {

        const checkAdmin = async () => {

            const token = localStorage.getItem("access");

            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const response = await api.get("users/profile/");

                if (response.data.is_staff) {
                    setIsAdmin(true);
                }

            } catch (error) {

                console.log(error);

            }

            setLoading(false);

        };

        checkAdmin();

    }, []);

    if (loading) {
        return <h2>Checking Admin Access...</h2>;
    }

    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}

export default AdminProtected;