import axios from 'axios'

export type Freelance = {
  id: string
  avatar: {
    '64x64': string
    '256x256': string
    '512x512': string
  } | null
  firstname: string
  lastname: string
  language: string
  birthDate: string
  isVisible: boolean
  retribution: number
}

export type Language = {
  value: string
  label: string
}

export const getFreelancesLanguages = async () => {
  const response = await axios.get('http://localhost:4000/freelances/languages')
  if (!response.data) {
    throw new Error('Invalid Language response data')
  }

  const languages: Language[] = Object.keys(response.data).map((key) => ({
    value: key,
    label: response.data[key],
  }))
  return languages
}

export const getFreelance = async (id: string): Promise<Freelance> => {
  if (!id) {
    throw new Error('Cannot request freelance without id')
  }
  const response = await axios.get(`http://localhost:4000/freelances/${id}`)

  if (!response.data) {
    throw new Error('Invalid Freelance response data')
  }
  return response.data
}

export const updateFreelance = async (freelance: Freelance): Promise<Freelance> => {
  const response = await axios.put(`http://localhost:4000/freelances/${freelance.id}`, freelance)

  if (!response.data) {
    throw new Error('Invalid Freelance response data')
  }
  return response.data
}
