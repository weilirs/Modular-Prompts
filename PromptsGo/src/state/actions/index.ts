import { ActionType } from "../action-types"

export interface InsertBlockAfterAction {
  type: ActionType.INSERT_BLOCK_AFTER
  payload: {
    type: string
    content: string
    detail: string
  }
}

export interface DeleteBlockAction {
  type: ActionType.DELETE_BLOCK
  payload: {
    type: string
    id: string
  }
}

export interface UpdateBlockAction {
  type: ActionType.UPDATE_BLOCK
  payload: {
    id: string
    detail: string
  }
}

export interface AddNewLegoAction {
  type: ActionType.ADD_NEW_LEGO
  payload: {
    category: string
    name: string
    keyWord: string
    detail: string
  }
}

export interface ClearAction {
  type: ActionType.CLEAR
}

export type Action =
  | InsertBlockAfterAction
  | DeleteBlockAction
  | UpdateBlockAction
  | AddNewLegoAction
  | ClearAction
