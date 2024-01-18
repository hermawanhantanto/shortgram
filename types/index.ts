export interface FilterType {
  id: number;
  label: string;
  value: string;
}

export interface CreateContentParams {
  caption: string;
  author: string;
  image: string;
  tags: string[];
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string | null;
  email: string;
  picture: string;
}
export interface UpdateUserParams {
  clerkId: string;
  updateData: {
    name: string;
    username: string | null;
    email: string;
    picture: string;
  };
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}
