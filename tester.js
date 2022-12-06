const runTests = async (
  app,
  request,
  expect,
  tests,
  connection,
  seed,
  testData,
  isFirstTest
) => {
  if (isFirstTest) {
    console.log(
      "## Test Output\n\nRead through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.\n"
    );
  }
  if (tests.length === 0) return connection.end();
  const { endpoint, method, makeAssertion, hints, body, section } = tests[0];
  await seed(testData);
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject({
        message: "**ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**",
        timeout: true,
      });
    }, 2000);
  });
  const requestPromise = request(app)[method](endpoint).send(body);
  Promise.race([requestPromise, timeout])
    .then((res) => makeAssertion(res, expect))
    .catch((err) => {
      console.log(
        `### ${section.toUpperCase()} ${method.toUpperCase()} \`${endpoint}\`\n`
      );
      console.log(`Assertion: ${err.message}\n`);
      if (!err.timeout) {
        console.log("Hints:");
        hints.forEach((hint) => {
          console.log(`- ${hint}`);
        });
      }
      console.log("\n");
    })
    .then(() =>
      runTests(app, request, expect, tests.slice(1), connection, seed, testData)
    );
};

module.exports = runTests;
