import { ListProvider } from "./contexts/listContext";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <ListProvider>
        <Home />
      </ListProvider>
    </>
  );
}

export default App;
