import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import All_Route from "./routes/AllRoute";
Chart.register(CategoryScale);
function App() {
  return (
    <div className="App" >
      <All_Route />
      <ToastContainer />
    </div>
  );
}

export default App;
