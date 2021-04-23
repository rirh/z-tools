import React, { useState, useEffect, useRef } from 'react';
import { Grid, Hidden, Typography, Avatar, TextField, IconButton, Chip, Button, Backdrop, CircularProgress } from '@material-ui/core'
import { createStyles, makeStyles, Theme, } from '@material-ui/core/styles';
import { Edit, FileCopy } from '@material-ui/icons';
import * as dayjs from 'dayjs'
import { useHistory } from 'react-router'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { LOGIN_URL } from 'src/pages/Login/Login'
import DefaultLayout from 'src/layout/DefaultLayout'
import { useSelector, useDispatch } from 'react-redux'
import { selectLogin } from 'src/pages/Login/_store/index'
import { updateNotice } from 'src/app/app'
import { postLogOut, postGetUserInfo, postUpdateUserInfo } from 'src/pages/Profile/_res-api'
import { updateUserInfo } from 'src/pages/Login/_store'
import { getUserAvatar } from 'src/utils'

import axios from 'axios';
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
        large: {
            width: theme.spacing(9),
            height: theme.spacing(9),
        },
        item: {
            marginBottom: '20px',
            minHeight: '56px'
        },
        label: {
            width: '20%',
            maxWidth: '20%',
            flexBasis: '20%',
            textAlign: 'left',
            fontWeight: 'bold',
            color: '#333',
            fontSize: '16px'
        },
        value: {
            width: '75%',
            maxWidth: '75%',
            flexBasis: '75%',
            fontSize: '14px',

        },
        settingItem: {
            borderBottom: '1px solid #ddd'
        },
        uploadInput: {
            display: 'none'
        },
        avatar: {
            position: 'relative'
        },
        editUpload: {
            position: 'absolute',
            left: 50,
            top: 0,
            color: 'white',
            background: theme.palette.primary.dark,
            height: '16px',
            width: '16px',
            "& .MuiSvgIcon-root": {
                height: '16px',
                width: '16px',
            },
            "&:hover": {
                backgroundColor: '#36393f'
            }
        },
        copy: {
            marginLeft: theme.spacing(1),
            "& .MuiSvgIcon-root": {
                height: '16px',
                width: '16px',
            },
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
            "& img": {
                width: '50vw'
            }
        },
    }))

