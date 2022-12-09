import { useState, useContext } from "react";
import styles from "../styles/Home.module.css";
import { RequestContext } from "../context/RequestContext";
import { useRouter } from "next/router";

function Form() {
    const { setRequest } = useContext(RequestContext);
    const [input, setInput] = useState({ name: "", repo: "", appType: "news" });
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => {
            return { ...prevInput, [name]: value };
        });
    };

    const isFormComplete = () => {
        return input.name && input.repo && input.appType;
    };

    const handleNav = (e) => {
        e.preventDefault();
        setRequest(input);
        router.push(`/feedback/${input.name}`);
    };
    return (
        <>
            <form className={styles.form}>
                <label>
                    Name (no spaces):
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Github repo link:
                    <textarea
                        rows="2"
                        type="text"
                        value={input.repo}
                        name="repo"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    App type:
                    <select name="appType" onChange={handleChange}>
                        <option disabled value>
                            {" "}
                            -- select an app type --{" "}
                        </option>
                        <option value="news">NC News</option>
                        <option value="games">NC Games</option>
                    </select>
                </label>
            </form>

            {isFormComplete() ? (
                <button
                    disabled={!isFormComplete()}
                    className={styles.button}
                    onClick={handleNav}
                >
                    Get Feedback
                </button>
            ) : null}
        </>
    );
}

export default Form;
