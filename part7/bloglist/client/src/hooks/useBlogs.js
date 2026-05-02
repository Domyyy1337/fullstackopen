import { useMutation, useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs.js'

export default function useBlogs() {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
  })



  return {
    blogs: result.data,
    isPending: result.isPending,
    addBlog: blog => newBlogMutation.mutate(blog),

  }
}
