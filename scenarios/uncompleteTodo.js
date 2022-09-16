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
      description: "Load testing Uncomplete To-do app",
    },
  });

  const createResponse = http.post(baseUrl, createPayload, params);
  const id = createResponse.json().id;
  const completeUrl = `http://localhost:3000/api/v1/todos/${id}/complete`;
  http.put(completeUrl, null, params);

  const uncompleteUrl = `http://localhost:3000/api/v1/todos/${id}/uncomplete`;
  const uncompleteResponse = http.put(uncompleteUrl, null, params);

  check(uncompleteResponse, {
    "status is 200": (response) => response.status === 200,
  });
}
