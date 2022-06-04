import Link from "next/link";
import styles from "../../styles/Home.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        <Link href="/">Hermes</Link>
      </h1>
      <ul className={styles.headerLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/metrics">Metrics Catalog</Link>
        </li>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
