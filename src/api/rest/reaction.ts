import client from "../client";

export const getReactionTypes = async () => {
  const response = await client.post("/Post/ReactionTypesGet", {});
  return response.data;
};

export const getReactors = async (postId: number) => {
  const response = await client.post("/Post/ReactorGetAll", { PostID: postId });
  return response.data.Reactors;
};