import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import { Profile } from './Profile'

import clsx from 'clsx';
import { AllRoutesList } from 'src/routes'
export const logoUrl = process.env.REACT_APP_LOGO_URL;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        appbar: {
            backgroundColor: '#fff',
            color: '#000',
            boxShadow: 'none',
            border: '1px solid rgba(0, 0, 0, 0.12)'
        },
        menu: {
            height: '100vh',
            width: '100%'
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        drawer: {
            // paddingTop: '56px'

        },
        link: {
            color: '#666',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            textDecoration: 'none',
            minWidth: '150px',
            padding: theme.spacing(1, 2)
        },
        logo: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            textAlign: 'center',
            boxSizing: 'border-box',
            "& img": {
                // width: '10px',
                height: '36px'
            }
        },
        logoP: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '30px',
            boxSizing: 'border-box',
            "& img": {
                // width: '10px',
                height: '46px'
            }
        },
        linkP: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            textDecoration: 'none',
            minWidth: '150px',
            padding: '10px 30px',
            color: '#666',
            "&:hover": {
                backgroundColor: '#EBF2FF'
            }
        },
        active: {
            color: theme.palette.primary.main
        },
        contant: {
            overflowY: 'scroll',
            height: '70vh'
        }
    }),
);


export const MenuInHeader: React.FC = () => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    const location = useLocation();
    const menuList = AllRoutesList.filter(e => e.ismenu);


    return <>
        <AppBar position="static" className={classes.appbar} >
            <Toolbar>
                <IconButton onClick={() => setOpen(!open)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Z ORG
                 </Typography>
                <Drawer anchor={'left'} open={open} onClose={() => setOpen(false)}>
                    <div className={classes.drawer}>
                        <div className={classes.logo} >
                            <IconButton onClick={() => setOpen(!open)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <img src={logoUrl} alt="" />
                        </div>
                        <Divider></Divider>
                        {menuList.map(e => <Link key={e.path} className={clsx(classes.link, {
                            [classes.active]: e.path === location.pathname
                        })} onClick={e => setOpen(false)} to={e.path}>
                            {e.icon}&nbsp;&nbsp;&nbsp;{e.name}
                        </Link>)}
                    </div>
                </Drawer>
            </Toolbar>
        </AppBar>

    </>
};


export const MenuInHome: React.FC = () => {
    const classes = useStyles();
    const location = useLocation();
    const menuList = AllRoutesList.filter(e => e.ismenu);
    return <div className={classes.menu}>
        <div className={classes.logoP} >
            <img src={logoUrl} alt="" />
        </div>
        <Profile></Profile>
        <div className={classes.contant}>
            {menuList.map(e => <Link key={e.path} className={clsx(classes.linkP, {
                [classes.active]: e.path === location.pathname
            })} to={e.path}>
                {e.icon}&nbsp;&nbsp;&nbsp;{e.name}
            </Link>)
            }
        </div>
    </div >
};
