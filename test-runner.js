const app_type = process.env.app_type;
const testsPath = `../../tests/${app_type}`;

const request = require("supertest");
const { expect } = require("chai");
const tests = require(testsPath);
const app = require("./app");
const runTests = require("../../tester");
const connection = require("./db/index");
const seed = require("./db/seeds/seed");
const testData = require("./db/data/test-data");

runTests(app, request, expect, tests, connection, seed, testData, true);
