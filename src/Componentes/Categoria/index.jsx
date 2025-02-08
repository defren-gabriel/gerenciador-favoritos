import {useState, useEffect, useRef} from "react";
import { useAuth } from "../../Contextos/AuthLoginLogout";

import "./index.css";

const Categoria = ({categoria, lista}) => {
    //coordenada o usuario e funcoes da tela
    const {deletaFavorito, registraFavorito} = useAuth();

    const [cat, setCat] = useState("");
    const [favoritos, setFavoritos] = useState([]);

    //coordena o nome e endereço do link
    const [nome, setNome] = useState("");
    const handleNomeChange = (e) => setNome(e.target.value);
    const [link, setLink] = useState("");
    const handleLinkChange = (e) => setLink(e.target.value);

    useEffect(()=>{
        setCat(categoria);
        setFavoritos(lista);
    }, [categoria, lista]);

    //coordena a ação de mostrar o campo de registro
    const [acao, setAcao] = useState(false);
    const handleAcaoChange = () => setAcao(!acao);

    //coordena a adição do favorito na lista
    const handleSubmit = (e) => {
        e.preventDefault();
        
        registraFavorito(cat, nome, link);
        //atualiza a lista
        
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
    
    return(
        <div className="categoria">
            <h2>{cat}</h2>
            {
                favoritos
                .filter(item => item.categoria == cat)
                .map((item) => (
                    <section key={item.id}>
                        <a href={item.link.startsWith("http") ? item.link : `http://${item.link}`} target="_blank">{item.nome}</a>
                        <button onClick={() => deletaFavorito(item.id)}>X</button>
                    </section>
                ))
            }
            <button className="registrar" onClick={handleAcaoChange}>+</button>
            {
            acao &&
                <div className="novoregistro">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="nome">Nome</label>
                            <input type="text" name="nome" id="nome" value={nome} onChange={handleNomeChange} ref={inputNomeRef} />
                        </div>
                        <div>
                            <label htmlFor="link">Link</label>
                            <input type="text" name="link" id="link" value={link} onChange={handleLinkChange} />
                        </div>
                        <input type="submit" value="Registrar" className="nrformsub" />
                    </form>
                </div>
            }
        </div>
    );
}

export default Categoria;