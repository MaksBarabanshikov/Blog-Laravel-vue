export interface IAccessToken {
  name: string;
  abilities: string[];
  tokenable_id: number;
  tokenable_type: string;
  updated_at: Date;
  created_at: Date;
  id: number;
}

export interface ITokenResponse {
  accessToken: IAccessToken;
  plainTextToken: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at?: any;
  created_at: Date;
  updated_at: Date;
}

export interface IMostCommented {
  id: number;
  title: string;
  preview: string;
  description: string;
  thumbnail: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: any;
  comments_count: number;
}
