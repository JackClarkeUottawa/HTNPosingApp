
export interface PostPicturesReqBody{
  success: Boolean,
  imageSTR: String;
}

export interface responseBody{
  success: Boolean,
  score: number
  errorMessage?: String 
  

}

export interface headerFormat{
  
    (name: "set-cookie"): string[] | undefined;
  (name: string): string | undefined;
  jwt: string

}
