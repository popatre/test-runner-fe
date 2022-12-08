import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import ReactLoading from "react-loading";
import styles from "../../styles/Name.module.css";

function Feedback() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingText, setLoadingText] = useState("cloning repo...");
    const [feedback, setFeedback] = useState(``);
    useEffect(() => {
        runLoadingText();
        axios.get(`http://localhost:3000/api/test`).then((res) => {
            setFeedback(res.data.feedback);
            setIsLoading(false);
        });
    }, []);

    const runLoadingText = () => {
        const messages = [
            "setting up dbs...",
            "installing dependencies...",
            "running tests...",
            "writing feedback file...",
            "still writing the file...",
            "Almost done...",
            "still going...",
            "blame github",
        ];
        let i = -1;
        setInterval(() => {
            i++;
            setLoadingText(messages[i]);
        }, 2200);
    };

    if (isLoading)
        return (
            <div className={styles.loading}>
                <ReactLoading
                    type={"cubes"}
                    color={"black"}
                    height={"20%"}
                    width={"20%"}
                />
                <p>{loadingText}</p>
            </div>
        );
    return (
        <div className={styles.container}>
            <ReactMarkdown>{feedback}</ReactMarkdown>
        </div>
    );
}

export default Feedback;
