import { useState, useEffect, useContext } from "react";
import ReactMarkdown from "react-markdown";
import ReactLoading from "react-loading";
import styles from "../../styles/Name.module.css";
import { RequestContext } from "../../context/RequestContext";
import { deleteEvaluationFolder, runTests } from "../../api/apiFunctions";
import Errors from "../../components/Errors";
import { runLoadingText } from "../../utils/runLoadingText";

function Feedback() {
    const { request } = useContext(RequestContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingText, setLoadingText] = useState("cloning repo...");
    const [feedback, setFeedback] = useState(``);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const { name, repo, appType, branch } = request;

        runLoadingText(setLoadingText);
        runTests(name, repo, appType, branch)
            .then((res) => {
                if (res.isError) {
                    setIsError(true);
                    setIsLoading(false);
                }
                setFeedback(res.feedback);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsError(true);
                setIsLoading(false);
            });

        return () => {
            deleteEvaluationFolder();
        };
    }, []);

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

    if (isError)
        return (
            <Errors message="Oh no - Something went wrong. Check that PSQL is running & the Evaluations folder is empty " />
        );
    return (
        <div className={styles.container}>
            <ReactMarkdown>{feedback}</ReactMarkdown>
        </div>
    );
}

export default Feedback;
