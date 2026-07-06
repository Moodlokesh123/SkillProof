import { useEffect, useState } from "react";
import api from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminUsers.css";

function AdminUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {

            const response = await api.get("users/admin/");

            setUsers(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteUser = async (id) => {

        if (!window.confirm("Delete this user?"))
            return;

        await api.delete(`users/admin/${id}/delete/`);

        fetchUsers();

    };

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="users-page">

                <h1>User Management</h1>

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Staff</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.id}</td>

                                <td>{user.username}</td>

                                <td>{user.email}</td>

                                <td>

                                    {user.is_staff ? "Yes" : "No"}

                                </td>

                                <td>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteUser(user.id)
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

export default AdminUsers;