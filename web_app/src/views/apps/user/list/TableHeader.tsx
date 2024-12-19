// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { MenuItem, SelectChangeEvent } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

interface TableHeaderProps {
  toggle: () => void
  toggleGad7: () => void
  togglePhq9: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, toggle, togglePhq9, toggleGad7 } = props

  const [type, setType] = useState<string>('')

  useEffect(() => {
    handleFilter(type)
  }, [type, handleFilter])

  const handleStatusChange = useCallback((e: SelectChangeEvent<unknown>) => {
    setType(e.target.value as string)
  }, [])

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box width={300}>
        <CustomTextField
          select
          fullWidth
          defaultValue='Select Type'
          SelectProps={{
            value: type,
            displayEmpty: true,
            onChange: e => handleStatusChange(e)
          }}
        >
          <MenuItem value=''>Select type</MenuItem>
          <MenuItem value='survey'>Questionnaire</MenuItem>
          <MenuItem value='gad7'>GAD7</MenuItem>
          <MenuItem value='phq9'>PHQ9</MenuItem>
        </CustomTextField>
      </Box>
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'end', gap: '8px' }}>
        <Button onClick={toggle} variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          Questionnaire
        </Button>
        <Button onClick={toggleGad7} variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          Test GAD7
        </Button>
        <Button onClick={togglePhq9} variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          Test PHQ9
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
