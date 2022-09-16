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
      description: "Load testing Get To-do app",
    },
  });

  const createResponse = http.post(baseUrl, createPayload, params);
  const id = createResponse.json().id;
  const getUrl = `http://localhost:3000/api/v1/todos/${id}`;
  const getResponse = http.get(getUrl, params);

  check(getResponse, {
    "status is 200": (response) => response.status === 200,
  });
}
