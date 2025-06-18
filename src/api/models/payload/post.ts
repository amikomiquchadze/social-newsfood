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

  
  export interface CreatePostPayload {
    Content: string;
    FilesJson?: string;
  }
  
  export interface Base64FileDto {
    FileName: string;
    FileType: string;
    FileData: string;
    FileSize: number;
  }