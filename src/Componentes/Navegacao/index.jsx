import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../Contextos/AuthLoginLogout";

//Estilo local
import styles from "./Navegacao.module.css";

const Navegacao = () => {
    //se estiver no inicio não mostra o botão sair
    const location = useLocation();
    const estaInicio = location.pathname === "/";
    
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
                <a className={styles.deva} href="https://github.com/defren-gabriel/gerenciador-favoritos" target="_blank" id="inicio">Link do Projeto</a>
                <a className={styles.deva} href="https://github.com/defren-gabriel" target="_blank">Link do DeFrEn</a>
            </div>
            <nav className={styles.nav}>
                <span className={styles.container1s}>Favoritos Web</span>
                <button className={styles.navb} style={{display: estaInicio ? "none" : "block"}} disabled={estaInicio} onClick={()=>handleSair()}>Sair</button>
            </nav>
        </header>
    );
}

export default Navegacao;