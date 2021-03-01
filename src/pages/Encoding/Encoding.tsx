import React from 'react';
import { createStyles, makeStyles, Theme, } from '@material-ui/core/styles';
import DefaultLayout from 'src/layout/DefaultLayout'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        }
    }))
export const Encoding: React.FC = () => {
    const classes = useStyles()
    return <DefaultLayout >
        <div className={classes.root}></div>
    </DefaultLayout >
};


export const ENCODING_URL = '/url-encoding'

