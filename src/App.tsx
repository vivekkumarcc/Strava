import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="app-main">
      <RouterProvider router={routes} fallbackElement={<div>Loading...</div>} />
      <ToastContainer />
    </div>
  );
}

export default App;
