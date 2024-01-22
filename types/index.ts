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

export interface GetAllCommentsContent {
  contentId: string;
}

export interface LikeContentParams {
  contentId: string;
  userId: string;
  hasLiked: boolean;
  path: string;
}
export interface LikeCommentParams {
  commentId: string;
  userId: string;
  hasLiked: boolean;
  path: string;
}

export interface SaveContentParams {
  contentId: string;
  userId: string;
  hasSaved: boolean;
  path: string;
}
