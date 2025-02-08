import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../Contextos/AuthLoginLogout";

//Estilo local
import "./index.css";

const Navegacao = () => {
    //se estiver no inicio não mostra o botão sair
    const location = useLocation();
    const estaInicio = location.pathname === "/";
    const estaLista = location.pathname === "/lista";
    
    const navigate = useNavigate();
    const {logout} = useAuth();
    const handleSair = async () => {
        try {
            await logout();  // Chama a função de logout
            navigate("/");
        } catch (error) {
            console.error("Erro ao fazer logout:", error.message);
        }
    }

    return(
        <header>
            <div className="dev">
                <a href="https://github.com/defren-gabriel/aquela-tarefa" target="_blank">Link do Projeto</a>
                <a href="https://github.com/defren-gabriel" target="_blank">Link do DeFrEn</a>
            </div>

            <nav>
                <div className="container1">
                    <span>Aquela Tarefa</span>
                    <NavLink to={"/"} style={{display: estaLista ? "none" : "block"}} disabled={estaLista}>Início</NavLink>
                    <NavLink to={"/lista"} style={{display: estaInicio ? "none" : "block"}} disabled={estaInicio} >Tarefas</NavLink>
                </div>
                <button style={{display: estaInicio ? "none" : "block"}} disabled={estaInicio} onClick={()=>handleSair()}>Sair</button>
            </nav>
        </header>
    );
}

export default Navegacao;