import { Link, useNavigate } from "react-router-dom";

import "./AdminSidebar.css";

function AdminSidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();

        navigate("/admin/login");

    };

    return (

        <div className="sidebar">

            <h2>SkillProof</h2>

            <Link to="/admin/dashboard">🏠 Dashboard</Link>

            <Link to="/admin/skills">📚 Skills</Link>

            <Link to="/admin/assessments">📝 Assessments</Link>

            <Link to="/admin/questions">❓ Questions</Link>

            <Link to="/admin/users">👥 Users</Link>

            <Link to="/admin/certificates">🏆 Certificates</Link>

            <button onClick={logout}>
                🚪 Logout
            </button>

        </div>

    );

}

export default AdminSidebar;