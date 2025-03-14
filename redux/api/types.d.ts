import { ImageSourcePropType } from "react-native";

export type SignInType = {
  credential: { email: string; password: string };
  remember_me: boolean;
};
export type SignInResponseType = {
  status: string;
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  token: string;
};

export type SignUpType = {
  credential: {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
  };
  remember_me: boolean;
};
export type SignUpResponseType = {
  status: string;
  message: string;
};

export type UploadMusicType = {
  user: string;
  title: string;
  album: string;
  description: string;
  genre: string[];
  releaseYear: number;
  album_art: ImageSourcePropType;
  audio: string;
};
export type UploadMusicResponseType = {
  status: string;
  message: string;
};
