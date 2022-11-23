import './App.css';
import { PrivateRoute } from './auth/privateRoute';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './auth/LoginPage/loginPage';
import SignupPage from './auth/signupPage/signupPage';
import Dashboard from './dashboard/dashboard';
import DocumentationEditor from './dashboard/documentationEditor/documentationEditor';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<h1>Homepage</h1>} exact></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Route>
          <Route path="/documentation/editor/:documId/" element={<PrivateRoute />}>
            <Route path="/documentation/editor/:documId/" element={<DocumentationEditor />}></Route>
          </Route>
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
