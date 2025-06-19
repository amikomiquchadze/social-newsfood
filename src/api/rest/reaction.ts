import client from "../client";

export const getReactionTypes = async () => {
  const response = await client.post("/Post/ReactionTypesGet", {});
  return response.data;
};

//this is a reusable method
export const getReactors = async (
  id: number,
  path: string,
  payloadProperty: string
) => {
  const response = await client.post(`/${path}/ReactorGetAll`, {
    [payloadProperty]: id,
  });
  return response.data.Reactors;
};

export const reactToggle = async (
  postId: number,
  reactionType: string
): Promise<void> => {
  await client.post("/Post/ReactionToggle", {
    PostID: postId,
    ReactionType: reactionType,
  });
};

export const getCommentReactors = async (postId: number) => {
  const response = await client.post("/Comment/ReactorGetAll", {
    PostID: postId,
  });
  return response.data.Reactors;
};

export const commentReactToggle = async (
  postId: number,
  reactionType: string
): Promise<void> => {
  await client.post("/Comment/ReactionToggle", {
    CommentID: postId,
    ReactionType: reactionType,
  });
};
