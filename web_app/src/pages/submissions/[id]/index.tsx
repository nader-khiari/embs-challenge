// ** React Imports
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// ** Firebase Imports
import { ref, child, get } from 'firebase/database'
import { database } from 'src/firebase'
import { fields, gad7Fields, phq9Fields } from '../fields'

// Consolidate all fields
const allFields = [...fields, ...gad7Fields, ...phq9Fields]

// Utility to get full name of a field
const getFullName = (shortenedName: string): string => {
  const field = allFields.find(f => f.shortenedName === shortenedName)

  return field?.fullName || shortenedName
}

type SubmissionData = {
  answers: any
  timestamp: string
  type: string
}

const fetchSubmissionDetails = async (id: string): Promise<SubmissionData> => {
  const [type, timestamp] = id.split('_')

  const endpointMap: Record<string, string> = {
    SURVEY: 'general_questionnaire',
    GAD7: 'GAD7',
    PHQ9: 'PHQ9'
  }

  const endpoint = endpointMap[type]
  if (!endpoint) throw new Error('Invalid ID type')

  const dbRef = ref(database)
  const snapshot = await get(child(dbRef, `${endpoint}/data/${timestamp}`))
  if (!snapshot.exists()) throw new Error('Data not found')

  return {
    answers: snapshot.val(),
    timestamp,
    type
  }
}

const SubmissionDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, isLoading, isError } = useQuery<SubmissionData>({
    queryKey: ['submissionDetails', id],
    queryFn: () => fetchSubmissionDetails(id as string),
    enabled: !!id
  })

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError || !data) {
    return <Typography>Error loading submission details</Typography>
  }

  const { answers, timestamp } = data

  return (
    <Grid container spacing={6} sx={{ padding: 4 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Submission Details
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
              <strong>Date:</strong> {new Date(parseInt(timestamp) * 1000).toLocaleString()}
            </Typography>
            <Typography variant='h6' sx={{ fontWeight: 'bold', marginTop: 2 }}>
              Answers:
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            {Object.keys(answers.answers).map((key: any) => {
              const value = answers.answers[key]
              const fullName = getFullName(key)

              return (
                <Typography key={key} variant='body1' sx={{ marginBottom: 1 }}>
                  <strong>{fullName}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
                </Typography>
              )
            })}

            <Button variant='contained' sx={{ marginTop: 2 }} onClick={() => router.back()}>
              Back to Submissions
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SubmissionDetails
