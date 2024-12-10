import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { WorkoutProvider } from "./context/context";

function App() {
  return (
    <WorkoutProvider>
      <div className="">
        <BrowserRouter>
          <Navbar />
          <div className="">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </WorkoutProvider>
  );
}

export default App;
