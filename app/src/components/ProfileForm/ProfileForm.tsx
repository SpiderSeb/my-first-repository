import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  Freelance,
  getFreelance,
  getFreelancesLanguages,
  Language,
  updateFreelance,
} from '../../services/freelance'
import Avatar from '../Avatar'
import Field from '../Field'
import Select from '../Select'
import classes from './ProfileForm.module.css'

interface ProfileFormProps {
  id: string
}
const ProfileForm = ({ id }: ProfileFormProps) => {
  const [freelance, setFreelance] = useState<Freelance | null>(null)
  const [languages, setLanguages] = useState<Language[]>([])
  const [editionMode, setEditionMode] = useState(false)

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const languages = await getFreelancesLanguages()
        setLanguages(languages)
      } catch (error) {
        toast.error(`Error when querying Language data : ${(error as Error).message}`)
      }
    }
    fetchLanguages()
  }, [])

  useEffect(() => {
    const fetchFreelance = async () => {
      try {
        const freelanceData = await getFreelance(id!)
        setFreelance(freelanceData)
        toast.success('Freelance data loaded')
      } catch (error) {
        toast.error(`Error when querying Freelance data : ${(error as Error).message}`)
      }
    }
    if (id) {
      fetchFreelance()
    }
  }, [id])

  const handleEdit = () => {
    setEditionMode(true)
  }

  const handleSave = async () => {
    try {
      const freelanceData = await updateFreelance(freelance!)
      setFreelance(freelanceData)
      setEditionMode(false)
      toast.success('Freelance data updated')
    } catch (error) {
      toast.error(`Error when updating Freelance data : ${(error as Error).message}`)
    }
  }

  const handleFieldChange = (name: string, value: string) => {
    const updatedFreelance = { ...freelance!, [name]: value }
    setFreelance(updatedFreelance)
  }

  if (!freelance) {
    return (
      <div className={classes.container}>
        <div className={classes.title}>Loading...</div>
      </div>
    )
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Avatar
          firstname={freelance.firstname}
          lastname={freelance.lastname}
          url={freelance.avatar?.['64x64']}
        />
        {editionMode ? 'Edit' : 'Display'} freelance profile
        {!editionMode && (
          <span className={`${classes.button} ${classes['edit-button']}`} onClick={handleEdit}>
            Edit
          </span>
        )}
        {editionMode && (
          <span className={`${classes.button} ${classes['save-button']}`} onClick={handleSave}>
            Save
          </span>
        )}
      </div>
      <div className={classes.content}>
        <Field
          editable={false}
          name="id"
          label="ID"
          type="text"
          value={freelance.id}
          onChange={handleFieldChange}
        />
        <Field
          editable={editionMode}
          name="firstname"
          label="First Name"
          type="text"
          value={freelance.firstname}
          onChange={handleFieldChange}
        />
        <Field
          editable={editionMode}
          name="lastname"
          label="Last Name"
          type="text"
          value={freelance.lastname}
          onChange={handleFieldChange}
        />
        <Select
          editable={editionMode}
          name="language"
          label="Language"
          value={freelance.language}
          options={languages}
          onChange={handleFieldChange}
        />
        <Field
          editable={editionMode}
          name="birthDate"
          label="Birth Date"
          type="date"
          value={freelance.birthDate}
          onChange={handleFieldChange}
        />
        <Select
          editable={editionMode}
          name="isVisible"
          label="Visible"
          value={`${freelance.isVisible}`}
          options={[
            { value: 'true', label: 'Yes' },
            { value: 'false', label: 'No' },
          ]}
          onChange={handleFieldChange}
        />
        <Field
          editable={editionMode}
          name="retribution"
          label="Retribution"
          type="number"
          value={freelance.retribution}
          onChange={handleFieldChange}
        />
      </div>
    </div>
  )
}
export default ProfileForm
