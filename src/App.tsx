import "./App.css";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import ROUTES from "routes";
import Discover from "./pages/Discover";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path={ROUTES.DISCOVER} element={<Discover />} />
          <Route path={ROUTES.PLAYLIST} element={<div>playlist</div>} />
          <Route path={ROUTES.LIKE} element={<div>like</div>} />
          <Route path={ROUTES.STAR} element={<div>star</div>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
