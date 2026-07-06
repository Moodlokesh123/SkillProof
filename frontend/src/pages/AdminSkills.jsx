import { useEffect, useState } from "react";
import api from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminSkills.css";

function AdminSkills() {

    const [skills, setSkills] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        description: "",
        difficulty: "Beginner",
        is_active: true,
        image: null,
    });

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await api.get("skills/");
            setSkills(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {

        const { name, value, type, checked, files } = e.target;

        if (type === "file") {

            setForm({
                ...form,
                image: files[0]
            });

        } else {

            setForm({
                ...form,
                [name]: type === "checkbox" ? checked : value
            });

        }
    };

    const handleSubmit = async () => {

        const data = new FormData();

        data.append("name", form.name);
        data.append("description", form.description);
        data.append("difficulty", form.difficulty);
        data.append("is_active", form.is_active);

        if (form.image) {
            data.append("image", form.image);
        }

        try {

            if (editingId) {

                await api.put(
                    `skills/${editingId}/update/`,
                    data,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

            } else {

                await api.post(
                    "skills/create/",
                    data,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

            }

            resetForm();

            fetchSkills();

        } catch (error) {

            console.log(error.response?.data);

        }
    };

    const editSkill = (skill) => {

        setEditingId(skill.id);

        setForm({

            name: skill.name,
            description: skill.description,
            difficulty: skill.difficulty,
            is_active: skill.is_active,
            image: null,

        });

    };

    const deleteSkill = async (id) => {

        if (!window.confirm("Delete this skill?")) {
            return;
        }

        await api.delete(`skills/${id}/delete/`);

        fetchSkills();

    };

    const resetForm = () => {

        setEditingId(null);

        setForm({

            name: "",
            description: "",
            difficulty: "Beginner",
            is_active: true,
            image: null,

        });

    };

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="skills-page">

                <h1>Skills Management</h1>

                <div className="form">

                    <input
                        type="text"
                        name="name"
                        placeholder="Skill Name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <select
                        name="difficulty"
                        value={form.difficulty}
                        onChange={handleChange}
                    >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>

                    <input
                        type="file"
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

                        {editingId ? "Update Skill" : "Add Skill"}

                    </button>

                </div>

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Difficulty</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {skills.map((skill) => (

                            <tr key={skill.id}>

                                <td>{skill.id}</td>

                                <td>

                                    {skill.image && (

                                        <img
                                            src={`http://127.0.0.1:8000${skill.image}`}
                                            width="60"
                                            alt={skill.name}
                                        />

                                    )}

                                </td>

                                <td>{skill.name}</td>

                                <td>{skill.difficulty}</td>

                                <td>

                                    {skill.is_active ? "Active" : "Inactive"}

                                </td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() => editSkill(skill)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteSkill(skill.id)}
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

export default AdminSkills;