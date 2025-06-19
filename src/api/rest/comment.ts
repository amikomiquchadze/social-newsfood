import client from "../client";

export const deleteComment = async (commentId: number) => {
  const response = await client.post("/Comment/Delete", {
    CommentID: commentId,
  });

  return response.data;
};
