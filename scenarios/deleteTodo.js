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
      description: "Load testing Delete To-do app",
    },
  });

  const createResponse = http.post(env.baseUrl, createPayload, params);
  const id = createResponse.json().id;
  const deleteUrl = `${env.baseUrl}/${id}`;
  const deleteResponse = http.del(deleteUrl, null, params);

  check(deleteResponse, {
    "status is 200": (response) => response.status === 200,
  });
}
