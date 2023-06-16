import { Box, Button, Modal, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { deleteBlog, getSingleBlog } from '../../blog.api';
import { BlogDto } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

export default function BlogDetail() {
  const [blog, setBlog] = useState<BlogDto>({
    id: '',
    title: '',
    content: '',
    createdBy: '',
    createdAt: ''
  })
  const [open, setOpen] = useState(false)
  const { blogId = '' } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await getSingleBlog(blogId)
      setBlog(data)
    }
    fetchBlog()
  }, [])

  const closeModal = () => setOpen(false);

  const handleDelete = async () => {
    await deleteBlog(blogId)
    localStorage.removeItem("blogs")
    navigate('/')
  }

  return (
    <Box sx={{ width: 'auto', padding: '2rem' }}>
      <Paper sx={{ width: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', minHeight: '80vh', gap: '1rem' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button href={'/'}>Home</Button>
          <Box>
            <Button href={`/${blogId}/edit`}>Edit</Button>
            <Button onClick={() => setOpen(true)}>Delete</Button>
          </Box>
        </Box>
        <Typography variant='h1' sx={{ alignSelf: 'center' }}>{blog?.title}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', alignSelf: 'center' }}>
          <Typography variant='subtitle1'>Author: {blog?.createdBy}</Typography>
          <Typography variant='subtitle1'>Created at: {(new Date(blog?.createdAt)).toLocaleString()}</Typography>
        </Box>
        <Typography variant='body1'>{blog?.content}</Typography>
      </Paper>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Blog
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this blog ?
          </Typography>
          <Box>
            <Button onClick={closeModal}>Close</Button>
            <Button onClick={handleDelete}>Confirm</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
