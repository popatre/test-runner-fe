import { useRouter } from "next/router";
import styles from "../styles/Errors.module.css";

export default function Errors(props) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/`);
    };

    return (
        <div className={styles.container}>
            <p>{props.message}</p>
            <button className={styles.btn} onClick={handleClick}>
                Back to safety
            </button>
        </div>
    );
}
