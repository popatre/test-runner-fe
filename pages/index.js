import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();

    const handleNav = (e) => {
        e.preventDefault();
        router.push("/feedback/jonathan");
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Be Test Runner</title>
                <meta name="description" content="Backend test runner" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>BE Project Test Runner</h1>
                <form>
                    <label>
                        Name:
                        <input type="text" name="name" />
                    </label>
                    <label>
                        Github repo link:
                        <input type="text" name="repo" />
                    </label>
                    <label>
                        News or Games:
                        <input type="text" name="appType" />
                    </label>
                </form>
                <button onClick={handleNav}>Get Feedback</button>
            </main>
        </div>
    );
}
