import { ListProvider } from "./contexts/listContext";
import Home from "./pages/Home";

function App() {
  return (
    <div className="font-main">
      <ListProvider>
        <Home />
      </ListProvider>
    </div>
  );
}

export default App;
