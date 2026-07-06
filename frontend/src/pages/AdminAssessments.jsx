import { useEffect, useState } from "react";
import api from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminAssessments.css";

function AdminAssessments() {

    const [assessments, setAssessments] = useState([]);
    const [skills, setSkills] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        title: "",
        skill: "",
        description: "",
        duration: 30,
        total_marks: 100,
        pass_marks: 60,
        difficulty: "Beginner",
        is_active: true,
    });

    useEffect(() => {
        fetchAssessments();
        fetchSkills();
    }, []);

    const fetchAssessments = async () => {

        try {

            const response = await api.get("tests/admin/");

            setAssessments(response.data);

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
                    `tests/admin/${editingId}/update/`,
                    form
                );

            } else {

                await api.post(
                    "tests/admin/create/",
                    form
                );

            }

            setEditingId(null);

            setForm({
                title: "",
                skill: "",
                description: "",
                duration: 30,
                total_marks: 100,
                pass_marks: 60,
                difficulty: "Beginner",
                is_active: true,
            });

            fetchAssessments();

        } catch (error) {

            console.log(error.response?.data);

        }

    };

    const editAssessment = (assessment) => {

        setEditingId(assessment.id);

        setForm({
            title: assessment.title,
            skill: assessment.skill,
            description: assessment.description,
            duration: assessment.duration,
            total_marks: assessment.total_marks,
            pass_marks: assessment.pass_marks,
            difficulty: assessment.difficulty,
            is_active: assessment.is_active,
        });

    };

    const deleteAssessment = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this assessment?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `tests/admin/${id}/delete/`
            );

            fetchAssessments();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="assessment-page">

                <h1>Assessment Management</h1>

                <div className="form">

                    <input
                        type="text"
                        name="title"
                        placeholder="Assessment Title"
                        value={form.title}
                        onChange={handleChange}
                    />

                    <select
                        name="skill"
                        value={form.skill}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Skill
                        </option>

                        {skills.map((skill) => (

                            <option
                                key={skill.id}
                                value={skill.id}
                            >
                                {skill.name}
                            </option>

                        ))}

                    </select>

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="duration"
                        placeholder="Duration"
                        value={form.duration}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="total_marks"
                        placeholder="Total Marks"
                        value={form.total_marks}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="pass_marks"
                        placeholder="Pass Marks"
                        value={form.pass_marks}
                        onChange={handleChange}
                    />

                    <select
                        name="difficulty"
                        value={form.difficulty}
                        onChange={handleChange}
                    >

                        <option value="Beginner">
                            Beginner
                        </option>

                        <option value="Intermediate">
                            Intermediate
                        </option>

                        <option value="Advanced">
                            Advanced
                        </option>

                    </select>

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

                        {editingId
                            ? "Update Assessment"
                            : "Add Assessment"}

                    </button>

                </div>

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Title</th>
                            <th>Skill</th>
                            <th>Duration</th>
                            <th>Total</th>
                            <th>Pass</th>
                            <th>Difficulty</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {assessments.map((assessment) => (

                            <tr key={assessment.id}>

                                <td>{assessment.id}</td>

                                <td>{assessment.title}</td>

                                <td>{assessment.skill}</td>

                                <td>{assessment.duration} mins</td>

                                <td>{assessment.total_marks}</td>

                                <td>{assessment.pass_marks}</td>

                                <td>{assessment.difficulty}</td>

                                <td>

                                    {assessment.is_active
                                        ? "Active"
                                        : "Inactive"}

                                </td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            editAssessment(assessment)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteAssessment(
                                                assessment.id
                                            )
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

export default AdminAssessments;