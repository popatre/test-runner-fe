import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

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
        ];
        let i = -1;
        setInterval(() => {
            i++;
            setLoadingText(messages[i]);
        }, 1500);
    };

    if (isLoading) return <p>{loadingText}</p>;
    return (
        <div>
            This is feedback
            <ReactMarkdown>{feedback}</ReactMarkdown>
        </div>
    );
}

export default Feedback;
