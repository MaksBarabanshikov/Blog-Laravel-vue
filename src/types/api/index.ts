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
