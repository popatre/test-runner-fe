export const runLoadingText = (setLoadingText) => {
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
