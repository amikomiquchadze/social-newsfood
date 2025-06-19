import setupInterceptors from "./api/interceptors";
import Dashboard from "./pages/dashboard/Dashboard";
import { UserProvider } from "./contexts/UserContext";
function App() {
  setupInterceptors();
  return (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  );
}

export default App;
