import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import {Provider} from "./context/books.js";


const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
    <Provider>
        <App />
    </Provider>
);