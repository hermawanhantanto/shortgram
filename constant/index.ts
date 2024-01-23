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
]
