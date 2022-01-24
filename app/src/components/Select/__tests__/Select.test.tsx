import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import Select from '..'

describe('Select', () => {
  test('Render Select component in display mode', () => {
    render(
      <Select
        editable={false}
        id="myid"
        name="test"
        value="1"
        label="a test label"
        options={[
          { value: '1', label: 'A' },
          { value: '2', label: 'B' },
        ]}
        onChange={jest.fn()}
      />
    )

    expect(screen.getByText('a test label')).toBeInTheDocument()

    const select = screen.getByTestId('select')
    expect(select).toBeInTheDocument()
    expect(select).toHaveAttribute('value', 'A')
    expect(select).toHaveAttribute('readonly')
    expect(select).toHaveAttribute('id', 'myid')
    expect(select).toHaveAttribute('name', 'test')
  })
  test('Render Select component in display mode with unknown value', () => {
    render(
      <Select
        editable={false}
        name="test"
        value="3"
        label="a test label"
        options={[
          { value: '1', label: 'A' },
          { value: '2', label: 'B' },
        ]}
        onChange={jest.fn()}
      />
    )

    expect(screen.getByText('a test label')).toBeInTheDocument()
    const select = screen.getByTestId('select')
    expect(select).toBeInTheDocument()
    expect(select).toHaveAttribute('value', 'Unknown')
    expect(select).toHaveAttribute('readonly')
    expect(select).toHaveAttribute('id', 'test')
  })
  test('Render Select component in edit mode', () => {
    const mockOnChange = jest.fn()
    render(
      <Select
        editable={true}
        id="myid"
        name="test"
        value="2"
        label="a test label"
        options={[
          { value: '1', label: 'A' },
          { value: '2', label: 'B' },
          { value: '3', label: 'C' },
        ]}
        onChange={mockOnChange}
      />
    )
    expect(screen.getByText('a test label')).toBeInTheDocument()

    const select = screen.getByTestId('select')
    expect(select).toBeInTheDocument()
    expect(select).toHaveAttribute('id', 'myid')
    expect(select).toHaveAttribute('name', 'test')

    expect(screen.getByText('A')).toBeInTheDocument()
    const options: HTMLOptionElement[] = screen.getAllByRole('option')
    expect(options).toHaveLength(3)
    expect(options[1].label).toEqual('B')
    expect(options[1].selected).toBeTruthy()
    expect(options[0].selected).toBeFalsy()
    expect(options[2].selected).toBeFalsy()

    fireEvent.change(select, {
      target: { value: '1' },
    })
    expect(mockOnChange).toHaveBeenCalledWith('test', '1')
  })
  test('Render Select component in edit mode with custom testid', () => {
    const mockOnChange = jest.fn()
    render(
      <Select
        editable={true}
        name="test"
        value="1"
        label="a test label"
        options={[
          { value: '1', label: 'A' },
          { value: '2', label: 'B' },
        ]}
        onChange={mockOnChange}
        data-testid="customTestId"
      />
    )

    const select = screen.getByTestId('customTestId')
    expect(select).toBeInTheDocument()
    expect(select).toHaveAttribute('id', 'test')
    expect(screen.queryByTestId('select')).not.toBeInTheDocument()
  })
})
