import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (form.password !== form.confirm_password) {
            setError("Passwords do not match");
            return;
        }

        try {

            await api.post("users/register/", {
                username: form.username,
                email: form.email,
                password: form.password,
            });

            setSuccess("Registration Successful");

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (err) {

            setError("Registration Failed");

        }

    };

    return (

        <div className="register-container">

            <div className="register-card">

                <h1>Create Account</h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Register
                    </button>

                </form>

                {error && <p className="error">{error}</p>}

                {success && <p style={{color:"green"}}>{success}</p>}

                <p>
                    Already have an account?
                    <Link to="/"> Login</Link>
                </p>

            </div>

        </div>

    );

}

export default Register;