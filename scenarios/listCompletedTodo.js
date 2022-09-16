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
      description: "Load testing List Completed To-do app",
    },
  });

  const createResponse = http.post(env.baseUrl, createPayload, params);
  const id = createResponse.json().id;
  const completeUrl = `${env.baseUrl}/${id}/complete`;
  http.put(completeUrl, null, params);
  const listCompletedUrl = `${env.baseUrl}?status=completed`;
  const listCompletedResponse = http.get(listCompletedUrl, params);

  check(listCompletedResponse, {
    "there are to-do items completed": (response) =>
      response.json().todos[0].completed_at != null,
  });
}
