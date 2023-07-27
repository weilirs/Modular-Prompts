import { ActionType } from "../action-types"

export const insertBlockAfter = (
  blockType: string,
  content: string,
  detail: string
) => {
  return {
    type: ActionType.INSERT_BLOCK_AFTER,
    payload: {
      type: blockType,
      content: content,
      detail: detail,
    },
  }
}

export const deleteBlock = (blockType: string, id: string) => {
  return {
    type: ActionType.DELETE_BLOCK,
    payload: {
      type: blockType,
      id: id,
    },
  }
}

export const updateBlock = (id: string, detail: string) => {
  return {
    type: ActionType.UPDATE_BLOCK,
    payload: {
      id: id,
      detail: detail,
    },
  }
}

export const addNewBlock = (
  category: string,
  name: string,
  keyWord: string,
  detail: string
) => {
  return {
    type: ActionType.ADD_NEW_LEGO,
    payload: {
      category,
      name,
      keyWord,
      detail,
    },
  }
}

export const clear = () => {
  return {
    type: ActionType.CLEAR,
  }
}
