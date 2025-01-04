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
