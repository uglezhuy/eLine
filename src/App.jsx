import StudentPage from './pages/Student/StudentPage.jsx'
import AdminPage from './pages/Admin/AdminPage.jsx'
import schedule from '../src/data/schedule.js'

import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function App() {

  const [requests, setRequests] = useState([]);

  function loadRequests() {
    fetch("http://localhost:8888/backend/api/getRequests.php")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRequests(data);
      });
  }

  useEffect(() => {
    loadRequests();
  }, []);



  return (
    <Routes>

      <Route

        path="/"

        element={

          <div className="App">

            <h1>Выберите страницу:</h1>

            <Link to="/student">Студент</Link>

            <br />

            <Link to="/admin">Администратор</Link>

          </div>

        }

      />

      <Route path="/student" element={<StudentPage
        requests={requests}
        setRequests={setRequests}
        schedule={schedule}
        loadRequests={loadRequests}
      />} />

      <Route path="/admin" element={<AdminPage
        requests={requests}
        setRequests={setRequests}
        schedule={schedule}
        loadRequests={loadRequests}
      />} />

    </Routes>
  )

}

export default App;