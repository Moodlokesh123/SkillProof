import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

import "./Result.css";

function Result() {

    const { id } = useParams();

    const { state } = useLocation();

    const navigate = useNavigate();

    const [result, setResult] = useState(state || null);
    const [loading, setLoading] = useState(!state);
    const [error, setError] = useState("");


    useEffect(() => {

        // If result was already passed through navigation,
        // don't need to call API again.
        if (state) {

            setResult(state);
            setLoading(false);

            return;

        }


        // If page was opened after login,
        // fetch result from database.
        if (!id) {

            setError("Result not found.");
            setLoading(false);

            return;

        }


        api.get(`tests/result/${id}/`)
            .then((response) => {

                setResult(response.data);

            })
            .catch((error) => {

                console.error(
                    "Result error:",
                    error
                );

                setError(
                    "Result not found."
                );

            })
            .finally(() => {

                setLoading(false);

            });

    }, [id, state]);


    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (
            <>
                <Navbar />

                <div className="result-container">

                    <div className="result-card">

                        <h2>
                            Loading Result...
                        </h2>

                    </div>

                </div>
            </>
        );

    }


    // ==========================================
    // Error
    // ==========================================

    if (error || !result) {

        return (
            <>
                <Navbar />

                <div className="result-container">

                    <div className="result-card">

                        <h2>
                            {error || "No Result Found"}
                        </h2>

                        <button
                            className="dashboard-btn"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >
                            Back to Dashboard
                        </button>

                    </div>

                </div>
            </>
        );

    }


    // ==========================================
    // Result
    // ==========================================

    return (
        <>
            <Navbar />

            <div className="result-container">

                <div className="result-card">

                    <h1>
                        🎉 Assessment Completed
                    </h1>

                    <hr />


                    <div className="result-details">

                        <p>
                            <strong>
                                Assessment:
                            </strong>{" "}
                            {result.assessment}
                        </p>


                        <p>
                            <strong>
                                Score:
                            </strong>{" "}
                            {result.score}
                        </p>


                        <p>
                            <strong>
                                Percentage:
                            </strong>{" "}
                            {result.percentage}%
                        </p>


                        <p>
                            <strong>
                                Correct Answers:
                            </strong>{" "}
                            {result.correct_answers}
                        </p>


                        <p>
                            <strong>
                                Wrong Answers:
                            </strong>{" "}
                            {result.wrong_answers}
                        </p>


                        <p>

                            <strong>
                                Status:
                            </strong>{" "}

                            <span
                                className={
                                    result.status === "PASS"
                                        ? "pass"
                                        : "fail"
                                }
                            >
                                {result.status}
                            </span>

                        </p>


                        {result.submitted_at && (

                            <p>

                                <strong>
                                    Submitted:
                                </strong>{" "}

                                {new Date(
                                    result.submitted_at
                                ).toLocaleString()}

                            </p>

                        )}

                    </div>


                    <div className="result-buttons">

                        <button
                            className="dashboard-btn"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >
                            Dashboard
                        </button>


                        {result.status === "PASS" && (

                            <button
                                className="certificate-btn"
                                onClick={() =>
                                    navigate(
                                        `/certificate/${result.attempt_id}`
                                    )
                                }
                            >
                                🏆 View Certificate
                            </button>

                        )}

                    </div>

                </div>

            </div>
        </>
    );
}

export default Result;