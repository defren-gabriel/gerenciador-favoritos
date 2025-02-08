import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contextos/AuthLoginLogout";

import Categoria from "../../Componentes/Categoria";

//importe o estilo local
import "./index.css";

const Lista = () => {
    //coordenada o usuario e funcoes da tela
    const {user, registraCategoria, lista = [], loadingLista} = useAuth();
    const navigate = useNavigate();

    //coordena a adição da categoria na lista
    const handleSubmit = (e) => {
        e.preventDefault();
        
        registraCategoria(categoria);
        //atualiza a lista
        
        setCategoria("");
        handleAcaoChange();
    }

    //coordena item
    const [categoria, setCategoria] = useState("");
    const handleCategoriaChange = (e) => setCategoria(e.target.value);

    //coordena as categorias unicas
    const [categorias, setCategorias] = useState([]);

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

        //descobre as categorias unicas do registro do usuario
        const categoriasUnicas = [...new Set(lista.map(item => item.categoria))];
        setCategorias(categoriasUnicas);
    }, [lista]);

    return(
        <section>
        {
            loadingLista ? ( 
                <h1 className="titulo">Carregando sua lista...</h1> 
            ) : lista.length ? ( 
                <>
                    <h1 className="titulo">Lista de favoritos:</h1>
                    {
                        categorias.map((item, i)=>(
                            <Categoria key={i} categoria={item} lista={lista} />
                        ))
                    }
                </>
            ) : ( 
                <h1 className="titulo">Sua lista de favoritos está vazia</h1> 
            )
        }
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