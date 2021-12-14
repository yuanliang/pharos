import Post from './Post'

const PostsList = (props: any) => {
  const { onEditPost, onDeletePost, posts } = props
  return (
    <ul>
      {posts.forEach((post: any) => (
        <Post onEditPost={onEditPost} onDeletePost={onDeletePost} key={post.ID} post={post} />
      ))}
    </ul>
  )
}

export default PostsList
