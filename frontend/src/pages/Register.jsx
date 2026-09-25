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
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!form.username.trim()) {
            setError("Please enter a username.");
            return;
        }

        if (!form.email.trim()) {
            setError("Please enter your email.");
            return;
        }

        if (!form.password) {
            setError("Please enter a password.");
            return;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (form.password !== form.confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            await api.post("users/register/", {
                username: form.username.trim(),
                email: form.email.trim(),
                password: form.password,
            });

            setSuccess("Registration successful! Redirecting to login...");

            setForm({
                username: "",
                email: "",
                password: "",
                confirm_password: "",
            });

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (err) {
            if (err.response?.status === 400) {
                const data = err.response.data;

                if (data.username) {
                    setError(
                        Array.isArray(data.username)
                            ? data.username[0]
                            : data.username
                    );
                } else if (data.email) {
                    setError(
                        Array.isArray(data.email)
                            ? data.email[0]
                            : data.email
                    );
                } else if (data.password) {
                    setError(
                        Array.isArray(data.password)
                            ? data.password[0]
                            : data.password
                    );
                } else {
                    setError("Please check your registration details.");
                }
            } else {
                setError(
                    "Unable to connect to the server. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">

                <div className="register-header">
                    <div className="logo">SP</div>

                    <h1>Create Account</h1>

                    <p>
                        Join SkillProof and showcase your skills
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">

                    <div className="input-group">
                        <label>Username</label>

                        <input
                            type="text"
                            name="username"
                            placeholder="Choose a username"
                            value={form.username}
                            onChange={handleChange}
                            autoComplete="username"
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            autoComplete="email"
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={form.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="input-group">
                        <label>Confirm Password</label>

                        <input
                            type="password"
                            name="confirm_password"
                            placeholder="Confirm your password"
                            value={form.confirm_password}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />
                    </div>

                    {error && (
                        <div className="error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="success">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>

                </form>

                <div className="login-link">
                    <span>Already have an account?</span>{" "}
                    <Link to="/">
                        Login
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Register;