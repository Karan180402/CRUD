import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Create from "./pages/create";
import Todos from "./pages/todos";
import UpdateTodo from "./pages/update";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          }
        />
        <Route
          path="/view"
          element={
            <PrivateRoute>
              <Todos />
            </PrivateRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <PrivateRoute>
              <UpdateTodo />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
