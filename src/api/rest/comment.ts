import client from "../client";
import { CreateCommentPayload } from "../models/payload/comment";

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

export const createReply = async (commentId: number, content: string) => {
  const response = await client.post("/Comment/ReplyCreate", {
    CommentID: commentId,
    Content: content,
  });
  return response.data;
};
