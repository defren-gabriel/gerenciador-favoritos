import {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contextos/AuthLoginLogout";

import LinkFavorito from "../../Componentes/LinkFavorito";

import styles from "./Categoria.module.css";

const Categoria = ({categoria, categoriaid, lista, limpar, focar}) => {
    //coordenada o usuario e funcoes da tela
    const { registraFavorito } = useAuth();

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

    //metodo que executa algumas coisas ao clicar no link
    const clicouLink = () => {
        limpar();
        focar();
    }

    //avança para a tela de configuração da categoria e seus registros
    const navigate = useNavigate();
    const pesquisarCategoria = () => {
        navigate(`/configurarcategoria/${categoria}/${categoriaid}`);
    }

    //faz o scroll para as ancoras
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return(
        <div className={styles.categoria}>
            <div className={styles.cat}>
                <button 
                    onClick={() => scrollToSection("inicio")}
                    className={styles.configurar}
                >
                    Inicio
                </button>
                <h3 
                    className={styles.titulo2}
                    id={categoriaid}
                >
                    {categoria}
                </h3>
                <button 
                    className={styles.configurar}
                    onClick={() => pesquisarCategoria()}
                >Configurações</button>
            </div>
            <div className={styles.grupo}>
                {
                    lista
                    .filter(item => item.categoria == categoriaid)
                    .map((item) => (
                        <LinkFavorito 
                                lfhref={item.link.startsWith("http") ? item.link : `http://${item.link}`}  
                                lfnome={item.nome}
                                lfclick={() => clicouLink()}
                                key={item.id}
                        />
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