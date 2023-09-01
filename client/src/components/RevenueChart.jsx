import { ResponsiveLine } from '@nivo/line'
import React, { useContext, useEffect, useState } from 'react'
import { backgroundColor } from '../theme';
import axios from 'axios';
import { SessionAPIContext } from '../contexts/SessionAPIContext';
import Swal from "sweetalert2"
const RevenueChart = ({daysNumber}) => {
    const [revenueData, setRevenueData] = useState([]);
    const colors = backgroundColor;
    const userInfo = useContext(SessionAPIContext)

    const data =[
        {
            'id':'Revenue',
            "color": "hsl(271, 70%, 50%)",
            "data": revenueData
        }
    ]

    useEffect(()=>{

        getRevenueData()

    },[daysNumber])

    const theme = {
        "background": colors['dark-secondary'],
        "text": {
            "fontSize": 11,
            "fill": colors['dark-text'],
            "outlineWidth": 0,
            "outlineColor": "transparent"
        },
        "axis": {
            "domain": {
                "line": {
                    "stroke": "#777777",
                    "strokeWidth": 1
                }
            },
            "legend": {
                "text": {
                    "fontSize": 12,
                    "fill": colors['dark-text'],
                    "outlineWidth": 0,
                    "outlineColor": "transparent"
                }
            },
            "ticks": {
                "line": {
                    "stroke": colors['dark-text'],
                    "strokeWidth": 1
                },
                "text": {
                    "fontSize": 11,
                    "fill": colors['dark-text'],
                    "outlineWidth": 0,
                    "outlineColor": "transparent"
                }
            }
        },
        "grid": {
            "line": {
                "stroke": "#dddddd",
                "strokeWidth": 1
            }
        },
        "legends": {
            "title": {
                "text": {
                    "fontSize": 11,
                    "fill": colors['dark-text'],
                    "outlineWidth": 0,
                    "outlineColor": "transparent"
                }
            },
            "text": {
                "fontSize": 11,
                "fill": colors['dark-text'],
                "outlineWidth": 0,
                "outlineColor": "transparent"
            },
            "ticks": {
                "line": {},
                "text": {
                    "fontSize": 10,
                    "fill": colors['dark-text'],
                    "outlineWidth": 0,
                    "outlineColor": "transparent"
                }
            }
        },
        "annotations": {
            "text": {
                "fontSize": 13,
                "fill": "#333333",
                "outlineWidth": 2,
                "outlineColor": "#ffffff",
                "outlineOpacity": 1
            },
            "link": {
                "stroke": "#000000",
                "strokeWidth": 1,
                "outlineWidth": 2,
                "outlineColor": "#ffffff",
                "outlineOpacity": 1
            },
            "outline": {
                "stroke": "#000000",
                "strokeWidth": 2,
                "outlineWidth": 2,
                "outlineColor": "#ffffff",
                "outlineOpacity": 1
            },
            "symbol": {
                "fill": "#000000",
                "outlineWidth": 2,
                "outlineColor": "#ffffff",
                "outlineOpacity": 1
            }
        },
        "tooltip": {
            "container": {
                "background": "#ffffff",
                "fontSize": 12,
                'borderRadius':25
            },
            "basic": {},
            "chip": {},
            "table": {},
            "tableCell": {},
            "tableCellValue": {}
        }
    }

const getRevenueData = async () =>{
        await axios.post('/api/transaction/getAllRevenueCustomDays', {
            userID: userInfo.userID,
            daysNumber: daysNumber
        }).then(res =>{
            setRevenueData(res.data.value)
        }).catch(err =>{
            if(err.response.status ===429){
                Swal.fire({
                    title:"Slow down!",
                    text:`You're making too many requests. Try again later.`,
                    icon:'warning',
                    showConfirmButton: true,
                    confirmButtonColor: colors['dark-graph-red'],
                    confirmButtonText:'Ok',
                    background:colors['dark-main'],
                    color:colors['dark-text'], 
                })
            }
        })
    }
  return (
    <>
    {revenueData.length ===0 ? (<div className='text-3xl text-dark-text text-center m-auto my-auto'>No data found</div>):(<></>)}
    <ResponsiveLine
    data={data}
    theme={theme}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Date',
        legendOffset: 36,
        legendPosition: 'middle'
    }}
    axisLeft={{
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Amount ($)',
        legendOffset: -56,
        legendPosition: 'middle'
    }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                    }
                }
            ]
        }
    ]}
    
    >
        
    </ResponsiveLine>
    </>
  )
}

export default RevenueChart