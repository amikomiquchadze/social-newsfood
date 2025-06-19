import setupInterceptors from "./api/interceptors";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  setupInterceptors()
  return <Dashboard />;
}

export default App;
