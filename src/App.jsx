import {BrowserRouter, Routes, Route} from "react-router-dom";

//Páginas
import Inicio from "./Paginas/Inicio";
import Lista from "./Paginas/Lista";
import Erro from "./Paginas/Erro";

//Componentes
import Navegacao from "./Componentes/Navegacao";

const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <Navegacao />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/lista" element={<Lista />} />
          <Route path="*" element={<Erro />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
