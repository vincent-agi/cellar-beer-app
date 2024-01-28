export interface Beer {
    id?: string,
    filepath: string;
    webviewPath?: string;
    name?: string;
    mark?: number;
    comments?: string;
    favorite: boolean;
    type: string;
    degree: number;
  }