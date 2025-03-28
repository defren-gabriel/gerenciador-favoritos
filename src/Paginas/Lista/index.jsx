import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contextos/AuthLoginLogout";

import Categoria from "../../Componentes/Categoria";
import Atalhos from "../../Componentes/Atalhos";

//importe o estilo local
import styles from "./Lista.module.css";

const Lista = () => {
    //coordenada o usuario e funcoes da tela
    const {user, registraCategoria, lista = [], categorias = []} = useAuth();
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
    }, [user]);

    //manipula a pesquisa
    const [pesquisa, setPesquisa] = useState("");
    const handlePesquisaChange = (e) => setPesquisa(e.target.value);
    const [novapesquisa, setNovaPesquisa] = useState([]);
    const [novacategorias, setNovaCategorias] = useState([]);
    useEffect(()=>{
        if(pesquisa.length){
            //gera a nova lista de favoritos
            const novalista = lista.filter((item)=> item.nome.toLowerCase().includes(pesquisa.toLowerCase()));
            setNovaPesquisa(novalista);

            //gera a lista com as categorias unicas
            const categoriasFiltradas = [
                ...new Set(novalista.map((item) => item.categoria))
            ];

            //gera a nova lista de categorias
            const categoriasVisiveis = categorias.filter((item) =>categoriasFiltradas.includes(item.id));
            setNovaCategorias(categoriasVisiveis);
        }
        else {
            setNovaPesquisa([]);
        }
    }, [pesquisa]);

    //foca no componente de pesquisa
    const inputPesquisaRef = useRef();
    useEffect(() => {
        if (inputPesquisaRef.current) {
            inputPesquisaRef.current.focus();
        }
    }, [categorias, lista]);


    //metodo que apaga a pesquisa assim que qualquer link seja clicado
    const limpaPesquisa = () => {
        setPesquisa("");
    }

    //foca no componente pesquisa apos clicar em um link
    const focarPesquisa = () => {
        if (inputPesquisaRef.current) {
            inputPesquisaRef.current.focus();
        }
    }

    //simplifica a renderização
    const listaCategorias = novapesquisa.length ? novacategorias : categorias;
    const listaItens = novapesquisa.length ? novapesquisa : lista;

    return(
        <section className={styles.section}>
        <>
            <h1 
                className={styles.titulo}
            >
                Sua lista de favoritos
            </h1>
            <div className={styles.pesquisa}>
                <label className={styles.label} htmlFor="pesquisa">Pesquisar</label>
                <input className={styles.input} type="text" name="pesquisa" id="pesquisa" value={pesquisa} onChange={handlePesquisaChange} ref={inputPesquisaRef} />
            </div>
            {/* Lista os atalhos das âncoras */}
            <Atalhos lista={listaCategorias} />

            {/* Lista as categorias */}
            {listaCategorias.map((item) => (
                <Categoria
                    key={item.id}
                    categoria={item.categoria}
                    categoriaid={item.id}
                    lista={listaItens}
                    limpar={limpaPesquisa}
                    focar={focarPesquisa}
                />
            ))}
        </>
        <hr className={styles.hr} />
        <button className={styles.registrar} onClick={handleAcaoChange}>Adicionar Categoria</button>
        {
            acao &&
            <div className={styles.novoregistro}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.label} htmlFor="categoria">Categoria</label>
                    <input className={styles.input} type="text" name="categoria" id="categoria" value={categoria} onChange={handleCategoriaChange} ref={inputCategoriaRef} />
                    <input className={styles.nrformsub} type="submit" value="Registrar" />
                </form>
            </div>
        }
        </section>
    );
}

export default Lista;