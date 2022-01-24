import React from 'react'
import classes from './style.module.css'

interface AvatarProps {
  firstname: string
  lastname: string
  url?: string | null
}
const Avatar = ({ firstname, lastname, url }: AvatarProps) => {
  return (
    <div className={classes.container}>
      {url ? (
        <img className={classes.img} src={url} alt="Avatar" />
      ) : (
        `${firstname[0].toUpperCase()} ${lastname[0].toUpperCase()}`
      )}
    </div>
  )
}

export default Avatar
