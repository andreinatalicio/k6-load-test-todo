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
      description: "Load testing Update To-do app",
    },
  });

  const createResponse = http.post(env.baseUrl, createPayload, params);
  const id = createResponse.json().id;
  const updateUrl = `${env.baseUrl}/${id}`;
  const updatedPayload = JSON.stringify({
    todo: {
      description: "Load testing To-do item updated",
    },
  });

  const updateResponse = http.put(updateUrl, updatedPayload, params);

  check(updateResponse, {
    "status is 200": (response) => response.status === 200,
  });
}
