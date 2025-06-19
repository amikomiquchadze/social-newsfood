import client from "../client";
import { CreatePostPayload } from "../models/payload/post";
import { Post } from "../models/response/post";

export const createPost = async (payload: CreatePostPayload): Promise<Post> => {
  const response = await client.post<Post>("/Post/Create", payload);
  return response.data;
};

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await client.post<Post[]>("/Post/GetAll", {});
  return response.data;
};

export const deletePost = async (postId: number): Promise<void> => {
  await client.post("/Post/Delete", {
    PostID: postId,
  });
};
export const reactToPost = async (
  postId: number,
  reactionType: string
): Promise<void> => {
  await client.post("/Post/ReactionToggle", {
    PostID: postId,
    ReactionType: reactionType,
  });
};

export const updatePost = async (
  postId: number,
  content: string
): Promise<void> => {
  await client.post("/Post/Update", {
    PostID: postId,
    Content: content,
  });
};
