import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../Contextos/AuthLoginLogout";

//Estilo local
import styles from "./Navegacao.module.css";

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
        <header className={styles.header}>
            <div className={styles.dev}>
                <a className={styles.deva} href="https://github.com/defren-gabriel/gerenciador-favoritos" target="_blank">Link do Projeto</a>
                <a className={styles.deva} href="https://github.com/defren-gabriel" target="_blank">Link do DeFrEn</a>
            </div>
            <nav className={styles.nav}>
                <div className={styles.container1}>
                    <span className={styles.container1s}>Favoritos Web</span>
                    <Link className={styles.container1a} to={"/"} style={{display: estaLista ? "none" : "block"}} disabled={estaLista}>Início</Link>
                    <Link className={styles.container1a} to={"/lista"} style={{display: estaInicio ? "none" : "block"}} disabled={estaInicio} >Tarefas</Link>
                </div>
                <button className={styles.navb} style={{display: estaInicio ? "none" : "block"}} disabled={estaInicio} onClick={()=>handleSair()}>Sair</button>
            </nav>
        </header>
    );
}

export default Navegacao;