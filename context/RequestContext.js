import { createContext, useState } from "react";

export const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
    const [request, setRequest] = useState({ name: "", repo: "", appType: "" });

    return (
        <RequestContext.Provider value={{ request, setRequest }}>
            {children}
        </RequestContext.Provider>
    );
};
