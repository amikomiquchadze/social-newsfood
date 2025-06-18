export interface Post {
    PostID: number;
    Content: string | null;
    AuthorID: number;
    AuthorFirstName: string;
    AuthorLastName: string;
    AuthorAvatarUrl?: string | null;
    TotalReactions: number;
    TotalComments: number;
    LastReactorUserID?: number | null;
    LastReactionAuthor?: string | null;
    UserReaction?: string | null;
    CreateTime: string;
    PostFiles: PostFile[];
    Reactions: Reactions;
  }

  
export interface PostFile {
    PostFileID: number;
    FileName: string;
    FileType: string;
    FileUrl: string;
  }
  
  export interface Reactions {
    LIKE: number;
    LOVE: number;
    LAUGH: number;
    WOW: number;
    SAD: number;
    ANGRY: number;
  }