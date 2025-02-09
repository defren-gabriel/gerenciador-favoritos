import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contextos/AuthLoginLogout";

import Categoria from "../../Componentes/Categoria";

//importe o estilo local
import "./index.css";

const Lista = () => {
    //coordenada o usuario e funcoes da tela
    const {user, registraCategoria, deletaCategoria, lista = [], categorias = [], loadingLista} = useAuth();
    const navigate = useNavigate();

    //coordena a adição da categoria na lista
    const handleSubmit = (e) => {
        e.preventDefault();
        
        registraCategoria(categoria);
        
        setCategoria("");
        handleAcaoChange();
    }

    //coordena item
    const [categoria, setCategoria] = useState("");
    const handleCategoriaChange = (e) => setCategoria(e.target.value);

    //coordena a ação de mostrar o campo de registro
    const [acao, setAcao] = useState(false);
    const handleAcaoChange = () => setAcao(!acao);

    //referencia para o input texto do form
    const inputCategoriaRef = useRef();
    useEffect(()=>{
        if(acao == true){
            inputCategoriaRef.current.focus();
        }
    }, [acao]);

    //verifica se estou logado, se não estiver vai para o inicio
    useEffect(()=>{
        if(!user){
            navigate("/");
        }
    }, [lista]);

    return(
        <section>
        {
            loadingLista ? ( 
                <h1 className="titulo">Carregando sua lista...</h1> 
            ) : categorias.length ? ( 
                <>
                    <h1 className="titulo">Lista de favoritos:</h1>
                    {
                        categorias.map((item)=>(
                            <Categoria key={item.id} categoria={item.categoria} categoriaid={item.id} lista={lista} />
                        ))
                    }
                </>
            ) : ( 
                <h1 className="titulo">Sua lista de favoritos está vazia</h1> 
            )
        }
        <hr />
        <button className="registrar" onClick={handleAcaoChange}>+</button>
        {
            acao &&
            <div className="novoregistro">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="categoria">Categoria</label>
                    <input type="text" name="categoria" id="categoria" value={categoria} onChange={handleCategoriaChange} ref={inputCategoriaRef} />
                    <input type="submit" value="Registrar" className="nrformsub" />
                </form>
            </div>
        }
        </section>
    );
}

export default Lista;