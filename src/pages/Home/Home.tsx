import React from 'react';
import { Paper, Grid, Typography, Hidden, Avatar } from '@material-ui/core'
import DefaultLayout from 'src/layout/DefaultLayout'
import HomeIcon from '@material-ui/icons/Home';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ENCODING_URL } from 'src/pages/Encoding/Encoding'
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '30px',
            [theme.breakpoints.down("xs")]: {
                padding: theme.spacing(3, 2),
                "& .MuiGrid-item": {
                    padding: theme.spacing(1, 3),
                }
            }
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
            transition: "all 200ms ease-in-out",
            minWidth: '215px',
            cursor: 'pointer',
            width: '100%',
            userSelect: 'none',
            display: 'flex',
            border: 'none',
            color: '#333',
            backgroundColor: '#f4f4f4',
            "& .MuiAvatar-root": {
                backgroundColor: '#f4f4f4',
            },
            "&:hover": {
                backgroundColor: '#eee',
                color: '#000'
            },
            "&:hover .MuiAvatar-root": {
                backgroundColor: '#eee',
                color: '#000'
            },
            [theme.breakpoints.down("xs")]: {
                "&:hover": {
                    backgroundColor: '#f4f4f4',
                    color: '#333',
                },
            }
        },
        rounded: {
            height: '4rem',
            width: '4rem',
            color: '#333',
            display: 'grid',
            placeItems: 'center',
            fontSize: '1.8rem',
            borderRadius: '3px',
            filter: 'grayscale(-1.2)',
            fontWeight: 'bold',
            "& img": {
                height: '28px',
                width: '28px'
            }
        },
        flow: {
            flex: 1,
            marginLeft: theme.spacing(1.5)
        },
        cardTitle: {
            fontSize: '18px',
            fontWeight: 'bold',
            marginTop: '7px',
        },
        carDesc: {
            fontSize: '13px',
            marginTop: '5px',
            color: '#666',
        },
        link: {
            textDecoration: 'none'
        }
    }))

export const Home: React.FC = () => {
    const classes = useStyles()
    interface Carde {
        name?: string
        title: string,
        desc: string,
        avatar?: string,
        url: string

    }
    const cardlist: Array<Carde> = [{
        title: 'Bing',
        desc: '清新简洁的搜索平台',
        url: 'https://cn.bing.com/',
        avatar: "https://cn.bing.com/sa/simg/favicon-2x.ico"
    }, {
        title: 'Netease Music',
        desc: '网易云音乐',
        url: 'https://music.163.com/',
        avatar: "https://s1.music.126.net/style/favicon.ico?v20180823"
    },
    {
        title: 'Tencent Music',
        desc: 'QQ 音乐',
        url: 'https://y.qq.com/',
        avatar: "https://y.qq.com/favicon.ico"
    },
    {
        title: 'Iqiyi',
        desc: '爱奇艺',
        url: 'https://www.iqiyi.com/',
        avatar: "https://www.iqiyi.com/favicon.ico"
    },
    {
        title: 'bilibili',
        desc: '(゜-゜)つロ 干杯~',
        url: 'https://www.bilibili.com/',
        avatar: "https://www.bilibili.com/favicon.ico?v=1"
    },
    {
        title: 'Tencent',
        desc: '腾讯视频',
        url: 'https://v.qq.com/',
        avatar: "https://v.qq.com/favicon.ico"
    }, {
        title: 'URL Encoding',
        desc: '编码与解码',
        url: ENCODING_URL,
    },
    {
        title: 'Undraw',
        desc: 'svg 网站',
        url: 'https://undraw.co/search',
        avatar: "https://undraw.co/favicon.ico"
    },
    {
        title: 'Runoob',
        desc: '工具箱子',
        url: 'https://c.runoob.com/',
        avatar: "https://www.runoob.com/favicon.ico"
    },
    {
        title: 'Devtool',
        desc: 'Devtool 前端工具',
        url: 'https://devtool.tech/',
        avatar: "https://devtool.tech/favicon.ico"
    },
    ];
    return <DefaultLayout>
        <Grid container className={classes.root}>
            <Hidden xsDown>
                <Grid className={classes.header}>
                    <Typography >Home</Typography>
                </Grid>
            </Hidden>

            <Grid container spacing={5} >
                {cardlist.map(e => <Grid key={e.title} item xs={12} sm={6} md={4} lg={4}>
                    <a
                        href={e.url}
                        target={e.url.startsWith('http') ? '_blank' : ''}
                        rel="noopener noreferrer"
                        className={classes.link}
                    >
                        <Paper className={classes.paper} variant="outlined" >
                            <Avatar variant="rounded" className={classes.rounded} src={e.avatar} alt={e.title}>
                                {e.title[0]}
                            </Avatar>
                            <div className={classes.flow}>
                                <div className={classes.cardTitle}>
                                    {e.title}
                                </div>
                                <div className={classes.carDesc}>
                                    {e.desc}
                                </div>
                            </div>
                        </Paper >
                    </a>
                </Grid>)}
            </Grid>
        </Grid>

    </DefaultLayout>
};


export const HOME_URL = '/'

export const HOME_ICON = <HomeIcon></HomeIcon>