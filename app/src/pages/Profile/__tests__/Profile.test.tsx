import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProfileCustom from '..'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('Profile Page', () => {
  test('Render Profile page', async () => {
    jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce({ data: { '1': 'frenchui', '2': 'engliche' } })
      .mockResolvedValueOnce({
        data: {
          id: 'a6af7583-ff4b-44b5-abc7-daf5444f3b9b',
          avatar: {
            '64x64': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/64x64.png',
            '256x256': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/256x256.png',
            '512x512': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/512x512.png',
          },
          firstname: 'Leane',
          lastname: 'Licouper',
          language: '1',
          birthDate: '1990-12-31',
          isVisible: false,
          retribution: 500,
        },
      })

    render(
      <MemoryRouter initialEntries={['/freelances/a6af7583-ff4b-44b5-abc7-daf5444f3b9b']}>
        <Routes>
          <Route path="/freelances/:id" element={<ProfileCustom />} />
        </Routes>
        <Toaster />
      </MemoryRouter>
    )

    // Display data
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
    expect(screen.getByText('Display freelance profile')).toBeInTheDocument()
    expect(screen.getByText('Freelance data loaded')).toBeInTheDocument()
  })
})
