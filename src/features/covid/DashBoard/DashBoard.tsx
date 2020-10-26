import React, { useEffect } from 'react'
import styles from "./DashBoard.module.css"
import { makeStyles } from "@material-ui/core/styles"
import { AppBar, Toolbar, Typography, Container, Grid, 
    // Card,
 } from "@material-ui/core"

// reduxStoreから、useSelectoreを使い、selectDataを参照。
import { useSelector } from "react-redux"
// dispatchを使い、 fetchAsyncGet（グローバルな感染者数）、fetchAsyncGetDaily（グローバルの時系列データ）を取得。
import { useDispatch } from "react-redux"

import { fetchAsyncGet, fetchAsyncGetDaily, selectData} from "../covidSlice"
import SwitchCountry from '../SwitchCountry/SwitchCountry'
import Chart from '../Chart/Chart'
import PieChart from '../PieChart/PieChart'
import Cards from '../Cards/Cards'

const useStyles = makeStyles((theme) => ({
    title: {
        // 要素が一個の時、横の倍率が100％になる
        flexGrow: 1,
    },
    content: {
        marginTop: 85,
    },
}))

const DashBoard: React.FC= () => {
    const classes = useStyles()
    //  dispatchの実体
    const dispatch = useDispatch()
    // reduxStoreの中のデータを取得し、dataに格納
    const data = useSelector(selectData)

    useEffect(() => {
        dispatch(fetchAsyncGet())
        dispatch(fetchAsyncGetDaily())
    }, [dispatch])

    return (
        <div>
            <AppBar position="absolute">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Covid 19 Live Dashboard
                    </Typography>
                    {data && (
                        <Typography variant="body1">
                            {new Date(data.lastUpdate).toDateString()}
                        </Typography>
                    )}
                </Toolbar>
            </AppBar>
            <Container className={classes.content}>
                <div className={styles.container}>
                    <SwitchCountry />
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={7}>
                        <Chart />
                    </Grid>

                    <Grid item xs={12} md={5}>
                         <PieChart />
                     </Grid>

                     <Grid item xs={12} md={12}>
                         <Cards />
                     </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default DashBoard
