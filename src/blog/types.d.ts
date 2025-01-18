import { ReactNode } from 'react';

export type BlogParams = {
  params: Promise<{ postSlug: string }>,
}

export type BlogLayoutParams = { children: ReactNode } & BlogParams;

export type Post = {
  content?: string,
  created: Date,
  slug: string,
  title: string,
  updated?: Date,
}

export type PartialPostMeta = {
  created?: string,
  slug?: string,
  title?: string,
  updated?: string,
};

export type PostMeta = {
  created: string,
  slug: string,
  title: string,
  updated?: string,
};

export type LinksMappedByDatePost = {
  title: string,
  slug: string,
};

export type LinksMappedByDateMonth = {
  month: string,
  monthIndex: number,
  posts: LinksMappedByDatePost[]
};

export type LinksMappedByDate = {
  year: number,
  months: LinksMappedByDateMonth[],
};
