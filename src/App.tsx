import "@sadang-turtleneck-new-ui/ui/design-system.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/main";
import PlaygroundPage from "./pages/playground";
import { Button } from "@sadang-turtleneck-new-ui/ui";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/playground" element={<PlaygroundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
