import Posts from '../../data/Blog/Posts';
import MuiMarkdown from 'mui-markdown';

export default async function BlogHome () {
  const Post = (await Posts())[0];
  const content = await Post.loadContent();

  return (
    <>
      <h1>{ Post.title }</h1>
      <span>Hello from &apos;{ Post.slug }&apos;</span>
      <p>{ Post.created.toLocaleDateString() } | { Post.updated?.toLocaleDateString() }</p>
      <MuiMarkdown>{ content }</MuiMarkdown>
    </>
  );
}
