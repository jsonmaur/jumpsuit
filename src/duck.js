import { handleActions, createAction } from 'redux-actions'

export function getDefaultDuck(data) {
  return handleActions(data.actions, data.initialState)
}
