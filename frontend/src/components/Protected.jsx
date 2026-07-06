import { Navigate } from "react-router-dom";

function Protected({ children }) {

    const token = localStorage.getItem("access");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default Protected;