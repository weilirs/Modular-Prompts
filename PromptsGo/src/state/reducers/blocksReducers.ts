import { Action } from "../actions"
import { ActionType } from "../action-types"
import { Block } from "../block"
import { produce } from "immer"
import { data } from "../../data/data"
import { loadState } from "../../utils/localStorage"

const persistedState = loadState()
const newCategories = {}
if (persistedState) {
  for (let i = 6; i < persistedState.blocks.dataset.tables.length; i++) {
    newCategories[persistedState.blocks.dataset.tables[i].category] = []
  }
}
console.log(newCategories)
interface BlocksState {
  order: string[] // order of types
  data: { [key: string]: Block }
  Background: string[]
  Character: string[]
  Mission: string[]
  output_requirement: string[]
  other_requirement: string[]
  dataset: {}
  new_categories: {}
}

const initialState: BlocksState = {
  order: [],
  data: {},
  Background: [],
  Character: [],
  Mission: [],
  output_requirement: [],
  other_requirement: [],
  dataset: persistedState ? persistedState.blocks.dataset : data,
  new_categories: newCategories,
}

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.INSERT_BLOCK_AFTER:
      return produce(state, (draftState) => {
        const newBlock: Block = {
          id: Math.random().toString(36).substr(2, 9),
          type: action.payload.type,
          content: action.payload.content,
          detail: action.payload.detail,
        }

        // insert this id to the corresponding type array
        switch (action.payload.type) {
          case "Background":
            draftState.Background.push(newBlock.id)
            break
          case "Character":
            draftState.Character.push(newBlock.id)
            break
          case "Mission":
            draftState.Mission.push(newBlock.id)
            break
          case "output_requirement":
            draftState.output_requirement.push(newBlock.id)
            break
          case "other_requirement":
            draftState.other_requirement.push(newBlock.id)
            break

          default:
            Object.keys(draftState.new_categories).forEach((category) => {
              if (category === action.payload.type) {
                draftState.new_categories[category].push(newBlock.id)
              }
            })
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
          case "Background":
            draftState.Background = draftState.Background.filter(
              (id) => id !== action.payload.id
            )
            break
          case "Character":
            draftState.Character = draftState.Character.filter(
              (id) => id !== action.payload.id
            )
            break
          case "Mission":
            draftState.Mission = draftState.Mission.filter(
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

          default:
            Object.keys(draftState.new_categories).forEach((category) => {
              if (category === action.payload.type) {
                draftState.new_categories[category] = draftState.new_categories[
                  category
                ].filter((id) => id !== action.payload.id)
              }
            })
        }

        delete draftState.data[action.payload.id]

        // if the type array is empty, delete it from the order array
        if (draftState.new_categories[action.payload.type] !== undefined) {
          if (draftState.new_categories[action.payload.type].length === 0) {
            draftState.order = draftState.order.filter(
              (type) => type !== action.payload.type
            )
          }
        } else if (draftState[action.payload.type].length === 0) {
          draftState.order = draftState.order.filter(
            (type) => type !== action.payload.type
          )
        }
      })

    case ActionType.UPDATE_BLOCK:
      return produce(state, (draftState) => {
        draftState.data[action.payload.id].detail = action.payload.detail
      })

    case ActionType.ADD_NEW_LEGO:
      return produce(state, (draftState) => {
        const category = action.payload.category
        const name = action.payload.name
        const newLego = {
          keyWord: action.payload.keyWord,
          detail: action.payload.detail,
          useTime: 1,
          color: "yellow",
          varNum: 0,
        }
        for (const cat of draftState.dataset.tables) {
          if (cat.category === category) {
            const minorCategories = cat.minorCategories
            for (const minorCat of minorCategories) {
              if (name === minorCat.name) {
                minorCat.legos.push(newLego)
              }
            }
          }
        }
      })

    case ActionType.DELETE_LEGO:
      return produce(state, (draftState) => {
        const category = action.payload.category
        const name = action.payload.name
        const keyWord = action.payload.keyWord
        for (const cat of draftState.dataset.tables) {
          if (cat.category === category) {
            const minorCategories = cat.minorCategories
            for (const minorCat of minorCategories) {
              if (name === minorCat.name) {
                minorCat.legos = minorCat.legos.filter(
                  (lego) => lego.keyWord !== keyWord
                )
              }
            }
          }
        }
      })

    case ActionType.ADD_MINOR_CATEGORY:
      return produce(state, (draftState) => {
        const category = action.payload.category
        const name = action.payload.name
        for (const cat of draftState.dataset.tables) {
          if (cat.category === category) {
            cat.minorCategories.push({
              name: name,
              number: 0,
              legos: [],
            })
          }
        }
      })

    case ActionType.DELETE_MINOR_CATEGORY:
      return produce(state, (draftState) => {
        const category = action.payload.category
        const name = action.payload.name
        for (const cat of draftState.dataset.tables) {
          if (cat.category === category) {
            cat.minorCategories = cat.minorCategories.filter(
              (minorCat) => minorCat.name !== name
            )
          }
        }
      })

    case ActionType.ADD_NEW_CATEGORY:
      return produce(state, (draftState) => {
        const category = action.payload.category
        draftState.dataset.tables.push({
          category: category,
          minorCategories: [],
        })
        draftState.new_categories[category] = []
      })
    case ActionType.CLEAR:
      return produce(state, (draftState) => {
        // reset everything in the state
        draftState.order = []
        draftState.data = {}
        draftState.Background = []
        draftState.Character = []
        draftState.Mission = []
        draftState.output_requirement = []
        draftState.other_requirement = []
      })

    default:
      return state
  }
}
export default reducer
