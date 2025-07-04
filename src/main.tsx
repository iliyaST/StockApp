import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { StockAppProvider } from "./contexts/StockAppContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <StockAppProvider>
            <App />
        </StockAppProvider>
    </React.StrictMode>
);
