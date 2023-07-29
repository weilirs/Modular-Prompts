import { ActionType } from "../action-types"

export const insertBlockAfter = (
  category: string,
  keyWord: string,
  detail: string
) => {
  return {
    type: ActionType.INSERT_BLOCK_AFTER,
    payload: {
      category,
      keyWord,
      detail,
    },
  }
}

export const deleteBlock = (category: string, id: string) => {
  return {
    type: ActionType.DELETE_BLOCK,
    payload: {
      category,
      id,
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

export const deleteLego = (category: string, name: string, keyWord: string) => {
  return {
    type: ActionType.DELETE_LEGO,
    payload: {
      category,
      name,
      keyWord,
    },
  }
}

export const addMinorCategory = (category: string, name: string) => {
  return {
    type: ActionType.ADD_MINOR_CATEGORY,
    payload: {
      category,
      name,
    },
  }
}

export const deleteMinorCategory = (category: string, name: string) => {
  return {
    type: ActionType.DELETE_MINOR_CATEGORY,
    payload: {
      category,
      name,
    },
  }
}

export const addNewCategory = (category: string) => {
  return {
    type: ActionType.ADD_NEW_CATEGORY,
    payload: {
      category,
    },
  }
}

export const deleteCategory = (category: string) => {
  return {
    type: ActionType.DELETE_CATEGORY,
    payload: {
      category,
    },
  }
}
export const clear = () => {
  return {
    type: ActionType.CLEAR,
  }
}

export const collect = (legos: []) => {
  return {
    type: ActionType.COLLECT,
    payload: {
      legos,
    },
  }
}
