import http from "k6/http";
import { check } from "k6";
import { env } from "./../env.js";

export const options = {
  vus: env.vus,
  duration: env.duration,
};

export default function () {
  const params = {
    headers: {
      "X-Access-Token": env.apiToken,
      "Content-Type": env.contentType,
    },
  };

  const createPayload = JSON.stringify({
    todo: {
      description: "Load testing List Uncompleted To-do app",
    },
  });

  http.post(env.baseUrl, createPayload, params);
  const listUncompledteUrl = `${env.baseUrl}?status=uncompleted`;
  const listUncompletedResponse = http.get(listUncompledteUrl, params);

  check(listUncompletedResponse, {
    "there are to-do items uncompleted": (response) =>
      response.json().todos[0].completed_at === null,
  });
}
