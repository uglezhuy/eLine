import StudentPage from './pages/Student/StudentPage.jsx';
import AdminPage from './pages/Admin/AdminPage.jsx';

import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  loadUser,
  loginDemo,
  loadCurrentUser
} from '../backend/api/requestApi.js';

function App() {

  const [roleID, setRoleID] = useState(null);
  const [previewUser, setPreviewUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (roleID !== null && roleID !== "") {
      loadUser(roleID, setPreviewUser);
    }
  }, [roleID]);

  return (
    <Routes>

      <Route
        path="/"
        element={
          <div className="App">

            <h1>Выберите роль пользователя:</h1>

            <select
              value={roleID ?? ""}
              onChange={(e) => setRoleID(e.target.value)}
            >
              <option value="">-- выберите пользователя --</option>
              <option value="1">Студентов Василий</option>
              <option value="2">Сотрудников Иван</option>
              <option value="3">Администраторов Сергей</option>
            </select>

            {previewUser && (
              <div className="Cardus">

                <div>Выбран ID роли: {roleID}</div>

                <h3>Пользователь</h3>
                <strong>{previewUser.name}</strong>

                <hr />

                <h3>Роль</h3>
                <strong>{previewUser.role}</strong>

                <hr />

                <h3>Доступные возможности</h3>
                <pre>{previewUser.demo_description}</pre>

                <button
                  onClick={() => {
                    loginDemo(previewUser.id).then((data) => {
                      if (data.success) {
                        loadCurrentUser(setUser);
                      }
                    });
                  }}
                >
                  Войти
                </button>

              </div>
            )}

            <h1>Выберите страницу:</h1>

            <div>
              Тип пользователя: {user?.role}
            </div>

            {user && (
              <>
                <Link to="/student">
                  Запись
                </Link>

                {(user.role === "employee" || user.role === "admin") && (
                  <>
                    <br />
                    <Link to="/admin">
                      Рабочая область
                    </Link>
                  </>
                )}
              </>
            )}

          </div>
        }
      />

      <Route
        path="/student"
        element={<StudentPage />}
      />

      <Route
        path="/admin"
        element={<AdminPage />}
      />

    </Routes>
  );
}

export default App;