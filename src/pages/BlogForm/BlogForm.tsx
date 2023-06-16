import { Box, Button, FormControl, Input, TextareaAutosize, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addBlog, getSingleBlog, updateBlog } from '../../blog.api';
import { FormInputs } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function BlogForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormInputs>()
  const { blogId = '' } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!blogId) return;
    const fetchBlog = async () => {
      const data = await getSingleBlog(blogId)

      setValue('title', data.title)
      setValue('createdBy', data.createdBy)
      setValue('content', data.content)
    }
    fetchBlog()
  }, [])

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (blogId) {
      await updateBlog(blogId, data)
    } else {
      await addBlog(data)
    }
    localStorage.removeItem("blogs")
    navigate('/')
  }

  return (
    <Box sx={{ width: 'auto', padding: '2rem', margin: 'auto' }}>
      <Button sx={{ mb: 2 }} href={'/'}>Home</Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{ width: '100%', gap: '1rem', alignItems: "stretch" }}>
          <Box sx={{ width: '100%' }}>
            <Typography variant='body1'>Title</Typography>
            <Input sx={{ width: '100%' }} id="title" {...register("title", { required: true })} placeholder="Blog title" />
            {errors.title && <span>This field is required</span>}
          </Box>

          <Box sx={{ width: '100%' }}>
            <Typography variant='body1'>Author</Typography>
            <Input sx={{ width: '100%' }} id="createdBy" {...register("createdBy", { required: true })} placeholder="Blog author" />
            {errors.createdBy && <span>This field is required</span>}
          </Box>

          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body1'>Content</Typography>
            <TextareaAutosize minRows={10} id="content" {...register("content", { required: true })} placeholder="Blog content" />
            {errors.content && <span>This field is required</span>}
          </Box>

          <Button type="submit" sx={{ alignSelf: 'center' }}>Submit</Button>
        </FormControl>
      </form>
    </Box>
  );
}
