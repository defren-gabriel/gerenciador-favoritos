import {HashRouter, Routes, Route} from "react-router-dom";

//Páginas
import Inicio from "./Paginas/Inicio";
import Lista from "./Paginas/Lista";
import Erro from "./Paginas/Erro";

//Componentes
import Navegacao from "./Componentes/Navegacao";

const App = () => {
  
  return (
    <>
      <HashRouter>
        <Navegacao />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/lista" element={<Lista />} />
          <Route path="*" element={<Erro />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
