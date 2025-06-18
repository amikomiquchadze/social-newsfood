import client from "../client";

export const API_TOKEN = "9D1F7897-BCF4-4E7B-81E4-5D8AC262C190";

export const deleteComment = async (commentId: number) => {
  const response = await client.post(
    "/Comment/Delete",
    {
      CommentID: commentId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Token": API_TOKEN,
      },
    }
  );

  return response.data;
};
