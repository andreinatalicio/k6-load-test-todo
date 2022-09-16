import http from "k6/http";
import { check } from "k6";

export default function () {
  const baseUrl = "http://localhost:3000/api/v1/todos";

  const params = {
    headers: {
      "X-Access-Token": "SvApamX6TMa2SUBfFpx8XeJNTbBQk9SSE9hZ",
      "Content-Type": "application/json",
    },
  };

  const createPayload = JSON.stringify({
    todo: {
      description: "Load testing List Uncompleted To-do app",
    },
  });

  http.post(baseUrl, createPayload, params);
  const listUncompledteUrl = `http://localhost:3000/api/v1/todos?status=uncompleted`;
  const listUncompletedResponse = http.get(listUncompledteUrl, params);

  check(listUncompletedResponse, {
    "there are to-do items uncompleted": (response) =>
      response.json().todos[0].completed_at === null,
  });
}
