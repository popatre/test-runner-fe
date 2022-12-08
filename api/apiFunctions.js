import axios from "axios";

const coreApi = axios.create({
    baseURL: "http://localhost:3000/api",
});

export const runTests = (name, repo, type) => {
    return coreApi
        .get("/test", {
            params: { name, repo, type },
        })
        .then((res) => {
            return res.data;
        });
};

export const deleteEvaluationFolder = () => {
    return coreApi.get("/delete");
};
