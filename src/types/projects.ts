export interface ProjectsResponse {
  data: ProjectMeta[];
  links: PaginationLinks;
  meta: Meta;
}

export interface ProjectMeta {
  project: Project;
  links: Links;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  header_image: string;
  tagline: string;
  description: string;
  author: string;
  youtube?: string;
  screenshots: string[];
  spotlight: number;
  isValidated: number;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Links {
  self: string;
  collection: string;
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: unknown;
  next: string;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}
