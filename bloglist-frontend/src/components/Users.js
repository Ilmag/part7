import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const Users = ({ users, blogs, Link }) => {
    console.log(blogs)
    return (
        <div>
            <h2>Users</h2>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="center"
                                sx={{ backgroundColor: '#007acc', color: 'white' }}>
                                NAME
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ backgroundColor: '#007acc', color: 'white' }}>
                                BLOGS CREATED
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    {blogs.filter((blog) => blog.user[0].id === user.id).length}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Users
