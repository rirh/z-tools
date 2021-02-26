import React from 'react';
import { Paper, Grid, Typography, Hidden } from '@material-ui/core'
import DefaultLayout from 'src/layout/DefaultLayout'
import HomeIcon from '@material-ui/icons/Home';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '30px'
        },
        header: {
            textAlign: 'center',
            width: '100%',
            height: '72px',
            lineHeight: '72px',
            "& .MuiTypography-root": {
                fontSize: '22px',
                color: 'black',
                fontWeight: 'bold'
            }
        },
        paper: {
            backgroundColor: '#fff',
            padding: theme.spacing(1, 2),
            transition: "all 200ms ease-in-out",
            "&:hover": {
                transform: "scale(1.1)",
            },
        }

    }))
export const Home: React.FC = () => {
    const classes = useStyles()
    return <DefaultLayout>
        <Grid container className={classes.root}>
            <Hidden xsDown>
                <Grid className={classes.header}>
                    <Typography >Home</Typography>
                </Grid>
            </Hidden>

            <Grid container spacing={5} >
                <Grid item xs={12} sm={4} md={4} lg={3}>
                    <Paper className={classes.paper} variant="outlined" >111</Paper >
                </Grid>

                <Grid item xs={12} sm={4} md={4} lg={3}>
                    <Paper className={classes.paper} variant="outlined" >111</Paper >
                </Grid>

                <Grid item xs={12} sm={4} md={4} lg={3}>
                    <Paper className={classes.paper} variant="outlined" >111</Paper >
                </Grid>

                <Grid item xs={12} sm={4} md={4} lg={3}>
                    <Paper className={classes.paper} variant="outlined" >111</Paper >
                </Grid>


            </Grid>
        </Grid>

    </DefaultLayout>
};


export const HOME_URL = '/'

export const HOME_ICON = <HomeIcon></HomeIcon>