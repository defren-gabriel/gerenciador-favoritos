import { createContext, useContext, useEffect, useState } from "react";
import { db, auth } from "../../Firebase/config"; // Verifique se o caminho está correto
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { 
  collection, 
  addDoc,
  query, 
  where, 
  onSnapshot,
  deleteDoc, 
  doc,
  serverTimestamp,
  orderBy
} from "firebase/firestore";

// Criando o contexto
const AuthContext = createContext();

// Criando o provider do contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efeito para verificar se o usuário já está logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Função de login
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user; // Retorna o usuário autenticado
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      throw error;
    }
  };
  

  // Função de registro (signup)
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user; // Retorna o usuário registrado
    } catch (error) {
      console.error("Erro ao registrar usuário:", error.message);
      throw error;
    }
  };  

  // Função de logout
  const logout = async () => {
    try {
      await signOut(auth);  // Realiza o logout
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
      throw error;
    }
  };

  //função que registra os items de compra
  const registraTarefa = async (nome) => {
    if (!user) return; // Garante que o usuário está autenticado

    try {
      await addDoc(collection(db, "tarefas"), {
          nome: nome,
          usuario: user.uid, // ID do usuário autenticado
          timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  };

  //função que retorna a lista de itens para o seu usuario
  const [lista, setLista] = useState([]); 
  const [loadingLista, setLoadingLista] = useState(true);
  //atualiza a lista sempre que houver uma mudança
  useEffect(() => {
    if (!user) {
      setLista([]);  
      setLoadingLista(false);
      return;
    }

    setLoadingLista(true);

    const q = query(
      collection(db, "tarefas"),
      where("usuario", "==", user.uid),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tarefas = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      }));

      setLista(tarefas);
      setLoadingLista(false);
    });

    return () => {
      unsubscribe();
      setLoadingLista(true); // Reinicia o loading ao desinscrever
    };
}, [user]);

  //função que deleta um item do banco
  const deletaTarefa = async (id) => {
    try {
      await deleteDoc(doc(db, "tarefas", id));
      console.log("Tarefa deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, registraTarefa, lista, deletaTarefa, loadingLista }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto mais facilmente
export const useAuth = () => useContext(AuthContext);
