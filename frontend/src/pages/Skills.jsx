import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";
import "./Skills.css";

function Skills() {

    const [skills, setSkills] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        api.get("skills/")
            .then((response) => {

                setSkills(response.data);

            })
            .catch((error) => {

                console.log(error);

            });

    }, []);

    return (

        <>
            <Navbar />

            <div className="skills-container">

                <h1>Available Skills</h1>

                <div className="skills-grid">

                    {skills.map((skill) => (

                        <div className="skill-card" key={skill.id}>

                            <h2>{skill.name}</h2>

                            <p>{skill.description}</p>

                            <button
                                onClick={() =>
                                    navigate(`/assessments/${skill.id}`)
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

export default Skills;