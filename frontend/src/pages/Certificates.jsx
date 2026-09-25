import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./Certificates.css";

function Certificates() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await api.get("certificates/");
                setCertificates(response.data);
            } catch (error) {
                console.error(error);
                setError("Unable to load certificates.");
            } finally {
                setLoading(false);
            }
        };

        fetchCertificates();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="certificates-page">
                    <h2>Loading Certificates...</h2>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="certificates-page">
                <h1>My Certificates</h1>

                {error && <p className="error">{error}</p>}

                {!error && certificates.length === 0 && (
                    <div className="no-certificates">
                        <h2>No Certificates Found</h2>
                        <p>
                            Pass an assessment to earn a certificate.
                        </p>

                        <button onClick={() => navigate("/skills")}>
                            Take Assessment
                        </button>
                    </div>
                )}

                <div className="certificates-list">
                    {certificates.map((certificate) => (
                        <div
                            className="certificate-item"
                            key={certificate.certificate_id}
                        >
                            <h2>🏆 {certificate.assessment}</h2>

                            <p>
                                <strong>Score:</strong>{" "}
                                {certificate.score}
                            </p>

                            <p>
                                <strong>Percentage:</strong>{" "}
                                {certificate.percentage}%
                            </p>

                            <p>
                                <strong>Issued:</strong>{" "}
                                {new Date(
                                    certificate.issued_at
                                ).toLocaleDateString()}
                            </p>

                            <button
                                onClick={() =>
                                    navigate(
                                        `/certificate/${certificate.attempt_id}`
                                    )
                                }
                            >
                                View Certificate
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Certificates;