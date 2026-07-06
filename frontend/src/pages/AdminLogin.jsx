import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function AdminLogin() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // Login
            const response = await api.post("token/", form);

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            // Get profile
            const profile = await api.get("users/profile/");

            if (profile.data.is_staff) {

                navigate("/admin/dashboard");

            } else {

                setError("You are not an administrator.");

                localStorage.clear();

            }

        } catch (err) {

            setError("Invalid Admin Credentials");

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h1>SkillProof Admin</h1>

                <p>Administrator Login</p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                {error && (
                    <p className="error">{error}</p>
                )}

            </div>

        </div>

    );

}

export default AdminLogin;