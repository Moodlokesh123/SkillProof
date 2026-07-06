import { useEffect, useState } from "react";
import api from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminQuestions.css";

function AdminQuestions() {

    const [questions, setQuestions] = useState([]);
    const [skills, setSkills] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        skill: "",
        question: "",
        explanation: "",
        difficulty: "Easy",
        marks: 1,
        is_active: true,
    });

    useEffect(() => {
        fetchQuestions();
        fetchSkills();
    }, []);

    const fetchQuestions = async () => {

        try {

            const response = await api.get("questions/admin/");

            setQuestions(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchSkills = async () => {

        try {

            const response = await api.get("skills/");

            setSkills(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm({

            ...form,

            [name]: type === "checkbox" ? checked : value

        });

    };

    const handleSubmit = async () => {

        try {

            if (editingId) {

                await api.put(
                    `questions/admin/${editingId}/update/`,
                    form
                );

            } else {

                await api.post(
                    "questions/admin/create/",
                    form
                );

            }

            resetForm();

            fetchQuestions();

        } catch (error) {

            console.log(error.response?.data);

        }

    };

    const editQuestion = (question) => {

        setEditingId(question.id);

        setForm({

            skill: question.skill,
            question: question.question,
            explanation: question.explanation,
            difficulty: question.difficulty,
            marks: question.marks,
            is_active: question.is_active,

        });

    };

    const deleteQuestion = async (id) => {

        if (!window.confirm("Delete this question?")) {
            return;
        }

        await api.delete(
            `questions/admin/${id}/delete/`
        );

        fetchQuestions();

    };

    const resetForm = () => {

        setEditingId(null);

        setForm({

            skill: "",
            question: "",
            explanation: "",
            difficulty: "Easy",
            marks: 1,
            is_active: true,

        });

    };

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="question-page">

                <h1>Question Management</h1>

                <div className="form">

                    <select
                        name="skill"
                        value={form.skill}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Skill
                        </option>

                        {skills.map(skill => (

                            <option
                                key={skill.id}
                                value={skill.id}
                            >
                                {skill.name}
                            </option>

                        ))}

                    </select>

                    <textarea
                        name="question"
                        placeholder="Question"
                        value={form.question}
                        onChange={handleChange}
                    />

                    <textarea
                        name="explanation"
                        placeholder="Explanation"
                        value={form.explanation}
                        onChange={handleChange}
                    />

                    <select
                        name="difficulty"
                        value={form.difficulty}
                        onChange={handleChange}
                    >

                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>

                    </select>

                    <input
                        type="number"
                        name="marks"
                        value={form.marks}
                        onChange={handleChange}
                    />

                    <label>

                        <input
                            type="checkbox"
                            name="is_active"
                            checked={form.is_active}
                            onChange={handleChange}
                        />

                        Active

                    </label>

                    <button onClick={handleSubmit}>

                        {editingId ? "Update Question" : "Add Question"}

                    </button>

                </div>

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Question</th>
                            <th>Difficulty</th>
                            <th>Marks</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {questions.map((question) => (

                            <tr key={question.id}>

                                <td>{question.id}</td>

                                <td>{question.question}</td>

                                <td>{question.difficulty}</td>

                                <td>{question.marks}</td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            editQuestion(question)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteQuestion(question.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminQuestions;