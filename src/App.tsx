import "./App.css";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/music" element={<div>music</div>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
