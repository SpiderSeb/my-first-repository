import React from 'react'
import { useParams } from 'react-router-dom'
import ProfileForm from '../../components/ProfileForm'

const Profile = () => {
  const { id } = useParams()

  return <ProfileForm id={id!} />
}
export default Profile
