import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Erro.module.css";

const Erro = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Configura um temporizador de 4 segundos antes de redirecionar
        const timer = setTimeout(() => {
            navigate("/");
        }, 2500);

        // Limpa o temporizador se o componente for desmontado antes de 4 segundos
        return () => clearTimeout(timer);
    }, [navigate]);

    return(
        <section className={styles.section}>
            <h1 className={styles.titulo1}>A pagina requisitada não existe, redirecionando para o início...</h1>
        </section>
    );
}

export default Erro;