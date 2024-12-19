// ** React Imports
import { useState, useEffect, useCallback, useMemo } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Select from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports

// ** Custom Components Imports
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Utils Import

// ** Third Party Components

// ** Types Imports
import { CardStatsHorizontalWithDetailsProps } from 'src/@core/components/card-statistics/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import { database } from 'src/firebase'
import { child, get, onValue, ref } from 'firebase/database'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  TextField
} from '@mui/material'
import axios from 'axios'
import toast from 'react-hot-toast'
import { fields, gad7Fields, phq9Fields } from './fields'

const RowOptions = ({ id }: { id: number | string }) => {
  return (
    <MenuItem
      component={Link}
      sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 0 } }}
      href={`/submissions/${id}`}
    >
      <Icon icon='tabler:eye' fontSize={20} />
    </MenuItem>
  )
}

const columns: GridColDef[] = [
  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'Index',
    field: 'index',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {row.index}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'type',
    headerName: 'Type',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.type}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 190,
    field: 'timestamp',
    headerName: 'Date',
    renderCell: ({ row }) => {
      console.log(row)

      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {new Date(row.timestamp).toLocaleString('en-US')}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  }
]

const SubmissionsList = () => {
  // ** State
  const [selectedType, setSelectedType] = useState<string>('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogFields, setDialogFields] = useState(fields)
  const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [Endpoint, setEndpoint] = useState<string>('')

  const queryClient = useQueryClient()
  const handleInputChange = (name: string, value: any) => {
    setFormValues(prev => ({ ...prev, [name]: value }))
  }
  const createMutation = useMutation({
    mutationFn: async ({ type, data }: { type: string; data: any }) => {
      const endpointMap: Record<string, string> = {
        fields: '/general_questionnaire',
        gad7Fields: '/GAD7',
        phq9Fields: '/PHQ9'
      }

      const endpoint = endpointMap[type]
      if (!endpoint) throw new Error('Invalid questionnaire type')

      return axios.post(endpoint, data)
    },
    onSuccess: () => {
      toast.success('Questionnaire submitted successfully')
      queryClient.invalidateQueries({ queryKey: ['surveys', 'gad7', 'phq9'] })
      setDialogOpen(false)
      setFormValues({})
    },
    onError: () => {
      toast.error('Something went wrong')
    }
  })

  const handleSubmit = () => {
    const parsedFormValues = { ...formValues }

    dialogFields.forEach(field => {
      if (field.type === 'number' && parsedFormValues[field.shortenedName]) {
        parsedFormValues[field.shortenedName] = parseInt(parsedFormValues[field.shortenedName], 10)
      } else if (parsedFormValues[field.shortenedName] === undefined) {
        parsedFormValues[field.shortenedName] = null
      }
    })

    createMutation.mutate({
      type: Endpoint,
      data: parsedFormValues
    })
    console.log(parsedFormValues)
  }

  const openFieldsDialog = () => {
    setDialogFields(fields)
    setEndpoint('fields')
    setDialogOpen(true)
  }

  const openGad7Dialog = () => {
    setDialogFields(gad7Fields)
    setEndpoint('gad7Fields')
    setDialogOpen(true)
  }

  const openPhq9Dialog = () => {
    setDialogFields(phq9Fields)
    setEndpoint('phq9Fields')
    setDialogOpen(true)
  }

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

  const data = useMemo(() => {
    const result = [
      ...(!selectedType || selectedType === 'survey' ? surveysQuery.data ?? [] : []),
      ...(!selectedType || selectedType === 'phq9' ? phq9Query.data ?? [] : []),
      ...(!selectedType || selectedType === 'gad7' ? gad7Query.data ?? [] : [])
    ]

    result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    return result.map((item, index) => ({
      ...item,
      index: index + 1,
      timestamp: new Date(item.timestamp).toISOString()
    }))
  }, [selectedType, surveysQuery.data, phq9Query.data, gad7Query.data])

  // ** Hooks

  useEffect(() => {
    const surveysRef = ref(database, 'general_questionnaire/data')
    onValue(surveysRef, () => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] })
    })
  }, [queryClient])

  useEffect(() => {
    const gad7Ref = ref(database, 'GAD7/data')
    onValue(gad7Ref, () => {
      queryClient.invalidateQueries({ queryKey: ['gad7'] })
    })
  }, [queryClient])

  useEffect(() => {
    const phq9Ref = ref(database, 'PHQ9/data')
    onValue(phq9Ref, () => {
      queryClient.invalidateQueries({ queryKey: ['phq9'] })
    })
  }, [queryClient])

  const handleFilter = useCallback((val: string) => {
    setSelectedType(val)
  }, [])

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          {[].map((item: CardStatsHorizontalWithDetailsProps, index: number) => {
            return (
              <Grid item xs={12} md={3} sm={6} key={index}>
                <CardStatsHorizontalWithDetails {...item} />
              </Grid>
            )
          })}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Submissions' />
          <TableHeader
            handleFilter={handleFilter}
            toggle={openFieldsDialog}
            toggleGad7={openGad7Dialog}
            togglePhq9={openPhq9Dialog}
          />
          <Divider sx={{ m: '0 !important' }} />
          <CardContent>
            <DataGrid
              autoHeight
              rowHeight={62}
              rows={data}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </CardContent>
        </Card>
      </Grid>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle>Add Survey</DialogTitle>
        <DialogContent>
          {dialogFields.map(field => (
            <div key={field.shortenedName} style={{ marginBottom: '16px' }}>
              {field.type === 'select' ? (
                <FormControl fullWidth>
                  <InputLabel>{field.fullName}</InputLabel>
                  <Select
                    value={formValues[field.shortenedName] || ''}
                    onChange={e => handleInputChange(field.shortenedName, e.target.value)}
                    label={field.fullName}
                  >
                    {field.options?.map(option =>
                      typeof option === 'string' ? (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ) : (
                        <MenuItem key={option.value ?? option} value={option.value}>
                          {option.label}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  fullWidth
                  label={field.fullName}
                  type={field.type === 'number' ? 'number' : 'text'}
                  value={formValues[field.shortenedName] || ''}
                  onChange={e => handleInputChange(field.shortenedName, e.target.value)}
                  variant='outlined'
                />
              )}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default SubmissionsList
