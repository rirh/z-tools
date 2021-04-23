import React from 'react';
import { useHistory } from 'react-router-dom'
import { Grid, Card, Typography, TextField, Button, CircularProgress } from '@material-ui/core'
import { createStyles, makeStyles, Theme, } from '@material-ui/core/styles';
import { postSignIn } from 'src/pages/Login/_res-api'
import { HOME_URL } from 'src/pages/Home/Home'

import { RootState } from 'src/app/store'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from 'src/pages/Login/_store'
import { updateNotice } from 'src/app/app'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100vh',
            width: '100vw',
            alignItems: 'center',
            justifyContent: 'center',
            [theme.breakpoints.down("xs")]: {
                alignItems: 'flex-start',
            },
        },
        signinCard: {
            width: '100%',
            boxShadow: '0px 0px 60px rgb(0 0 0 / 10%)',
            padding: theme.spacing(4, 5),
            borderRadius: '6px',
            textAlign: 'center',
            [theme.breakpoints.down("xs")]: {
                // marginTop: "35px",
                boxShadow: 'none',
                padding: 0,
            },
        },
        logo: {
            "& img": {
                height: '45px'
            },
            marginBottom: '36px',
            [theme.breakpoints.down("xs")]: {
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                padding: theme.spacing(3, 0),
            },
        },
        title: {
            "& .MuiTypography-root": {
                fontSize: '29px',
                color: 'black',
                fontWeight: 'bold',
            },
            marginBottom: '10px',
        },
        tips: {
            "& a": {
                textDecoration: 'underline'
            }
        },
        item: {
            width: '100%',
            boxSizing: 'border-box',
            padding: theme.spacing(.5, 4),
            '& button': {
                marginTop: theme.spacing(4)
            }
        }

    }))
export const Login: React.FC = () => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch();

    const [user, setUser] = React.useState('')
    const [pwd, setPwd] = React.useState('')
    const [loading, setLoading] = React.useState(false);

    const userInfo = useSelector((store: RootState) => store.login.user);
    const userid = userInfo.uid || '';
    React.useEffect(() => {
        if (userid) history.push(HOME_URL)
    }, [userid, history])

    const handleLogin = async () => {
        setLoading(true);
        try {
            const respone: any = await postSignIn({
                username: user,
                password: pwd,
            })
            setLoading(false);
            if (respone.code === 0) {
                dispatch(updateUserInfo(respone));
                history.push(HOME_URL)
            } else {
                dispatch(updateNotice({ open: true, message: respone.message || respone.msg, severity: 'error' }))
            }
        } catch (error) {

        }

    }
    return <>
        <Grid container className={classes.root} >
            <Grid item xs={12} sm={5} md={5} lg={5} >
                <Card className={classes.signinCard}>
                    <Grid className={classes.logo}>
                        <img src={process.env.REACT_APP_LOGO_URL} alt="" />
                    </Grid>
                    <Grid className={classes.title}>
                        <Typography >现在开始</Typography>
                    </Grid>
                    <Grid className={classes.tips}>
                        <Typography>没有账号?去
                        <a
                                href={process.env.REACT_APP_SINGNUP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >注册</a>
                        </Typography>
                    </Grid>
                    <br />
                    <Grid className={classes.item}>
                        <TextField disabled={loading} id="user" size="medium" inputProps={{ "autoComplete": 'off' }} value={user} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)} fullWidth placeholder="请输入邮箱" type="text" variant="outlined" />
                    </Grid>
                    <br />
                    <Grid className={classes.item}>
                        <TextField disabled={loading} id="pwd" size="medium" inputProps={{ "autoComplete": 'off' }} value={pwd} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)} fullWidth placeholder="请输入密码" type="password" variant="outlined" />
                    </Grid>
                    <Grid className={classes.item}>
                        <Button disabled={
                            !user ||
                            !pwd
                        } color={(user && pwd) ? "primary" : 'default'}
                            size="large"
                            variant="contained" onClick={handleLogin} fullWidth>
                            {loading ? <CircularProgress style={{ color: 'white' }} size="1rem" /> : '登录'}
                        </Button>
                    </Grid>
                    <br />
                </Card>
            </Grid>
        </Grid>

    </>
};


export const LOGIN_URL = '/signin'

