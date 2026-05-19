
import { Toaster } from "react-hot-toast";
import AppRoutes from "./index.jsx";

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1E293B",
            color: "#E2E8F0",
            border: "1px solid #06B6D4",
          },
        }}
      />
    </>
  );
}

export default App;
