import GridGenerator from "./gridGenerator";
import { Toaster } from "react-hot-toast";
import GitHub from "./assets/git.png";

function App() {
  return (
    <>
      <img
        src={GitHub}
        alt="GitHub"
        className="absolute top-0 right-0 w-20 h-20 z-50 cursor-pointer"
        onClick={() =>
          window.open(
            "https://github.com/benouarAbdou/Grid_Code_Generator_React-Tailwind",
            "_blank"
          )
        }
      />
      <Toaster />
      <GridGenerator />
    </>
  );
}

export default App;
