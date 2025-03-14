import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {useAuth} from "../../Contextos/AuthLoginLogout";

import styles from "./index.module.css";

const ConfigurarCategoria = () => {
    const [verificando, setVerificando] = useState(false);
    const {user, lista, atualizaRegistroTimestamp, deletaCategoria, deletaFavorito} = useAuth();
    const navigate = useNavigate();

    //verifica se o usuario esta logado
    useEffect(() => {
        if(!user){
            navigate("/");
        }
        else {
            setVerificando(true);
        }
    }, []);

    //pega o nome e id da categoria
    const {categoria, categoriaid} = useParams();

    //pega os itens selecionados para alteração
    const [itemsselecionados, setItemsselecionados] = useState([]);
    const [timeStamps, setTimeStamps] = useState([]);
    const handleAddItemsselecionados = (item) => {
        if(itemsselecionados.length <= 1){
            setItemsselecionados((prev) => [...prev, item]);
            setTimeStamps((prev) => [item.timestamp, ...prev]);
        }
        else{
            setItemsselecionados([]);
            setTimeStamps([]);
        }
    }
    //faz a atualização da posição dos registros selecionados quando dois registros são selecionados
    useEffect(() => {
        //executa a atualização dos registros com os novos timestamps
        if(timeStamps.length == 2){
            for(let i =0;i< timeStamps.length;i++){
                atualizaRegistroTimestamp(itemsselecionados[i].id, timeStamps[i]);
            }

            //apaga os itens selecionados
            setItemsselecionados([]);
            setTimeStamps([]);
        }
    }, [timeStamps]);

    //funções que manipulam a remoção de categoria completa e de registros individuais
    const handleDeleteCategoria = () => {
        const confirm = window.confirm("Deletar a categoria juntos com todos os registros? ");
        if(confirm){
            deletaCategoria(categoriaid);
        }
    }
    const handleDeleteRegistro = (id) => {
        const confirm = window.confirm("Deletar o registro?");
        if(confirm){
            deletaFavorito(id);
        }
    }

    //metodo que retornar à pagina principal
    const handleInicio = () => {
        navigate("/lista");
    }

    return(
        <section className={styles.container}>
            <button 
                onClick={() => handleInicio()}
                className={styles.retornar}
            >
                Tela principal
            </button>
            <h1 className={styles.titulo1}>Configurar os elementos para a categoria {categoria}</h1>
            {
                verificando ? 
                <>
                    <button 
                        onClick={() => handleDeleteCategoria()}
                        className={styles.delcat}
                    >
                        Deletar esta categoria e todos os seus registros
                    </button>
                    <h2 className={styles.titulo2}>Favoritos</h2>
                    <div className={styles.grupo}>
                    {
                        lista
                        .filter((item) => String(item.categoria) == String(categoriaid))
                        .map((item, i) => (
                            <div 
                                key={item.id}
                                className={styles.item}
                            >
                                <strong className={styles.nome}>{item.nome}</strong>
                                <div className={styles.ginput}>
                                    <label 
                                        htmlFor={i}
                                        className={styles.label}
                                    >
                                        Trocar
                                    </label>
                                    <input
                                        id={i}
                                        type="checkbox"
                                        checked={itemsselecionados.includes(item)}
                                        onChange={() => handleAddItemsselecionados(item)}
                                        className={styles.check}
                                    />
                                </div>
                                <button 
                                    onClick={() => handleDeleteRegistro(item.id)}
                                    className={styles.delreg}
                                >
                                    Deletar
                                </button>
                            </div>
                        ))
                    }
                    </div>
                </>
                :
                <h1>Carregando os dados</h1>
            }
        </section>
    );
}

export default ConfigurarCategoria;