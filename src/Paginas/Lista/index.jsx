import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contextos/AuthLoginLogout";

//importe o estilo local
import "./index.css";

const Lista = () => {
    //coordenada o usuario e funcoes da tela
    const {user, registraTarefa, lista = [], deletaTarefa, loadingLista} = useAuth();
    const navigate = useNavigate();

    //coordena a adição do tarefa na lista
    const handleSubmit = (e) => {
        e.preventDefault();
        
        registraTarefa(tarefa);
        //atualiza a lista
        
        setTarefa("");
        handleAcaoChange();
    }

    //coordena item
    const [tarefa, setTarefa] = useState("");
    const handleTarefaChange = (e) => setTarefa(e.target.value);

    //coordena a ação de mostrar o campo de registro
    const [acao, setAcao] = useState(false);
    const handleAcaoChange = () => setAcao(!acao);

    //referencia para o input texto do form
    const inputTarefaRef = useRef();
    useEffect(()=>{
        if(acao == true){
            inputTarefaRef.current.focus();
        }
    }, [acao]);

    //verifica se estou logado, se não estiver vai para o inicio
    useEffect(()=>{
        if(!user){
            navigate("/");
        }
    }, []);

    return(
        <section>
        {
            loadingLista ? ( 
                <h1 className="titulo">Carregando sua lista...</h1> 
            ) : lista.length ? ( 
                <>
                    <h1 className="titulo">Lista de tarefas:</h1>
                    <ul>
                        {
                            lista.map((item) => (
                                <li key={item.id}>-{item.nome}<button onClick={() => deletaTarefa(item.id)}>X</button></li>
                            ))
                        }
                    </ul>
                </>
            ) : ( 
                <h1 className="titulo">Sua lista de tarefas está vazia</h1> 
            )
        }
        <button className="registrar" onClick={handleAcaoChange}>+</button>
        {
            acao &&
            <div className="novoregistro">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="tarefa">Tarefa</label>
                    <input type="text" name="tarefa" id="tarefa" value={tarefa} onChange={handleTarefaChange} ref={inputTarefaRef} />
                    <input type="submit" value="Registrar" className="nrformsub" />
                </form>
            </div>
        }
        </section>
    );
}

export default Lista;