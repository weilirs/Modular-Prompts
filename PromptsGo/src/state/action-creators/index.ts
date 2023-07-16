import { ActionType } from "../action-types"
import { BlockTypes } from "../block"


export const insertBlockAfter = (blockType: BlockTypes, content: string) => {
  return {
    type: ActionType.INSERT_BLOCK_AFTER,
    payload: {
      type: blockType,
      content: content,
    },
  }
}

export const deleteBlock = (blockType: BlockTypes, id: string) => {
  return {
    type: ActionType.DELETE_BLOCK,
    payload: {
      type: blockType,
      id: id,
    },
  }
}
