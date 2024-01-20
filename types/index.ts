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

export interface URLProps {
  params: {
    id: string;
  };
  searchParams: {
    page: string;
    q: string;
    filter: string;
  };
}

export interface GetContentByIdParams {
  id: string;
}

export interface CreateCommentParams {
  description: string;
  author: string;
  path: string;
  contentId: string;
}
