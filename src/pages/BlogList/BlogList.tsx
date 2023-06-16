import { Box, Button, FormControl, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllBlogs, searchBlog } from '../../blog.api';
import { BlogDto, Data, HeadCell, Order } from '../../types';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

const headCells: readonly HeadCell[] = [
  {
    id: 'title',
    label: 'Title',
  },
  {
    id: 'createdBy',
    label: 'Author',
  },
  {
    id: 'createdAt',
    label: 'Created At'
  }
];

type SearchInput = {
  text: string
}

export default function BlogList() {
  const [list, setList] = useState<BlogDto[]>([])
  const [order, setOrder] = useState<Order>('asc');
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchInput>()

  const orderBy = 'createdAt'

  useEffect(() => {
    const localBlogs = localStorage.getItem('blogs')

    if (localBlogs) {
      setList(JSON.parse(localBlogs))
    } else {
      const fetchBlogs = async () => {
        const blogs = await getAllBlogs()
        setList(blogs)
        localStorage.setItem("blogs", JSON.stringify(blogs))
      }
      fetchBlogs()
    }
  }, [])

  const handleSort =
    (property: keyof Data) => () => {
      if (property !== orderBy) { return };
      setList(list.sort((a: BlogDto, b: BlogDto) => {
        if (order === 'asc') {
          return (a.createdAt > b.createdAt) ? -1 : 1
        } else {
          return (a.createdAt < b.createdAt) ? -1 : 1
        }
      }))
      setOrder(order === 'asc' ? 'desc' : 'asc');
    };

  const onSubmit: SubmitHandler<SearchInput> = async (data) => {
    const result = await searchBlog(data.text)
    setList(result)
  }

  return (
    <Box sx={{ width: 'auto', padding: '2rem' }}>
      <Box sx={{ display: 'flex', justifyContent: "space-between", mb: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Input id="text" {...register("text", { required: true })} placeholder="Search blog" />
              {errors.text && <span>This field is required</span>}
            </Box>

            <Button type="submit">Search</Button>
          </FormControl>
        </form>
        <Button href='/add-blog'>Add Blog</Button>
      </Box>
      <Paper sx={{ width: 'auto' }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={handleSort(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/${row.id}`)}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align='left'
                    >
                      {row.title}
                    </TableCell>
                    <TableCell align="left">{row.createdBy}</TableCell>
                    <TableCell align="left">{(new Date(row.createdAt)).toLocaleString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
