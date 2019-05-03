import React, { useMemo } from 'react'

const messages = {
  moveToday: 'Today',
  moveBack: 'Navigate back',
  moveForward: 'Navigate forward',

  dateButton: 'Select date',
  timeButton: 'Select time',

  openCombobox: 'open combobox',
  openDropdown: 'open dropdown',

  placeholder: '',
  filterPlaceholder: '',

  emptyList: 'There are no items in this list',
  emptyFilter: 'The filter returned no results',

  createOption: (value, searchTerm) => [
    ' Create option',
    searchTerm && ' ',
    searchTerm && <strong key="_">{`"${searchTerm}"`}</strong>,
  ],

  tagsLabel: 'Selected items',
  removeLabel: 'Remove selected item',
  noneSelected: 'no selected items',
  selectedItems: labels => `Selected items: ${labels.join(', ')}`,

  // number
  increment: 'Increment value',
  decrement: 'Decrement value',
}
const DEFAULTS = {}

export function getMessages(defaults = DEFAULTS) {
  let processed = {}
  Object.keys(messages).forEach(message => {
    let value = defaults[message]
    if (value == null) value = messages[message]

    processed[message] = typeof value === 'function' ? value : () => value
  })

  return processed
}

export const useMessagesWithDefaults = defaults =>
  useMemo(() => getMessages(defaults), [defaults])
