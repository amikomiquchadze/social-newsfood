import client from "../client";
import { API_TOKEN } from "./comment";

export const getReactionTypes = async () => {
  const response = await client.post(
    '/Post/ReactionTypesGet',
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "X-Token": API_TOKEN,
      },
    }
  );
  return response.data;
};