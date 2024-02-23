import { ThemeProvider } from "./context/themeProvider";
import PageRoutes from "./pages/PageRoutes";

function App() {
  return (
    <ThemeProvider>
      <PageRoutes />
    </ThemeProvider>
  );
}

export default App;
