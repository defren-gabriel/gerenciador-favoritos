import styles from "./Atalhos.module.css";

const Atalhos = ({lista = []}) => {

    //faz o scroll para as ancoras
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return(
        <div className={styles.container}>
            <h2 className={styles.titulo}>Atalhos para categorias</h2>
            <div className={styles.grupobotao}>
            {
                lista.map((item) => (
                    <button 
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={styles.botao}
                    >
                        {item.categoria}
                    </button>
                ))
            }
            </div>
        </div>
    );
}

export default Atalhos;