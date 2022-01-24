import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import Field from '..'

describe('Field', () => {
  test('Render Field component in display mode', () => {
    render(
      <Field
        editable={false}
        id="myid"
        name="test"
        type="text"
        value="AzertY"
        label="a test label"
        onChange={jest.fn()}
      />
    )

    expect(screen.getByText('a test label')).toBeInTheDocument()
    const field = screen.getByTestId('input')
    expect(field).toBeInTheDocument()
    expect(field).toHaveAttribute('type', 'text')
    expect(field).toHaveAttribute('name', 'test')
    expect(field).toHaveAttribute('value', 'AzertY')
    expect(field).toHaveAttribute('readonly')
    expect(field).toHaveAttribute('id', 'myid')
  })

  test('Render text Field component in edit mode', () => {
    const mockOnChange = jest.fn()
    render(
      <Field
        editable={true}
        id="myid"
        name="test"
        type="text"
        value="AzertY"
        label="a test label"
        onChange={mockOnChange}
      />
    )

    expect(screen.getByText('a test label')).toBeInTheDocument()
    const field = screen.getByTestId('input')
    expect(field).toBeInTheDocument()
    expect(field).toHaveAttribute('type', 'text')
    expect(field).toHaveAttribute('name', 'test')
    expect(field).toHaveAttribute('value', 'AzertY')
    expect(field).not.toHaveAttribute('readonly')
    fireEvent.change(field, {
      target: { value: '2' },
    })
    expect(mockOnChange).toHaveBeenCalledWith('test', '2')
  })

  test('Render text Field component in edit mode with custom testid', () => {
    const mockOnChange = jest.fn()
    render(
      <Field
        editable={true}
        id="myid"
        name="test"
        type="text"
        value="AzertY"
        label="a test label"
        onChange={mockOnChange}
        data-testid="customTestId"
      />
    )

    expect(screen.getByTestId('customTestId')).toBeInTheDocument()
    expect(screen.queryByTestId('input')).not.toBeInTheDocument()
  })

  test('Render text Field component in edit mode without specified id', () => {
    const mockOnChange = jest.fn()
    render(
      <Field
        editable={true}
        name="test"
        type="text"
        value="AzertY"
        label="a test label"
        onChange={mockOnChange}
      />
    )

    const field = screen.getByTestId('input')
    expect(field).toBeInTheDocument()
    expect(field).toHaveAttribute('id', 'test')
  })
})
