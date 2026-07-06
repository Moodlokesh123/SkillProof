function QuestionCard({
    question,
    selectedOption,
    onSelect
}) {

    if (!question) {
        return <h2>Loading...</h2>;
    }

    return (

        <div className="question-card">

            <h2>
                {question.question_text}
            </h2>

            {question.options.map((option) => (

                <label
                    key={option.id}
                    className="option"
                >

                    <input
                        type="radio"
                        name="option"
                        checked={selectedOption === option.id}
                        onChange={() => onSelect(option.id)}
                    />

                    {option.option_text}

                </label>

            ))}

        </div>

    );

}

export default QuestionCard;