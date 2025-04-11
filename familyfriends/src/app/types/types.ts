export type Pet = {
  id: string;
  name: string;
  age: string;
  breeds: {
    primary: string;
  };
  primary_photo_cropped?: {
    small: string;
  };
};
