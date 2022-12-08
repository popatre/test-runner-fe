import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
    const router = useRouter();
    const [input, setInput] = useState({ name: "", repo: "", appType: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => {
            return { ...prevInput, [name]: value };
        });
    };

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
                <form className={styles.form}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Github repo link:
                        <input
                            type="text"
                            value={input.repo}
                            name="repo"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        App type:
                        {/* <input type="text" name="appType" /> */}
                        <select name="appType" onChange={handleChange}>
                            <option disabled selected value>
                                {" "}
                                -- select an app type --{" "}
                            </option>
                            <option value="news">NC News</option>
                            <option value="games">NC Games</option>
                        </select>
                    </label>
                </form>
                <button className={styles.btn} onClick={handleNav}>
                    Get Feedback
                </button>
            </main>
        </div>
    );
}
