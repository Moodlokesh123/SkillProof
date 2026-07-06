import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import api from "../services/api";

import Navbar from "../components/Navbar";
import "./Certificate.css";

function Certificate() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [certificate, setCertificate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const certificateRef = useRef(null);

    useEffect(() => {

        const fetchCertificate = async () => {

            try {

                const response = await api.get(`certificates/${id}/`);

                setCertificate(response.data);

            } catch (err) {

                console.error(err);

                setError("Certificate not found.");

            } finally {

                setLoading(false);

            }

        };

        fetchCertificate();

    }, [id]);

    const downloadPDF = async () => {

        const canvas = await html2canvas(
            certificateRef.current,
            { scale: 2 }
        );

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
        });

        pdf.addImage(
            imgData,
            "PNG",
            0,
            0,
            297,
            210
        );

        pdf.save("SkillProof_Certificate.pdf");

    };

    if (loading) {

        return (
            <>
                <Navbar />
                <h2
                    style={{
                        textAlign: "center",
                        marginTop: "60px"
                    }}
                >
                    Loading Certificate...
                </h2>
            </>
        );

    }

    if (error) {

        return (
            <>
                <Navbar />

                <div
                    style={{
                        textAlign: "center",
                        marginTop: "80px"
                    }}
                >
                    <h2>{error}</h2>

                    <button
                        onClick={() => navigate("/dashboard")}
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

            <div>

                <div
                    ref={certificateRef}
                    className="certificate"
                >

                    <h1>🏆 Certificate of Achievement</h1>

                    <h3>This certifies that</h3>

                    <h2>{certificate.username}</h2>

                    <p>has successfully completed</p>

                    <h2>{certificate.assessment}</h2>

                    <h3>Score : {certificate.score}</h3>

                    <h3>
                        Percentage : {certificate.percentage}%
                    </h3>

                    <h3>
                        Date :
                        {" "}
                        {new Date(
                            certificate.date
                        ).toLocaleDateString()}
                    </h3>

                    {

                        certificate.qr_code && (

                            <img
                                src={`http://127.0.0.1:8000${certificate.qr_code}`}
                                alt="QR Code"
                                width="180"
                            />

                        )

                    }

                </div>

                <div
                    style={{
                        textAlign: "center",
                        marginTop: "30px"
                    }}
                >

                    <button
                        onClick={downloadPDF}
                        style={{
                            padding: "12px 25px",
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "16px",
                            marginRight: "15px"
                        }}
                    >
                        Download PDF
                    </button>

                    <button
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        Dashboard
                    </button>

                </div>

            </div>

        </>

    );

}

export default Certificate;