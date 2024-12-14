export type BlogParams = {
  params: Promise<{ postSlug: string | undefined }>,
}

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
