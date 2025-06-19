import client from "../client";
export interface CurrentUser {
  UserID: number;
  FirstName: string;
  LastName: string;
  AvatarUrl?: string;
}

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
  try {
    const response = await client.post<CurrentUser>("/User/Get", {});

    return response?.data;
  } catch (error) {
    console.error("Failed to fetch current user", error);
    return null;
  }
};
