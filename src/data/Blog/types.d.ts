export type LinksMappedByDate = {
  year: string,
  months: {
    month: string,
    posts: {
      title: string,
      slug: string,
    }[],
  }[],
};
