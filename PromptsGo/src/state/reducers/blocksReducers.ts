import { Action } from "../actions"
import { ActionType } from "../action-types"
import { Block } from "../block"
import { produce } from "immer"
interface BlocksState {
  order: string[] // order of types
  data: { [key: string]: Block }
  background: string[]
  character: string[]
  mission: string[]
  output_requirement: string[]
  other_requirement: string[]
}

const initialState: BlocksState = {
  order: [],
  data: {},
  background: [],
  character: [],
  mission: [],
  output_requirement: [],
  other_requirement: [],
}

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.INSERT_BLOCK_AFTER:
      return produce(state, (draftState) => {
        const newBlock: Block = {
          id: Math.random().toString(36).substr(2, 9),
          type: action.payload.type,
          content: action.payload.content,
        }

        // insert this id to the corresponding type array
        switch (action.payload.type) {
          case "background":
            draftState.background.push(newBlock.id)
            break
          case "character":
            draftState.character.push(newBlock.id)
            break
          case "mission":
            draftState.mission.push(newBlock.id)
            break
          case "output_requirement":
            draftState.output_requirement.push(newBlock.id)
            break
          case "other_requirement":
            draftState.other_requirement.push(newBlock.id)
            break
        }

        draftState.data[newBlock.id] = newBlock
        // if the type is not in the order array, add it
        if (!draftState.order.includes(action.payload.type)) {
          draftState.order.push(action.payload.type)
        }
      })
    case ActionType.DELETE_BLOCK:
      return produce(state, (draftState) => {
        // delete the id from the corresponding type array
        switch (action.payload.type) {
          case "background":
            draftState.background = draftState.background.filter(
              (id) => id !== action.payload.id
            )
            break
          case "character":
            draftState.character = draftState.character.filter(
              (id) => id !== action.payload.id
            )
            break
          case "mission":
            draftState.mission = draftState.mission.filter(
              (id) => id !== action.payload.id
            )
            break
          case "output_requirement":
            draftState.output_requirement =
              draftState.output_requirement.filter(
                (id) => id !== action.payload.id
              )
            break
          case "other_requirement":
            draftState.other_requirement = draftState.other_requirement.filter(
              (id) => id !== action.payload.id
            )
            break
        }

        delete draftState.data[action.payload.id]

        // if the type array is empty, delete it from the order array
        if (draftState[action.payload.type].length === 0) {
          draftState.order = draftState.order.filter(
            (type) => type !== action.payload.type
          )
        }
      })

    default:
      return state
  }
}
export default reducer
