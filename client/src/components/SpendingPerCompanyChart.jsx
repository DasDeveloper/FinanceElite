import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import {ResponsivePie} from "@nivo/pie"
import axios from "axios"
import { useContext } from 'react'
import { SessionAPIContext } from '../contexts/SessionAPIContext'
import { backgroundColor } from '../theme'

const SpendingPerCompanyChart = () => {

    const userInfo = useContext(SessionAPIContext)
    const [dataGraph, setDataGraph] = useState([])
    const colors = backgroundColor;


  useEffect(()=>{

    getData()

  },[])

  const getData = async () =>{

    await axios.post('/api/transaction/getAllCompaniesLatestTwoWeeks', {
        userID: userInfo.userID
    }).then(res =>{
        
        if(res.data.status ===400){
            alert('User ID not found. Contact administrator.')
            return;
        }
        setDataGraph(res.data.value)
    })
  }

  return (
    <>
    {dataGraph.length ===0 ? (<div className='text-3xl text-dark-text text-center m-auto my-auto'>No data found</div>):(<></>)}
    <ResponsivePie
    data={dataGraph}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                0.2
            ]
        ]
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor={colors['dark-text']}
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                2
            ]
        ]
    }}
    defs={[
        {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true
        },
        {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
        }
    ]}
    fill={[
        {
            match: {
                id: 'ruby'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'c'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'go'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'python'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'scala'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'lisp'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'elixir'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'javascript'
            },
            id: 'lines'
        }
    ]}
    legends={[
        {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: colors['dark-text']
                    }
                }
            ]
        }
    ]}
/>
</>
  )
}

export default SpendingPerCompanyChart