import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";
import "./Assessments.css";

function Assessments() {

    const { skillId } = useParams();

    const navigate = useNavigate();

    const [assessments, setAssessments] = useState([]);

    useEffect(() => {

        api.get(`tests/${skillId}/`)
            .then((response) => {

                setAssessments(response.data);

            })
            .catch((error) => {

                console.log(error);

            });

    }, [skillId]);

    return (

        <>
            <Navbar />

            <div className="assessment-page">

                <h1>Available Assessments</h1>

                <div className="assessment-grid">

                    {assessments.map((assessment) => (

                        <div
                            className="assessment-card"
                            key={assessment.id}
                        >

                            <h2>{assessment.title}</h2>

                            <p>
                                <strong>Duration:</strong> {assessment.duration} Minutes
                            </p>

                            <p>
                                <strong>Difficulty:</strong> {assessment.difficulty}
                            </p>

                            <button
                                onClick={() =>
                                    navigate(`/assessment/${assessment.id}`)
                                }
                            >
                                Start Assessment
                            </button>

                        </div>

                    ))}

                </div>

            </div>
        </>

    );

}

export default Assessments;