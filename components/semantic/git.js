import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Typography, TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Paper } from "@mui/material";
import { useEffect, useState } from 'react';



function Git(props) {

    const [commits, setCommit] = useState([]);

    useEffect(() => {
        if (props.githubApiResponse) {
            setCommit(() => props.githubApiResponse.data);
        }
    }, [])

    return (
        <>
            <Grid container display="flex" justifyContent="center" alignItems="center" className="git-main-wrapper">
                <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h2" className="git-title">
                        Git software development updates
                    </Typography>
                </Grid>
                <Grid xs={12} display="flex" justifyContent="center" alignItems="flex-end">
                    <Typography variant="subtitle1" color="white" borderBottom={1}>
                        Design / Frontend
                    </Typography>
                </Grid>
                <Grid xs={12} md={10} display="flex" justifyContent="center" alignItems="center" >
                    <TableContainer component={Paper} sx={{ minWidth: 320, maxHeight: 600 }} m="auto">
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="bold-class">Commit message</TableCell>
                                    <TableCell className="bold-class" align="right">Author</TableCell>
                                    <TableCell className="bold-class" align="right">Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {commits.map(({ sha, commit }) => (
                                    <TableRow variant="head" key={sha} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell variant="head" component="th" scope="row">
                                            {commit.message}
                                        </TableCell>
                                        <TableCell variant="head" align="right">{commit.author.name}</TableCell>
                                        <TableCell variant="head" align="right">{commit.author.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid xs={12} display="flex" justifyContent="center" alignItems="flex-start">
                    <Typography variant="subtitle1" color="white" borderBottom={1}>
                        Database / Backend
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}



export default Git;