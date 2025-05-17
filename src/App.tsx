import "@sadang-turtleneck-new-ui/ui/design-system.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/main";
import PlaygroundPage from "./pages/playground";
import QueryClientProvider from "@shared/providers/QueryClientProvider";
import SigninPage from "@pages/signin";
import AuthGuard from "@shared/components/AuthGuard";
import Navbar from "@shared/components/Navbar";

function App() {
  return (
    <AuthGuard>
      <QueryClientProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthGuard>
  );
}

export default App;
