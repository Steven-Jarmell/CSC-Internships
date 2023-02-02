import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./styles/index.css";
import { store } from "./app/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

// Use solution from MERN tutorial to add back in strict mode
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);
