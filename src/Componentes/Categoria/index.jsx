import {useState, useEffect, useRef} from "react";
import { useAuth } from "../../Contextos/AuthLoginLogout";

import LinkFavorito from "../../Componentes/LinkFavorito";

import styles from "./Categoria.module.css";

const Categoria = ({categoria, categoriaid, lista, limpar, focar}) => {
    //coordenada o usuario e funcoes da tela
    const {deletaFavorito, registraFavorito, deletaCategoria} = useAuth();

    //coordena o nome e endereço do link
    const [nome, setNome] = useState("");
    const handleNomeChange = (e) => setNome(e.target.value);
    const [link, setLink] = useState("");
    const handleLinkChange = (e) => setLink(e.target.value);

    //coordena a ação de mostrar o campo de registro
    const [acao, setAcao] = useState(false);
    const handleAcaoChange = () => setAcao(!acao);

    //coordena a adição do favorito na lista
    const handleSubmit = (e) => {
        e.preventDefault();
        
        registraFavorito(categoriaid, nome, link);
        
        setNome("");
        setLink("");
        handleAcaoChange();
    }

    //referencia para o input texto do form
    const inputNomeRef = useRef();
    useEffect(()=>{
        if(acao == true){
            inputNomeRef.current.focus();
        }
    }, [acao]);
    
    //coordena a ação de deletar os favoritos
    const [del, setDel] = useState(false);
    const handleDelChange = () => setDel(!del);

    //função que manipula a execução da delete de categoria
    const handleDeleteCategoria = () => {
        const confirmacao = window.confirm("Esta ação excluirá a categoria e todos os favoritos associados a ela. Deseja continuar?");
        if (confirmacao) {
            deletaCategoria(categoriaid);
        }
    }

    //função que manipula a execução da delete de favorito
    const handleDeleteFavorito = (id) => {
        const confirmacao = window.confirm("Esta ação excluirá o favorito associado. Deseja continuar?");
        if (confirmacao) {
            deletaFavorito(id);
        }
    }

    //metodo que executa algumas coisas ao clicar no link
    const clicouLink = () => {
        limpar();
        focar();
    }

    return(
        <div className={styles.categoria}>
            <div className={styles.cat}>
                <h2 className={styles.titulo2}>{categoria}</h2>
                <button className={styles.apagar} onClick={()=>handleDelChange()}>-</button>
                {
                    del && <button className={styles.apagar} onClick={()=>handleDeleteCategoria()}>Apagar a categoria</button>
                }
            </div>
            <div className={styles.grupo}>
                {
                    lista
                    .filter(item => item.categoria == categoriaid)
                    .map((item) => (
                        <div className={styles.link} key={item.id}>
                            <LinkFavorito 
                                lfhref={item.link.startsWith("http") ? item.link : `http://${item.link}`}  
                                lfnome={item.nome}
                                lfclick={() => clicouLink()}
                            />
                            {
                                del && <button className={styles.linkb} onClick={() => handleDeleteFavorito(item.id)}>X</button>
                            }
                        </div>
                    ))
                }
            </div>
            <button className={styles.registrar} onClick={handleAcaoChange}>Adicionar Favorito</button>
            {
            acao &&
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.campo}>
                        <label className={styles.label} htmlFor="nome">Nome</label>
                        <input className={styles.input} type="text" name="nome" id="nome" value={nome} onChange={handleNomeChange} ref={inputNomeRef} />
                    </div>
                    <div className={styles.campo}>
                        <label className={styles.label} htmlFor="link">Link</label>
                        <input className={styles.input} type="text" name="link" id="link" value={link} onChange={handleLinkChange} />
                    </div>
                    <input className={styles.nrformsub} type="submit" value="Registrar" />
                </form>
            }
        </div>
    );
}

export default Categoria;