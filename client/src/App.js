import AddUser from './adduser/AddUser';
import './App.css';
import User from "./getuser/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdateUser from "./updateuser/update";   // ✅ FIXED

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <AddUser />,
    },
    {
      path: "/update/:id",
      element: <UpdateUser />,   // ✅ FIXED
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;