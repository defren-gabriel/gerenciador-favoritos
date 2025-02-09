import {useState, useEffect, useRef} from "react";
import { useAuth } from "../../Contextos/AuthLoginLogout";

import "./index.css";

const Categoria = ({categoria, categoriaid, lista}) => {
    //coordenada o usuario e funcoes da tela
    const {deletaFavorito, registraFavorito, deletaCategoria} = useAuth();

    const [cat, setCat] = useState("");
    const [catid, setCatid] = useState("");
    const [favoritos, setFavoritos] = useState([]);

    //coordena o nome e endereço do link
    const [nome, setNome] = useState("");
    const handleNomeChange = (e) => setNome(e.target.value);
    const [link, setLink] = useState("");
    const handleLinkChange = (e) => setLink(e.target.value);

    useEffect(()=>{
        setCat(categoria);
        setCatid(categoriaid);
        setFavoritos(lista);
    }, [categoria, categoriaid, lista]);

    //coordena a ação de mostrar o campo de registro
    const [acao, setAcao] = useState(false);
    const handleAcaoChange = () => setAcao(!acao);

    //coordena a adição do favorito na lista
    const handleSubmit = (e) => {
        e.preventDefault();
        
        registraFavorito(cat, nome, link);
        
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

    return(
        <div className="categoria">
            <div className="cat">
                <h2>{cat}</h2>
                <button className="apagar" onClick={()=>handleDelChange()}>-</button>
                {
                    del && <button className="apagar" onClick={()=>deletaCategoria(catid, cat)}>Apagar a categoria</button>
                }
            </div>
            <div className="grupo">
                {
                    favoritos
                    .filter(item => item.categoria == cat)
                    .map((item) => (
                        <div className="link" key={item.id}>
                            <a href={item.link.startsWith("http") ? item.link : `http://${item.link}`} target="_blank">{item.nome}</a>
                            {
                                del && <button onClick={() => deletaFavorito(item.id)}>X</button>
                            }
                        </div>
                    ))
                }
            </div>
            <button className="registrar" onClick={handleAcaoChange}>+</button>
            {
            acao &&
                <form onSubmit={handleSubmit}>
                    <div className="campo">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" name="nome" id="nome" value={nome} onChange={handleNomeChange} ref={inputNomeRef} />
                    </div>
                    <div className="campo">
                        <label htmlFor="link">Link</label>
                        <input type="text" name="link" id="link" value={link} onChange={handleLinkChange} />
                    </div>
                    <input type="submit" value="Registrar" className="nrformsub" />
                </form>
            }
        </div>
    );
}

export default Categoria;