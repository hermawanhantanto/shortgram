import { FilterType } from "@/types";

export const leftSideBar = [
  {
    label: "Home",
    icon: "/assets/icons/home.svg",
    href: "/",
  },
  {
    label: "Community",
    icon: "/assets/icons/person.svg",
    href: "/community",
  },
  {
    label: "Saved",
    icon: "/assets/icons/star.svg",
    href: "/saved",
  },
  {
    label: "Tags",
    icon: "/assets/icons/link-2.svg",
    href: "/tags",
  },
  {
    label: "Upload",
    icon: "/assets/icons/upload.svg",
    href: "/upload-content",
  },
  {
    label: "Profile",
    icon: "/assets/icons/profile.svg",
    href: `/profile`,
  }
];

export const homeFilter: FilterType[] = [
  {
    id: 1,
    label: "Newest",
    value: "newest",
  },
  {
    id: 2,
    label: "Recommended",
    value: "recommended",
  },
  {
    id: 3,
    label: "Most Viewed",
    value: "most-viewed",
  },
  {
    id: 4,
    label: "Most Liked",
    value: "most-liked",
  },
  {
    id: 5,
    label: "Most Commented",
    value: "most-commented",
  },
];

export const commentsFilter: FilterType[] = [
  {
    id: 1,
    label: "Newest",
    value: "newest",
  },
  {
    id: 2,
    label: "Most Liked",
    value: "most-liked",
  },
];

export const usersFilter: FilterType[] = [
  {
    id: 1,
    label: "New Users",
    value: "new-users",
  },
  {
    id: 2,
    label: "Old Users",
    value: "old-users",
  },
  {
    id: 3,
    label: "Top Users",
    value: "top-users",
  },
  {
    id: 4,
    label: "Name",
    value: "name",
  },
];

export const savedFilter: FilterType[] = [
  {
    id: 1,
    label: "Most Viewed",
    value: "most-viewed",
  },
  {
    id: 2,
    label: "Most Liked",
    value: "most-liked",
  },
  {
    id: 3,
    label: "Most Commented",
    value: "most-commented",
  },
];

export const tagsFilter: FilterType[] = [
  {
    id: 1,
    label: "Most Popular",
    value: "most-popular",
  },
  {
    id: 2,
    label: "Newest",
    value: "newest",
  },
  {
    id: 3,
    label: "Name",
    value: "name",
  },
];
