import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

export default function useBlog(id) {
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['blogs', id],
    queryFn: async () => await blogService.get(id),
  })

  const updateBlogMutation = useMutation({
    mutationFn: async ({ id, blog }) => await blogService.update(id, blog),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['blogs', id] })
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
  })

  const addComment = useMutation({
    mutationFn: async ({ text }) => await blogService.addComment(id, text),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['blogs', id] })
    },
  })

  return {
    blog: result.data,
    isPending: result.isPending,
    isError: result.isError,
    updateBlog: (id, blog) => updateBlogMutation.mutate({ id, blog }),
    likeBlog: blog => updateBlogMutation.mutate({ id: blog.id, blog: { ...blog, likes: blog.likes + 1 } }),
    removeBlog: blog => removeBlogMutation.mutate({ id: blog.id }),
    addComment: text => addComment.mutate({ text }),
  }
}
