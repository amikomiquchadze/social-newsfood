import client from "../client";

export interface CreateCommentPayload {
  PostID: number;
  Content: string;
}

export const createComment = async (data: CreateCommentPayload) => {
  const response = await client.post("/Comment/Create", data);
  return response.data;
};

export const getCommentsByPostId = async (postId: number) => {
  const response = await client.post("/Comment/GetAll", { PostID: postId });
  return response.data;
};

export const deleteComment = async (commentId: number) => {
  const response = await client.post("/Comment/Delete", {
    CommentID: commentId,
  });

  return response.data;
};
