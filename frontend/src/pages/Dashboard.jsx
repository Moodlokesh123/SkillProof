import { useEffect, useState } from "react";

import api from "../services/api";
import "./Dashboard.css";
import Navbar from "../components/Navbar";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        api.get("tests/dashboard/")
            .then((response) => {

                setDashboard(response.data);

            })
            .catch((error) => {

                console.log(error);

            });

    }, []);

    if (!dashboard) {

        return (
            <>
                <Navbar />

                <h2
                    style={{
                        textAlign: "center",
                        marginTop: "50px"
                    }}
                >
                    Loading Dashboard...
                </h2>
            </>
        );

    }

    return (

        <>
            <Navbar />

            <div className="dashboard">

                <h1>
                    Welcome, {dashboard.username} 👋
                </h1>

                <div className="cards">

                    <div className="card">

                        <h2>Assessments</h2>

                        <p>{dashboard.total_assessments}</p>

                    </div>

                    <div className="card">

                        <h2>Certificates</h2>

                        <p>{dashboard.certificates}</p>

                    </div>

                    <div className="card">

                        <h2>Passed</h2>

                        <p>{dashboard.passed}</p>

                    </div>

                    <div className="card">

                        <h2>Failed</h2>

                        <p>{dashboard.failed}</p>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Dashboard;