export const Profile: React.FC = () => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [avatar_url, set_avatar_url] = useState('');
    const { user } = useSelector(selectLogin);
    const [open, setOpen] = React.useState(false);
    const { userInfo } = user;
    const [logout_loading, set_logout_loading] = React.useState(false);
    const avatarFile = useRef(null)
    useEffect(() => {
        if (!user.uid) {
            history.push(LOGIN_URL)
        } else {
            setEmail(userInfo?.email)
            setUsername(userInfo?.username)
            postGetUserInfo({ uid: user.uid }).then((response: any) => {
                const nuser = JSON.parse(JSON.stringify(user))
                nuser.userInfo = response.userInfo
                dispatch(updateUserInfo(nuser));
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.uid])
    const handleCopy = () => {
        dispatch(updateNotice({ open: true, message: '复制成功！', severity: 'success' }))
    }
    const handleLogout = async () => {
        set_logout_loading(true)
        const respone: any = await postLogOut({
            token: userInfo.token
        })
        set_logout_loading(false)
        if (respone.code === 0)
            dispatch(updateUserInfo({}));
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        if (avatar_url || userInfo?.avatarUrl)
            setOpen(!open);
    };
    interface Event<T = EventTarget> {
        target: T;
    }

    const handleUpload = (event: Event) => {
        // console.log(avatarFile.current?.files)
        const [file] = (event.target as any)?.files;
        let formdata = new FormData()
        formdata.append('file', file, file.name)
        axios.post('https://crypto2server-576164.service.tcloudbase.com/upload', formdata, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': 'multipart/form-data;charset=UTF-8'
            }
        }).then(async ({ data }) => {
            set_avatar_url(data.fileList[0].download_url)
            await postUpdateUserInfo({
                uid: user.uid,
                avatarUrl: data.fileList[0].download_url
            })
        }).catch(err => {
            console.log(err)
        })
    }

    return <DefaultLayout>
        <Grid container className={classes.root}>
            <Hidden xsDown>
                <Grid className={classes.header}>
                    <Typography >Profile</Typography>
                </Grid>
            </Hidden>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <img src={avatar_url || userInfo?.avatarUrl} alt="" />
            </Backdrop>
            <Grid className={classes.item} container spacing={1} alignItems="center">
                <Grid item className={classes.label}>
                    头像
                </Grid>
                <Grid item className={classes.value}>
                    <Grid className={`${classes.avatar} ${classes.item}`} container spacing={1} alignItems="center">
                        <Grid item>
                            <Avatar onClick={handleToggle} className={classes.large} src={avatar_url || getUserAvatar(userInfo)} alt={getUserAvatar(userInfo)}></Avatar>
                        </Grid>
                        <Grid item>
                            <input
                                ref={avatarFile}
                                accept="image/*"
                                className={classes.uploadInput}
                                id="contained-button-file"
                                onChange={handleUpload}
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <IconButton className={classes.editUpload} color="primary" aria-label="upload picture" component="span">
                                    <Edit />
                                </IconButton>
                            </label>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className={classes.item} container spacing={1} alignItems="center">
                <Grid item className={classes.label}>
                    用户名
                </Grid>
                <Grid item className={classes.value} >
                    <TextField disabled={logout_loading} size="small" style={{ width: '350px' }} onChange={(e) => { setUsername(e.target.value) }} value={username} id="outlined-basic" />
                </Grid>
            </Grid>
            <Grid className={classes.item} container spacing={1} alignItems="center">
                <Grid item className={classes.label}>
                    邮箱
                </Grid>
                <Grid item className={classes.value} >
                    <TextField disabled={logout_loading} size="small" style={{ width: '350px' }} onChange={(e) => { setEmail(e.target.value) }} value={email} id="outlined-basic" />
                </Grid>
            </Grid>
            <Grid className={classes.item} container spacing={1} alignItems="center">
                <Grid item className={classes.label}>
                    邀请码
                </Grid>
                <Grid item className={classes.value} >
                    <Chip  label={userInfo?.my_invite_code}></Chip>
                    <CopyToClipboard text={userInfo?.my_invite_code} onCopy={handleCopy}>
                        <IconButton className={classes.copy} >
                            <FileCopy />
                        </IconButton>
                    </CopyToClipboard>
                </Grid>
            </Grid>
            <Grid className={classes.item} container spacing={1} alignItems="center">
                <Grid item className={classes.label}>
                    注册时间
                </Grid>
                <Grid item className={classes.value} >
                    {dayjs.unix(userInfo?.register_date / 1000).format('YYYY-MM-DD')}
                    <CopyToClipboard text={userInfo?.register_date} onCopy={handleCopy}>
                        <IconButton className={classes.copy} >
                            <FileCopy />
                        </IconButton>
                    </CopyToClipboard>
                </Grid>
            </Grid>
            <Grid className={classes.item} container spacing={1} alignItems="center">
                <Grid item className={classes.label}>
                    上次登录IP
                </Grid>
                <Grid item className={classes.value} >
                    {userInfo?.last_login_ip}
                    <CopyToClipboard text={userInfo?.last_login_ip} onCopy={handleCopy}>
                        <IconButton className={classes.copy} >
                            <FileCopy />
                        </IconButton>
                    </CopyToClipboard>
                </Grid>
            </Grid>
            <Grid className={classes.item} container spacing={1} alignItems="center">
                <Grid item className={classes.label}>
                    注册IP
                </Grid>
                <Grid item className={classes.value} >
                    {userInfo?.register_ip}
                    <CopyToClipboard text={userInfo?.register_ip} onCopy={handleCopy}>
                        <IconButton className={classes.copy} >
                            <FileCopy />
                        </IconButton>
                    </CopyToClipboard>
                </Grid>
            </Grid>
            <Grid className={classes.item} container spacing={1} alignItems="center">
                <Grid item className={classes.label}>
                    角色权限
                </Grid>
                <Grid item className={classes.value} >
                    {userInfo?.role.map((item: string, i: number) => <Chip color="secondary" style={{ marginRight: '10px' }} key={i} label={item} />)}
                </Grid>
            </Grid>
            <Grid className={classes.item} container spacing={1} alignItems="center">
                <Button variant="contained" color="primary" onClick={handleLogout} >
                    {logout_loading ? <CircularProgress style={{ color: 'white' }} size="1rem" /> : '退出登录'}
                </Button>
            </Grid>
        </Grid>

    </DefaultLayout>
};


export const PROFILE_URL = '/profile'

