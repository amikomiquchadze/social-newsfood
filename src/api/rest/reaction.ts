import client from "../client";

export const getReactionTypes = async () => {
  const response = await client.post("/Post/ReactionTypesGet", {});
  return response.data;
};
