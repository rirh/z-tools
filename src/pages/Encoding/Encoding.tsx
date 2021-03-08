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
        <div className={classes.root}>
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl flex items-center space-x-4">
                <div className="flex-shrink-0">
                </div>
                <div>
                    <div className="text-xl font-medium text-black">ChitChat</div>
                    <p className="text-gray-500">You have a new message!</p>
                </div>
            </div>
        </div>
    </DefaultLayout >
};


export const ENCODING_URL = '/url-encoding'

