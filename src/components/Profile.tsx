import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Avatar, Typography, Fade, } from '@material-ui/core'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLogin } from 'src/pages/Login/_store/index'

// import { postLogOut } from 'src/pages/Login/_res-api'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            display: 'flex',
            paddingLeft: '30px',
            marginBottom: '15px',
            marginTop: '15px',
        },
        info: {
            marginLeft: '10px',
            flexGrow: 1,
        },
        title: {
            width: '100%',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '16px',
            textTransform: 'capitalize'
        },
        uid: {
            fontSize: '12px',
            color: '#828282'
        }
    }),
);




export const Profile: React.FC = () => {
    const classes = useStyles();
    // const dispatch = useDispatch();
    const { user } = useSelector(selectLogin);

    const { userInfo } = user;
    // const handleLogout = async () => {
    //     const respone: any = await postLogOut({
    //         token: userInfo.token
    //     })
    //     if (respone.code === 0)
    //         dispatch(updateUserInfo({}));
    // }
    // const handlePushProfile = async () => {
    //     const respone: any = await postLogOut({
    //         token: userInfo.token
    //     })
    //     if (respone.code === 0)
    //         dispatch(updateUserInfo({}));
    // }

    return Boolean(user.uid) ?
        <Fade in={Boolean(user.uid)}>
            <div className={classes.root}>
                <div >
                    <Avatar src={userInfo?.avatarUrl || userInfo?.email} alt={userInfo?.avatarUrl || userInfo?.email}></Avatar>
                </div>
                <div className={classes.info}>
                    <Link to="/profile">
                        <Typography variant="body1" className={classes.title}>{userInfo?.nickName || userInfo?.email.split('@')[0]}</Typography>
                    </Link>
                    <Typography variant="body1" className={classes.uid}>@{user.uid.slice(0, 6)}</Typography>
                </div>
            </div >
        </Fade> : null



};
