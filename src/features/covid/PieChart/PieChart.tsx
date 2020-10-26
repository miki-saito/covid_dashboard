import React from 'react'
import { Typography } from "@material-ui/core"
import { Doughnut } from "react-chartjs-2"

import { useSelector } from "react-redux"
import { selectData } from "../covidSlice"

const PieChart:React.FC = () => {
    // まず、useSelectorを使ってデータを取得する
    const data = useSelector(selectData)
    // 致死率は、　感染者数が存在する場合（&&）、致死率/感染者数*100　で求める
    const motality = data.confirmed && (100 * data.deaths.value) / data.confirmed.value

    // PieChartの実体　データが存在する場合（&&）にグラフを表示
    const pieChart = data && (
        <Doughnut
            data = {{
               labels: ["Infected", "Recovered", "Deaths"],
               datasets: [
                   {
                    data:[
                        data.confirmed.value,
                        data.recovered.value,
                        data.deaths.value,
                    ],
                    backgroundColor: [
                        "rgba(0, 0, 255, 0.5)",
                        "#008080",
                        "rgba(255,0,0,0.5)",
                    ],
                    hoverBackgroundColor: ["#36a2eb", "#3cb371", "#ff6384"],
                    borderColor: ["transparent","transparent","transparent",]
                   },
               ],
           }}
        //    判例はグラフの下に表示させる
           options={{
               legend: {
                   position:"bottom",
                   labels: {
                       boxWidth: 15,
                   },
               },
           }}
        />
    )

    return (
        <>
        {/* データが存在する場合、致死率の小数点第二位まで表示する */}
        {data.confirmed && (
            <Typography align="center" color="textSecondary" gutterBottom>
                Motarity {data.confirmed && motality.toFixed(2)} [%]
            </Typography>
        )}
        {pieChart}
        </>
    )
}

export default PieChart
