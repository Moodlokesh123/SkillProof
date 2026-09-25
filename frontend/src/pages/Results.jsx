import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./Results.css";

function Results() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await api.get("tests/results/");
                setResults(response.data);
            } catch (error) {
                console.error(error);
                setError("Unable to load results.");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="results-page">
                    <h2>Loading Results...</h2>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="results-page">
                <h1>My Results</h1>

                {error && <p className="error">{error}</p>}

                {!error && results.length === 0 && (
                    <div className="no-results">
                        <h2>No Results Found</h2>
                        <p>Complete an assessment to see your result here.</p>
                        <button onClick={() => navigate("/skills")}>
                            Take Assessment
                        </button>
                    </div>
                )}

                <div className="results-list">
                    {results.map((result) => (
                        <div className="result-item" key={result.attempt_id}>
                            <div>
                                <h2>{result.assessment}</h2>

                                <p>
                                    <strong>Score:</strong>{" "}
                                    {result.score}
                                </p>

                                <p>
                                    <strong>Percentage:</strong>{" "}
                                    {result.percentage}%
                                </p>

                                <p>
                                    <strong>Correct:</strong>{" "}
                                    {result.correct_answers}
                                </p>

                                <p>
                                    <strong>Wrong:</strong>{" "}
                                    {result.wrong_answers}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
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
                                        <strong>Date:</strong>{" "}
                                        {new Date(
                                            result.submitted_at
                                        ).toLocaleDateString()}
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={() =>
                                    navigate(
                                        `/result/${result.attempt_id}`
                                    )
                                }
                            >
                                View Result
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Results;