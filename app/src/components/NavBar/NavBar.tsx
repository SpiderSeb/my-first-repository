import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './NavBar.module.css'

export const linkClassName = ({ isActive }: { isActive: boolean }): string =>
  isActive ? `${classes.link} ${classes['active']}` : classes.link

const NavBar = () => {
  return (
    <nav className={classes.container}>
      <div>Custom Profile</div>
      <NavLink to="/freelance/a6af7583-ff4b-44b5-abc7-daf5444f3b9b" className={linkClassName}>
        Gordon
      </NavLink>
      <NavLink to="/freelance/e3a327af-252d-5894-a76a-7616de440b5e" className={linkClassName}>
        Simon
      </NavLink>
      <NavLink to="/freelance/b805cabc-2e32-58be-a11e-e5aa61c45947" className={linkClassName}>
        Omar
      </NavLink>
    </nav>
  )
}

export default NavBar
