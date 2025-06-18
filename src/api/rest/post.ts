import client from "../client";
import { CreatePostPayload } from "../models/payload/post";
import { Post } from "../models/response/post";
import { API_TOKEN } from "./comment";

export const createPost = async (payload: CreatePostPayload): Promise<Post> => {
  const response = await client.post<Post>("/Post/Create", payload, {
    headers: {
      "Content-Type": "application/json",
      "X-Token": API_TOKEN,
    },
  });
  return response.data;
};

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await client.post<Post[]>(
    "/Post/GetAll",
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

export const deletePost = async (postId: number): Promise<void> => {
  await client.post(
    "/Post/Delete",
    {
      PostID: postId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Token": API_TOKEN,
      },
    }
  );
};
export const reactToPost = async (
  postId: number,
  reactionType: string
): Promise<void> => {
  await client.post(
    "/Post/ReactionToggle",
    {
      PostID: postId,
      ReactionType: reactionType,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Token": API_TOKEN,
      },
    }
  );
};

export const updatePost = async (
  postId: number,
  content: string
): Promise<void> => {
  await client.post(
    "/Post/Update",
    {
      PostID: postId,
      Content: content,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Token": API_TOKEN,
      },
    }
  );
};
