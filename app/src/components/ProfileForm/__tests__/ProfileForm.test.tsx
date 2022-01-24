import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import ProfileForm from '..'

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

describe('ProfileCustom', () => {
  test('Render ProfileCustom page', async () => {
    const spyAxiosGet = jest
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
    const spyAxiosPut = jest.spyOn(axios, 'put').mockResolvedValue({
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
      <>
        <ProfileForm id="a6af7583-ff4b-44b5-abc7-daf5444f3b9b" />
        <Toaster />
      </>
    )

    // Display data
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
    expect(screen.getByText('Display freelance profile')).toBeInTheDocument()
    expect(screen.getByText('Freelance data loaded')).toBeInTheDocument()

    const editButton = screen.getByText('Edit')
    expect(editButton).toBeInTheDocument()
    expect(screen.queryByText('Save')).not.toBeInTheDocument()
    expect(editButton).toHaveClass('button edit-button')

    const lastnameInput: HTMLInputElement = screen.getByRole('textbox', { name: 'Last Name' })
    expect(lastnameInput.value).toEqual('Licouper')
    const languageInput: HTMLInputElement = screen.getByRole('textbox', { name: 'Language' })
    expect(languageInput.value).toEqual('frenchui')
    expect(screen.queryByText('engliche')).not.toBeInTheDocument()

    expect(spyAxiosGet).toHaveBeenCalledTimes(2)
    expect(spyAxiosPut).not.toHaveBeenCalled()

    // Activate Edit mode
    fireEvent.click(editButton)
    await waitFor(() => {
      expect(screen.getByText('Edit freelance profile')).toBeInTheDocument()
    })
    expect(editButton).not.toBeInTheDocument()
    expect(screen.queryByText('Display freelance profile')).not.toBeInTheDocument()
    const saveButton = screen.getByText('Save')
    expect(saveButton).toBeInTheDocument()
    expect(saveButton).toHaveClass('button save-button')

    // Change inputs values
    const inputs = screen.getAllByTestId('input')
    fireEvent.change(inputs[1], {
      target: { value: 'Estele' },
    })
    fireEvent.change(inputs[2], {
      target: { value: 'Hilton' },
    })
    fireEvent.change(inputs[3], {
      target: { value: '2000-01-01' },
    })
    fireEvent.change(inputs[4], {
      target: { value: '421' },
    })

    // Change Selects values
    const selects = screen.getAllByRole('combobox')
    fireEvent.change(selects[0], {
      target: { value: '2' },
    })
    fireEvent.change(selects[1], {
      target: { value: 'true' },
    })

    // Save
    fireEvent.click(saveButton)
    await waitFor(() => {
      expect(screen.getByText('Freelance data updated')).toBeInTheDocument()
    })
    expect(spyAxiosPut).toHaveBeenCalledWith(
      'http://localhost:4000/freelances/a6af7583-ff4b-44b5-abc7-daf5444f3b9b',
      {
        avatar: {
          '256x256': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/256x256.png',
          '512x512': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/512x512.png',
          '64x64': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/64x64.png',
        },
        birthDate: '2000-01-01',
        firstname: 'Estele',
        id: 'a6af7583-ff4b-44b5-abc7-daf5444f3b9b',
        isVisible: 'true',
        language: '2',
        lastname: 'Hilton',
        retribution: '421',
      }
    )
    expect(saveButton).not.toBeInTheDocument()
    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Display freelance profile')).toBeInTheDocument()
    expect(screen.queryByText('Edit freelance profile')).not.toBeInTheDocument()
  })
})
