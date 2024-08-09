import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import QueryProvider from "./lib/react-query/QueryProvider";
import AuthProvider from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")! as HTMLElement).render(
  // Dùng để định tuyến cho các page
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
);
