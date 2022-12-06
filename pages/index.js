import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
    useEffect(() => {
        // axios.get(`http://localhost:3000/api/clone`).then((res) => {
        //     console.log(res.data.feedback);
        // });
        //return () => add delete route
    }, []);

    const handleTest = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3000/api/test`).then((res) => {
            console.log(res.data.feedback);
        });
    };

    const handleClone = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3000/api/clone`).then((res) => {
            console.log("cloned successfully");
        });
    };

    const handleInstall = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3000/api/install`).then((res) => {
            console.log("installed successfully");
        });
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
                <button onClick={handleClone}>Clone</button>
                <button onClick={handleInstall}>Install</button>
                <button onClick={handleTest}>Test</button>
            </main>
        </div>
    );
}
