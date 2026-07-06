import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import Assessments from "./pages/Assessments";
import Assessment from "./pages/Assessment";
import Result from "./pages/Result";
import Certificate from "./pages/Certificate";
import VerifyCertificate from "./pages/VerifyCertificate";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSkills from "./pages/AdminSkills";
import AdminAssessments from "./pages/AdminAssessments";
import AdminQuestions from "./pages/AdminQuestions";
import AdminUsers from "./pages/AdminUsers";
import AdminCertificates from "./pages/AdminCertificates";

import Protected from "./components/Protected";
import AdminProtected from "./components/AdminProtected";

import NotFound from "./pages/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/verify/:certificateId"
                    element={<VerifyCertificate />}
                />
                <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                />

                {/* Candidate Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <Protected>
                            <Dashboard />
                        </Protected>
                    }
                />

                <Route
                    path="/skills"
                    element={
                        <Protected>
                            <Skills />
                        </Protected>
                    }
                />

                <Route
                    path="/assessments/:skillId"
                    element={
                        <Protected>
                            <Assessments />
                        </Protected>
                    }
                />

                <Route
                    path="/assessment/:id"
                    element={
                        <Protected>
                            <Assessment />
                        </Protected>
                    }
                />

                <Route
                    path="/result/:attemptId"
                    element={
                        <Protected>
                            <Result />
                        </Protected>
                    }
                />

                <Route
                    path="/certificate/:id"
                    element={
                        <Protected>
                            <Certificate />
                        </Protected>
                    }
                />

                {/* Admin Routes */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <AdminProtected>
                            <AdminDashboard />
                        </AdminProtected>
                    }
                />

                <Route
                    path="/admin/skills"
                    element={
                        <AdminProtected>
                            <AdminSkills />
                        </AdminProtected>
                    }
                />

                <Route
                    path="/admin/assessments"
                    element={
                        <AdminProtected>
                            <AdminAssessments />
                        </AdminProtected>
                    }
                />

                <Route
                    path="/admin/questions"
                    element={
                        <AdminProtected>
                            <AdminQuestions />
                        </AdminProtected>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <AdminProtected>
                            <AdminUsers />
                        </AdminProtected>
                    }
                />

                <Route
                    path="/admin/certificates"
                    element={
                        <AdminProtected>
                            <AdminCertificates />
                        </AdminProtected>
                    }
                />

                {/* 404 */}
                <Route
                    path="*"
                    element={<NotFound />}
                />
		<Route
   			 path="/admin/users"
    			element={
        		<AdminProtected>
           		 <AdminUsers />
      			</AdminProtected>
   		 }
		/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;