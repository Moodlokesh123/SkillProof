import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";

function VerifyCertificate() {

    const { certificateId } = useParams();

    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        api.get(`certificates/verify/${certificateId}/`)
            .then((response) => {

                setData(response.data);

            })
            .catch((error) => {

                console.error(error);

                setData({
                    valid: false
                });

            })
            .finally(() => {

                setLoading(false);

            });

    }, [certificateId]);

    if (loading) {

        return (
            <>
                <Navbar />
                <h2
                    style={{
                        textAlign: "center",
                        marginTop: "80px"
                    }}
                >
                    Verifying Certificate...
                </h2>
            </>
        );

    }

    if (!data.valid) {

        return (

            <>
                <Navbar />

                <div
                    style={{
                        textAlign: "center",
                        marginTop: "100px"
                    }}
                >

                    <h1 style={{ color: "red" }}>
                        ❌ Invalid Certificate
                    </h1>

                    <button
                        onClick={() => navigate("/dashboard")}
                        style={{
                            marginTop: "20px",
                            padding: "10px 20px"
                        }}
                    >
                        Back to Dashboard
                    </button>

                </div>

            </>

        );

    }

    return (

        <>

            <Navbar />

            <div
                style={{
                    width: "700px",
                    margin: "40px auto",
                    background: "white",
                    padding: "30px",
                    borderRadius: "15px",
                    boxShadow: "0 5px 20px rgba(0,0,0,.2)",
                    textAlign: "center"
                }}
            >

                <h1 style={{ color: "green" }}>
                    ✅ Certificate Verified
                </h1>

                <hr />

                <h2>Candidate : {data.username}</h2>

                <h2>Assessment : {data.assessment}</h2>

                <h2>Score : {data.score}</h2>

                <h2>Percentage : {data.percentage}%</h2>

                <h2>
                    Issued :
                    {" "}
                    {new Date(data.issued_at).toLocaleDateString()}
                </h2>

                <h3
                    style={{
                        color: "#4f46e5",
                        marginTop: "25px"
                    }}
                >
                    Certificate ID
                </h3>

                <p>{data.certificate_id}</p>

                <button
                    onClick={() => navigate("/dashboard")}
                    style={{
                        marginTop: "20px",
                        padding: "12px 25px",
                        background: "#4f46e5",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    Back to Dashboard
                </button>

            </div>

        </>

    );

}

export default VerifyCertificate;