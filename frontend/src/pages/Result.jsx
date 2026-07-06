import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import "./Result.css";

function Result() {

    const { state } = useLocation();

    const navigate = useNavigate();

    if (!state) {

        return (

            <>
                <Navbar />

                <div className="result-container">

                    <div className="result-card">

                        <h2>No Result Found</h2>

                        <button
                            className="dashboard-btn"
                            onClick={() => navigate("/dashboard")}
                        >
                            Back to Dashboard
                        </button>

                    </div>

                </div>

            </>

        );

    }

    return (

        <>
            <Navbar />

            <div className="result-container">

                <div className="result-card">

                    <h1>🎉 Assessment Completed</h1>

                    <hr />

                    <div className="result-details">

                        <p>
                            <strong>Score:</strong> {state.score}
                        </p>

                        <p>
                            <strong>Percentage:</strong> {state.percentage}%
                        </p>

                        <p>
                            <strong>Correct Answers:</strong> {state.correct_answers}
                        </p>

                        <p>
                            <strong>Wrong Answers:</strong> {state.wrong_answers}
                        </p>

                        <p>

                            <strong>Status:</strong>{" "}

                            <span
                                className={
                                    state.status === "PASS"
                                        ? "pass"
                                        : "fail"
                                }
                            >
                                {state.status}
                            </span>

                        </p>

                    </div>

                    <div className="result-buttons">

                        <button
                            className="dashboard-btn"
                            onClick={() => navigate("/dashboard")}
                        >
                            Dashboard
                        </button>

                        {state.status === "PASS" && (

                            <button
                                className="certificate-btn"
                                onClick={() =>
                                    navigate(`/certificate/${state.attempt_id}`)
                                }
                            >
                                View Certificate
                            </button>

                        )}

                    </div>

                </div>

            </div>

        </>

    );

}

export default Result;