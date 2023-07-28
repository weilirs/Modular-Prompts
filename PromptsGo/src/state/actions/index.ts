import { ActionType } from "../action-types"

export interface InsertBlockAfterAction {
  type: ActionType.INSERT_BLOCK_AFTER
  payload: {
    category: string
    keyWord: string
    detail: string
  }
}

export interface DeleteBlockAction {
  type: ActionType.DELETE_BLOCK
  payload: {
    category: string
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

export interface DeleteLegoAction {
  type: ActionType.DELETE_LEGO
  payload: {
    category: string
    name: string
    keyWord: string
  }
}

export interface AddMinorCategoryAction {
  type: ActionType.ADD_MINOR_CATEGORY
  payload: {
    category: string
    name: string
  }
}

export interface DeleteMinorCategoryAction {
  type: ActionType.DELETE_MINOR_CATEGORY
  payload: {
    category: string
    name: string
  }
}

export interface AddNewCategoryAction {
  type: ActionType.ADD_NEW_CATEGORY
  payload: {
    category: string
  }
}

export interface DeleteCategoryAction {
  type: ActionType.DELETE_CATEGORY
  payload: {
    category: string
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
  | DeleteLegoAction
  | AddMinorCategoryAction
  | DeleteMinorCategoryAction
  | AddNewCategoryAction
  | DeleteCategoryAction
  | ClearAction
