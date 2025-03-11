import styles from "./index.module.css";

const LinkFavorito = ({lfhref = "", lfnome = "", lfclick}) => {
    return(
        <a 
            href={lfhref} 
            target="_blank"
            onClick={() => lfclick()}
            className={styles.linka}
        >
            {lfnome}
        </a>
    );
}

export default LinkFavorito;