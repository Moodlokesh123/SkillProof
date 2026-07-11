import "./QuestionPalette.css";

function QuestionPalette({
    questions,
    currentQuestion,
    answers,
    setCurrentQuestion
}) {

    return (

        <div className="palette">

            <h3>Question Palette</h3>

            <div className="palette-grid">

                {questions.map((question, index) => {

                    let className = "not-answered";

                    if (answers[question.id]) {
                        className = "answered";
                    }

                    if (index === currentQuestion) {
                        className = "current";
                    }

                    return (

                        <button

                            key={question.id}

                            className={className}

                            onClick={() => setCurrentQuestion(index)}

                        >

                            {index + 1}

                        </button>

                    );

                })}

            </div>

        </div>

    );

}

export default QuestionPalette;