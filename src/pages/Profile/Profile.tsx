import React, { useState, useEffect } from 'react';
import { Grid, Hidden, Typography, Avatar, TextField, IconButton, Chip, Button } from '@material-ui/core'
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
import { postLogOut } from 'src/pages/Profile/_res-api'
import { updateUserInfo } from 'src/pages/Login/_store'
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
        }
    }))

export const Profile: React.FC = () => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const { user } = useSelector(selectLogin);
    const { userInfo } = user;
    useEffect(() => {
        if (!userInfo) {
            history.push(LOGIN_URL)
        } else {
            setEmail(userInfo?.email)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo])
    const handleCopy = () => {
        dispatch(updateNotice({ open: true, message: '复制成功！', severity: 'success' }))
    }
    const handleLogout = async () => {
        const respone: any = await postLogOut({
            token: userInfo.token
        })
        if (respone.code === 0)
            dispatch(updateUserInfo({}));
    }

    return <DefaultLayout>
        <Grid container className={classes.root}>
            <Hidden xsDown>
                <Grid className={classes.header}>
                    <Typography >Profile</Typography>
                </Grid>
            </Hidden>
            <Grid className={classes.item} container spacing={1} alignItems="center">
                <Grid item className={classes.label}>
                    头像
                </Grid>
                <Grid item className={classes.value}>
                    <Grid className={`${classes.avatar} ${classes.item}`} container spacing={1} alignItems="center">
                        <Grid item>
                            <Avatar className={classes.large} src={userInfo?.avatarUrl || userInfo?.email} alt={userInfo?.avatarUrl || userInfo?.email}></Avatar>
                        </Grid>
                        <Grid item>
                            <input
                                accept="image/*"
                                className={classes.uploadInput}
                                id="contained-button-file"
                                multiple
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
                    邮箱
                </Grid>
                <Grid item className={classes.value} >
                    <TextField size="small" style={{ width: '80%' }} onChange={(e) => { setEmail(e.target.value) }} value={email} id="outlined-basic" variant="filled" />
                </Grid>
            </Grid>
            <Grid className={classes.item} container spacing={1} alignItems="center">
                <Grid item className={classes.label}>
                    邀请码
                </Grid>
                <Grid item className={classes.value} >
                    {userInfo?.my_invite_code}
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
                    {userInfo?.role.map((item: string, i: number) => <Chip color="primary" key={i} label={item} />)}
                </Grid>
            </Grid>
            <Grid className={classes.item} container spacing={1} alignItems="center">
                <Button variant="contained" color="primary" onClick={handleLogout} >退出登录</Button>
            </Grid>
        </Grid>

    </DefaultLayout>
};


export const PROFILE_URL = '/profile'

