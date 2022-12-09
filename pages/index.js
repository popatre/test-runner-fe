import Head from "next/head";
import styles from "../styles/Home.module.css";

import Form from "../components/Form";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Be Test Runner</title>
                <meta name="description" content="Backend test runner" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>BE Project Test Runner</h1>
                <Form />
            </main>
        </div>
    );
}
