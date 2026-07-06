import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/");

    };

    return (

        <nav className="navbar">

            <div className="logo">
                SkillProof
            </div>

            <ul>

                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>

                <li>
                    <Link to="/skills">Skills</Link>
                </li>

                <li>
                    <Link to="/result/1">Results</Link>
                </li>

                <li>
                    <Link to="/certificate/1">Certificates</Link>
                </li>

                <li>
                    <button onClick={logout}>
                        Logout
                    </button>
                </li>

            </ul>

        </nav>

    );

}

export default Navbar;