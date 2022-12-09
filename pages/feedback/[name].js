import { useState, useEffect, useContext } from "react";
import ReactMarkdown from "react-markdown";
import ReactLoading from "react-loading";
import styles from "../../styles/Name.module.css";
import { RequestContext } from "../../context/RequestContext";
import { deleteEvaluationFolder, runTests } from "../../api/apiFunctions";
import Errors from "../../components/Errors";

function Feedback() {
    const { request } = useContext(RequestContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingText, setLoadingText] = useState("cloning repo...");
    const [feedback, setFeedback] = useState(``);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const { name, repo, appType } = request;

        runLoadingText();
        runTests(name, repo, appType)
            .then((res) => {
                if (res.isError) {
                    setIsError(true);
                    setIsLoading(false);
                }
                setFeedback(res.feedback);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err, "working???");
            });

        return () => {
            deleteEvaluationFolder();
        };
    }, []);

    const runLoadingText = () => {
        const messages = [
            "cloning repo...",
            "cloning repo...",
            "setting up dbs...",
            "installing dependencies...",
            "installing dependencies...",
            "running tests...",
            "running tests...",
            "running more tests...",
            "writing feedback file...",
            "still writing the file...",
            "Almost done...",
            "still going...",
            "still, still going",
            "still, still, still going",
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
                    height={"10em"}
                    width={"10em"}
                />
                <p>{loadingText}</p>
            </div>
        );

    if (isError) return <Errors message="Oh no - Something went wrong " />;
    return (
        <div className={styles.container}>
            <ReactMarkdown>{feedback}</ReactMarkdown>
        </div>
    );
}

export default Feedback;
