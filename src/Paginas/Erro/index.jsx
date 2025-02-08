import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";

const Erro = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate("/");
    }, []);

    return(
        <>
            <h1>A pagina requisitada não existe, redirecionando para o início...</h1>
        </>
    );
}

export default Erro;