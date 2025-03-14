import { createContext, useContext, useEffect, useState } from "react";
import { db, auth } from "../../Firebase/config"; 
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
  orderBy,
  getDocs,
  updateDoc
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

  //função que registra as novas categorias
  const registraCategoria = async (categoria) => {
    if (!user) return; // Garante que o usuário está autenticado

    try {
      await addDoc(collection(db, "categorias"), {
        usuario: user.uid, // ID do usuário autenticado  
        categoria: categoria,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  };

  //função que registra os novos favoritos
  const registraFavorito = async (categoria, nome, link) => {
    if (!user) return; // Garante que o usuário está autenticado

    try {
      await addDoc(collection(db, "registros"), {
        usuario: user.uid, // ID do usuário autenticado  
        categoria: categoria,
        nome: nome,
        link: link,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  };

  //função que retorna a lista de itens para o seu usuario
  const [lista, setLista] = useState([]); 
  const [loadingLista, setLoadingLista] = useState(true);
  const [categorias, setCategorias] = useState([]);
  //atualiza a lista sempre que houver uma mudança
  useEffect(() => {
    if (!user) {
      setLista([]);  
      setLoadingLista(false);
      return;
    }

    setLoadingLista(true);

    const q = query(
      collection(db, "registros"),
      where("usuario", "==", user.uid),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const lis = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      }));

      setLista(lis);
      setLoadingLista(false);
    });

    return () => {
      unsubscribe();
      setLoadingLista(true); // Reinicia o loading ao desinscrever
    };
  }, [user]);

  //atualiza as categorias sempre que houver uma mudança
  useEffect(() => {
    if (!user) {
      setCategorias([]);  
      return;
    }

    const q = query(
      collection(db, "categorias"),
      where("usuario", "==", user.uid),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cats = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      }));

      setCategorias(cats);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  //função que deleta um item do banco
  const deletaFavorito = async (id) => {
    try {
      await deleteDoc(doc(db, "registros", id));
    } catch (error) {
      console.error("Erro ao deletar registro:", error);
    }
  };


  //função que deleta um item do banco
  const deletaCategoria = async (categoriaId) => {
    try {
      // Verifica se o usuário está autenticado
      if (!user) {
        console.error("Usuário não autenticado.");
        return;
      }
  
      const q = query(
        collection(db, "registros"),
        where("categoria", "==", categoriaId),
        where("usuario", "==", user.uid) // Garante que só exclui os do usuário logado
      );
  
      const querySnapshot = await getDocs(q);
  
      // Deleta todos os registros que possuem essa categoria
      const deletePromises = querySnapshot.docs.map((docSnapshot) =>
        deleteDoc(doc(db, "registros", docSnapshot.id))
      );
  
      await Promise.all(deletePromises);
  
      // Agora deleta a categoria
      await deleteDoc(doc(db, "categorias", categoriaId));
    } catch (error) {
      console.error("Erro ao deletar categoria e registros:", error);
    }
  };


  //função que atualiza o registro que foi mudado de posição
  const atualizaRegistroTimestamp = async (id, novoTimestamp) => {
    try {
      if (!user) return;
  
      const registroRef = doc(db, "registros", id);
  
      await updateDoc(registroRef, {
        timestamp: novoTimestamp, // Usa o timestamp passado na função
      });
  
    } catch (error) {
      console.error("Erro ao atualizar o timestamp do registro:", error);
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, registraFavorito, registraCategoria, lista, deletaFavorito, deletaCategoria, categorias, loadingLista, atualizaRegistroTimestamp }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto mais facilmente
export const useAuth = () => useContext(AuthContext);
