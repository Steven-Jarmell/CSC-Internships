import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import "./styles/App.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />} />
        </Routes>
    );
}

export default App;
