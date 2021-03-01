import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Hidden } from '@material-ui/core'
import { MenuInHeader, MenuInHome } from 'src/components/HomeMenu'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: theme.spacing(0, 4),
            [theme.breakpoints.down("xs")]: {
                padding: 0,
            }
        },
        menu: {
            display: 'flex',
            justifyContent: 'center',
            // alignItems: 'center'
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',

        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        content: {
            height: '100vh',
            overflow: 'scroll'
        }

    }),
);

const DefaultLayout: React.FC = (props) => {
    const classes = useStyles()
    return <>
        <Hidden smUp>
            <MenuInHeader></MenuInHeader>
        </Hidden>
        <Grid container className={classes.root}>
            <Hidden xsDown>
                <Grid className={classes.menu} item sm={4} md={4} lg={3}>
                    <MenuInHome></MenuInHome>
                </Grid>
            </Hidden>
            <Grid className={classes.content} item xs={12} sm={8} md={7} lg={9}>
                {props.children}
            </Grid>
        </Grid>
    </>
};


export default DefaultLayout