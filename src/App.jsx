import StudentPage from './pages/Student/StudentPage.jsx'
import AdminPage from './pages/Admin/AdminPage.jsx'
import schedule from '../src/data/schedule.js'

import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

function App() {

  const [requests, setRequests] = useState([]);

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
      />} />

      <Route path="/admin" element={<AdminPage
        requests={requests}
        setRequests={setRequests}
        schedule={schedule}
      />} />

    </Routes>
  )

}

export default App;