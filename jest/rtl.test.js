import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import HiddenMessage from './rtl'

test('shows the children when the checkbox is checked', () => {
  const testMessage = 'Test Message'
  const {queryByText, getByLabelText, getByText} = render(
    <HiddenMessage>{testMessage}</HiddenMessage>,
  )

  expect(queryByText(testMessage)).toBeNull()

  fireEvent.click(getByLabelText(/show/i))

  expect(getByText(testMessage)).toBeInTheDocument()

  expect(getByLabelText('dd')).toBeInTheDocument();

  expect(getByText(/i am span/i)).toBeInTheDocument();
});