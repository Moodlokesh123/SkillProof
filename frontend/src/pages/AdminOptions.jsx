import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminOptions.css";

function AdminOptions() {

    const { questionId } = useParams();

    const [options, setOptions] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        question: questionId,
        option_text: "",
        is_correct: false,
    });

    useEffect(() => {
        fetchOptions();
    }, []);

    const fetchOptions = async () => {

        try {

            const response = await api.get(
                `questions/options/${questionId}/`
            );

            setOptions(response.data);

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
                    `questions/options/${editingId}/update/`,
                    form
                );

            } else {

                await api.post(
                    "questions/options/create/",
                    form
                );

            }

            setEditingId(null);

            setForm({
                question: questionId,
                option_text: "",
                is_correct: false,
            });

            fetchOptions();

        } catch (error) {

            console.log(error.response?.data);

        }

    };

    const editOption = (option) => {

        setEditingId(option.id);

        setForm({
            question: question.question,
            option_text: option.option_text,
            is_correct: option.is_correct,
        });

    };

    const deleteOption = async (id) => {

        if (!window.confirm("Delete this option?"))
            return;

        await api.delete(
            `questions/options/${id}/delete/`
        );

        fetchOptions();

    };

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="option-page">

                <h1>Question Options</h1>

                <div className="form">

                    <input
                        name="option_text"
                        placeholder="Option"
                        value={form.option_text}
                        onChange={handleChange}
                    />

                    <label>

                        <input
                            type="checkbox"
                            name="is_correct"
                            checked={form.is_correct}
                            onChange={handleChange}
                        />

                        Correct Answer

                    </label>

                    <button onClick={handleSubmit}>

                        {editingId
                            ? "Update Option"
                            : "Add Option"}

                    </button>

                </div>

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Option</th>

                            <th>Correct</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {options.map((option) => (

                            <tr key={option.id}>

                                <td>{option.id}</td>

                                <td>{option.option_text}</td>

                                <td>

                                    {option.is_correct
                                        ? "✅"
                                        : "❌"}

                                </td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            editOption(option)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteOption(option.id)
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

export default AdminOptions;