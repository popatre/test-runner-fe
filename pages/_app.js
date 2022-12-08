import { RequestProvider } from "../context/RequestContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <RequestProvider>
            <Component {...pageProps} />
        </RequestProvider>
    );
}

export default MyApp;
