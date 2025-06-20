export interface Comment {
  CommentID: number;
  ParentCommentID: number | null;
  PostID: number;
  AuthorID: number;
  AuthorFirstName: string;
  AuthorLastName: string;
  AuthorAvatar?: string | null;
  Content: string;
  CreateTime: string;
  IsAuthor: boolean;
  TotalReactions: number;
  TotalReplies: number;
  UserReaction: string | null;
  Reactions: Record<string, number>;
  Comments: Comment[];
}