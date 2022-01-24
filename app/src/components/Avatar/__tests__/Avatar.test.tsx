import { render, screen } from '@testing-library/react'
import React from 'react'
import Avatar from '..'

describe('Avatar', () => {
  test('Render Avatar component without image', () => {
    render(<Avatar firstname="Bob" lastname="Morane" />)

    expect(screen.getByText('B M')).toBeInTheDocument()
  })

  test('Render Avatar component with image', () => {
    render(
      <Avatar
        firstname="Bob"
        lastname="Morane"
        url="/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/64x64.png"
      />
    )

    const image = screen.getByAltText('Avatar')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/64x64.png')
  })
})
