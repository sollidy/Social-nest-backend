export class ProfileModel {
  aboutMe: string | null;
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  userId: string;
  contacts: {
    facebook: string | null;
    github: string | null;
    instagram: string | null;
    mainLink: string | null;
    twitter: string | null;
    vk: string | null;
    website: string | null;
    youtube: string | null;
  };
  photos: {
    small?: string;
    large?: string;
  };
}
