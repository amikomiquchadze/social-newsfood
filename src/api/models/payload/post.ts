export interface PostFile {
    PostFileID: number;
    FileName: string;
    FileType: string;
    FileUrl: string;
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