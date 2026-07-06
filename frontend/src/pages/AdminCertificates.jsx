import { useEffect, useState } from "react";
import api from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminCertificates.css";

function AdminCertificates() {

    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {

        const response = await api.get(
            "certificates/admin/"
        );

        setCertificates(response.data);

    };

    const deleteCertificate = async(id)=>{

        if(!window.confirm("Delete Certificate?"))
            return;

        await api.delete(
            `certificates/admin/${id}/delete/`
        );

        fetchCertificates();

    };

    return(

        <div className="admin-layout">

            <AdminSidebar/>

            <div className="certificate-page">

                <h1>Certificate Management</h1>

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Candidate</th>

                            <th>Assessment</th>

                            <th>Certificate ID</th>

                            <th>Issued</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {certificates.map(c=>(
                            <tr key={c.id}>

                                <td>{c.id}</td>

                                <td>{c.username}</td>

                                <td>{c.assessment}</td>

                                <td>{c.certificate_id}</td>

                                <td>{c.issued_at}</td>

                                <td>

                                    <button>
                                        Download
                                    </button>

                                    <button
                                    onClick={()=>
                                    deleteCertificate(c.id)}
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

export default AdminCertificates;