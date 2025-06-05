import { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ContentProvider } from './contexts/ContentContext';
import { ForumProvider } from './contexts/ForumContext.tsx';
import { ToolProvider } from './contexts/ToolContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page components
import Home from './pages/Home';
import Expecting from './pages/Expecting';
import Infants from './pages/Infants';
import Preschoolers from './pages/Preschoolers';
import SchoolAge from './pages/SchoolAge';
import Teenagers from './pages/Teenagers';
import Community from './pages/Community';
import Tools from './pages/Tools';
import Resources from './pages/Resources';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Protected route component
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ContentProvider>
          <ForumProvider>
            <ToolProvider>
              <NotificationProvider>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/expecting" element={<Expecting />} />
                      <Route path="/infants" element={<Infants />} />
                      <Route path="/preschoolers" element={<Preschoolers />} />
                      <Route path="/school-age" element={<SchoolAge />} />
                      <Route path="/teenagers" element={<Teenagers />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/tools" element={<Tools />} />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route 
                        path="/profile" 
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        } 
                      />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </NotificationProvider>
            </ToolProvider>
          </ForumProvider>
        </ContentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
