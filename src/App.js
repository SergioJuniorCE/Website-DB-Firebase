import "./App.css";
import Link from "./components/Link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="container p-4">
      <div>
        <Link />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
