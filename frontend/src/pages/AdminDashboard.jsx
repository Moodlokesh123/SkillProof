import { useEffect, useState } from "react";
import api from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminDashboard.css";

function AdminDashboard() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        api.get("tests/admin/dashboard/")
            .then((response) => {

                setStats(response.data);

            })
            .catch(console.log);

    }, []);

    if (!stats) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="dashboard">

                <h1>Admin Dashboard</h1>

                <div className="cards">

                    <div className="card">
                        <h2>👥 Users</h2>
                        <p>{stats.users}</p>
                    </div>

                    <div className="card">
                        <h2>📚 Skills</h2>
                        <p>{stats.skills}</p>
                    </div>

                    <div className="card">
                        <h2>📝 Assessments</h2>
                        <p>{stats.assessments}</p>
                    </div>

                    <div className="card">
                        <h2>❓ Questions</h2>
                        <p>{stats.questions}</p>
                    </div>

                    <div className="card">
                        <h2>🏆 Certificates</h2>
                        <p>{stats.certificates}</p>
                    </div>

                    <div className="card">
                        <h2>📄 Attempts</h2>
                        <p>{stats.attempts}</p>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;