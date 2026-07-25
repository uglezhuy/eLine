import StudentPage from './pages/Student/StudentPage.jsx'
import AdminPage from './pages/Admin/AdminPage.jsx'



import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function App() {



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

      />} />

      <Route path="/admin" element={<AdminPage

      // requests={requests}
      // setRequests={setRequests}
      // schedule={schedule}
      // loadRequests={loadRequests}
      />} />

    </Routes>
  )

}

export default App;