import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from '..'
import { linkClassName } from '../NavBar'

describe('NavBar', () => {
  test('Render NavBar component', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    )
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
    links.forEach((link) => expect(link).toHaveClass('link'))
  })
  test('linkClassName have to return active link class', () => {
    expect(linkClassName({ isActive: true })).toEqual('link active')
  })
  test('linkClassName have to return link class', () => {
    expect(linkClassName({ isActive: false })).toEqual('link')
  })
})
