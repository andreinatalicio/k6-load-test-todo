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
      description: "Load testing Get To-do app",
    },
  });

  const createResponse = http.post(env.baseUrl, createPayload, params);
  const id = createResponse.json().id;
  const getUrl = `${env.baseUrl}/${id}`;
  const getResponse = http.get(getUrl, params);

  check(getResponse, {
    "status is 200": (response) => response.status === 200,
  });
}
