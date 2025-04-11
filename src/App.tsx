// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";
import Home from "@/pages/LandingPage";
import SignInPage from "@/pages/SignInPage";
import DashboardPage from "@/pages/DashboardPage";
import PlaygroundPage from "@/pages/PlaygroundPage";
import ChatbotsPage from "@/pages/ChatbotsPage";
import ModelsPage from "@/pages/ModelsPage";
import KnowledgeBasePage from "@/pages/KnowledgeBasePage";
import SettingsPage from "@/pages/SettingsPage";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute/ProtectedRoute";
import Layout from "@/layouts/DashboardLayout"; // Import layout mới

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route
              element={
                <ProtectedRoute>
                  <Layout /> 
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/playground" element={<PlaygroundPage />} />
              <Route path="/chatbots" element={<ChatbotsPage />} />
              <Route path="/models" element={<ModelsPage />} />
              <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
