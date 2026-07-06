import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Timer from "../components/Timer";
import QuestionCard from "../components/QuestionCard";
import QuestionPalette from "../components/QuestionPalette";

function Assessment() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [attemptId, setAttemptId] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});

    useEffect(() => {

        api.post(`tests/start/${id}/`)
            .then((response) => {

                setQuestions(response.data.questions);
                setAttemptId(response.data.attempt_id);

            })
            .catch((error) => {

                console.error(error);

            });

    }, [id]);

    const handleSelect = (optionId) => {

        setAnswers((prev) => ({
            ...prev,
            [questions[currentQuestion].id]: optionId
        }));

    };

    const handleSubmit = async () => {

        const payload = {

            answers: Object.entries(answers).map(
                ([questionId, optionId]) => ({
                    question_id: Number(questionId),
                    option_id: optionId
                })
            )

        };

        try {

            const response = await api.post(
                `tests/submit/${attemptId}/`,
                payload
            );

            navigate(`/result/${attemptId}`, {
                state: response.data
            });

        } catch (error) {

            console.error(error);
            alert("Submission Failed!");

        }

    };

    if (questions.length === 0) {

        return (
            <>
                <Navbar />
                <h2 style={{ textAlign: "center", marginTop: "40px" }}>
                    Loading Assessment...
                </h2>
            </>
        );

    }

    return (

        <>
            <Navbar />

            <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>

                <h1>Assessment</h1>

                <Timer minutes={30} />

                <h3>
                    Question {currentQuestion + 1} of {questions.length}
                </h3>

                <QuestionCard
                    question={questions[currentQuestion]}
                    selectedOption={
                        answers[questions[currentQuestion].id]
                    }
                    onSelect={handleSelect}
                />

                <br />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px"
                    }}
                >

                    <button
                        disabled={currentQuestion === 0}
                        onClick={() =>
                            setCurrentQuestion(currentQuestion - 1)
                        }
                    >
                        Previous
                    </button>

                    <button
                        disabled={
                            currentQuestion === questions.length - 1
                        }
                        onClick={() =>
                            setCurrentQuestion(currentQuestion + 1)
                        }
                    >
                        Next
                    </button>

                </div>

                <QuestionPalette
                    questions={questions}
                    currentQuestion={currentQuestion}
                    answers={answers}
                    setCurrentQuestion={setCurrentQuestion}
                />

                <div style={{ textAlign: "center", marginTop: "30px" }}>

                    <button
                        style={{
                            padding: "12px 30px",
                            background: "#16a34a",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "16px"
                        }}
                        onClick={handleSubmit}
                    >
                        Submit Assessment
                    </button>

                </div>

            </div>
        </>

    );

}

export default Assessment;