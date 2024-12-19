import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { child, get, ref } from 'firebase/database'
import { database } from 'src/firebase'
import dynamic from 'next/dynamic'
import Grid from '@mui/material/Grid'

// ** Custom Component Import
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'
import { Card } from '@mui/material'

// Dynamically import ApexCharts to prevent SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

function Dashboard() {
  const dashboardQuery = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const dbRef = ref(database)
      const result = await get(child(dbRef, 'smartwatch_stream/data')).then(snapshot => snapshot.val())

      return result
    }
  })

  const surveysQuery = useQuery({
    queryKey: ['surveys'],
    queryFn: async () => {
      const dbRef = ref(database)
      const result = await get(child(dbRef, 'general_questionnaire/data')).then(snapshot => snapshot.val())

      return Object.keys(result).map(timestamp => ({
        ...result[timestamp],
        id: `SURVEY_${timestamp}`,
        timestamp: new Date(parseInt(timestamp) * 1000),
        type: 'SURVEY'
      }))
    }
  })

  const gad7Query = useQuery({
    queryKey: ['gad7'],
    queryFn: async () => {
      const dbRef = ref(database)
      const result = await get(child(dbRef, 'GAD7/data')).then(snapshot => snapshot.val())

      return Object.keys(result).map(timestamp => ({
        ...result[timestamp],
        id: `GAD7_${timestamp}`,
        timestamp: new Date(parseInt(timestamp) * 1000),
        type: 'GAD7'
      }))
    }
  })

  const phq9Query = useQuery({
    queryKey: ['phq9'],
    queryFn: async () => {
      const dbRef = ref(database)
      const result = await get(child(dbRef, 'PHQ9/data')).then(snapshot => snapshot.val())

      return Object.keys(result).map(timestamp => ({
        ...result[timestamp],
        id: `PHQ9_${timestamp}`,
        timestamp: new Date(parseInt(timestamp) * 1000),
        type: 'PHQ9'
      }))
    }
  })

  if (dashboardQuery.isLoading || surveysQuery.isLoading || gad7Query.isLoading || phq9Query.isLoading) {
    return <div>Loading...</div>
  }

  if (
    dashboardQuery.isError ||
    surveysQuery.isError ||
    gad7Query.isError ||
    phq9Query.isError ||
    !dashboardQuery.data ||
    !surveysQuery.data ||
    !gad7Query.data ||
    !phq9Query.data
  ) {
    return <div>Error loading data</div>
  }

  const dataEntries = Object.values(dashboardQuery.data)

  const chartData = {
    series: [
      {
        name: 'Heart Rate',
        data: dataEntries.map((entry: any) => ({
          x: new Date(entry.ts * 1000),
          y: entry.heart_rate
        }))
      }
    ],
    options: {
      chart: {
        type: 'line' as const,
        height: 350,
        zoom: {
          enabled: true
        }
      },
      xaxis: {
        type: 'datetime' as const,
        title: {
          text: 'Timestamp'
        }
      },
      yaxis: {
        title: {
          text: 'Heart Rate'
        }
      },
      title: {
        text: 'Heart Rate Over Time',
        align: 'center' as const
      },
      stroke: {
        curve: 'smooth' as const
      }
    }
  }

  const cardStats = [
    {
      title: 'Surveys',
      stats: surveysQuery.data.length.toString(),
      subtitle: 'Total Surveys Completed',
      trendDiff: '5',
      icon: 'mdi:poll',
      avatarColor: 'primary' as const
    },
    {
      title: 'GAD7',
      stats: gad7Query.data.length.toString(),
      subtitle: 'Total GAD7 Entries',
      trendDiff: '10',
      icon: 'mdi:emoticon-happy-outline',
      avatarColor: 'success' as const
    },
    {
      title: 'PHQ9',
      stats: phq9Query.data.length.toString(),
      subtitle: 'Total PHQ9 Entries',
      trendDiff: '8',
      icon: 'mdi:emoticon-sad-outline',
      avatarColor: 'error' as const
    }
  ]

  return (
    <div>
      <h2>Dashboard</h2>
      <Grid container spacing={6}>
        {cardStats.map((item, index) => (
          <Grid item xs={12} md={4} sm={6} key={index}>
            <CardStatsHorizontalWithDetails {...item} />
          </Grid>
        ))}
      </Grid>
      <Card sx={{ mt: 5 }}>
        <Chart options={chartData.options} series={chartData.series} type='line' height={350} />
      </Card>
    </div>
  )
}

export default Dashboard
