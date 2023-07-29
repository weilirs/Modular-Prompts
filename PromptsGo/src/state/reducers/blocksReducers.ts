import { Action } from "../actions"
import { ActionType } from "../action-types"
import { Block } from "../block"
import { produce, enableMapSet } from "immer"
import { data } from "../../data/data"
import { loadState } from "../../utils/localStorage"

enableMapSet()
const persistedState = loadState()
const Categories = new Map()
if (!persistedState) {
  Categories.set("Collections", [])
  Categories.set("Background", [])
  Categories.set("Character", [])
  Categories.set("Mission", [])
  Categories.set("output_requirement", [])
  Categories.set("other_requirement", [])
} else {
  const tables = persistedState.blocks.dataset.tables
  for (const table of tables) {
    Categories.set(table.category, [])
  }
}
interface BlocksState {
  order: string[] // order of types
  data: { [key: string]: Block }
  categories: Map<string, string[]> // map from type to array of ids
  dataset: {}
}

const initialState: BlocksState = {
  order: [],
  data: {},
  categories: Categories,
  dataset: persistedState ? persistedState.blocks.dataset : data,
}

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.INSERT_BLOCK_AFTER:
      return produce(state, (draftState) => {
        const newBlock: Block = {
          id: Math.random().toString(36).substr(2, 9),
          category: action.payload.category,
          keyWord: action.payload.keyWord,
          detail: action.payload.detail,
        }

        // insert this id to the corresponding type array
        const cat = action.payload.category

        draftState.categories.forEach((value, category) => {
          if (category === cat) {
            draftState.categories.get(category).push(newBlock.id)
          }
        })

        draftState.data[newBlock.id] = newBlock
        // if the type is not in the order array, add it
        if (!draftState.order.includes(action.payload.category)) {
          draftState.order.push(action.payload.category)
        }
      })
    case ActionType.DELETE_BLOCK:
      return produce(state, (draftState) => {
        // delete the id from the corresponding type array
        const cat = action.payload.category
        const newValues = draftState.categories
          .get(cat)
          .filter((id) => id !== action.payload.id)
        draftState.categories.set(cat, newValues)

        delete draftState.data[action.payload.id]

        // if the type array is empty, delete it from the order array
        if (draftState.categories.get(cat).length === 0) {
          draftState.order = draftState.order.filter(
            (category) => category !== cat
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
        draftState.categories.set(category, [])
      })

    case ActionType.DELETE_CATEGORY:
      return produce(state, (draftState) => {
        const category = action.payload.category
        draftState.dataset.tables = draftState.dataset.tables.filter(
          (cat) => cat.category !== category
        )
        draftState.categories.delete(category)
      })

    case ActionType.CLEAR:
      return produce(state, (draftState) => {
        // reset everything in the state
        draftState.order = []
        draftState.data = {}

        draftState.categories.forEach((value, category) => {
          draftState.categories.set(category, [])
        })
      })

    case ActionType.COLLECT:
      return produce(state, (draftState) => {
        const legoCollections = action.payload.legos
        if (draftState.categories.has("Collections")) {
          for (const cat of draftState.dataset.tables) {
            if (cat.category === "Collections") {
              cat.minorCategories.push({
                name: `Untitled${cat.minorCategories.length + 1}`,
                number: 0,
                legos: legoCollections,
              })
            }
          }
        } else {
          draftState.dataset.tables.push({
            category: "Collections",
            minorCategories: [
              {
                name: `Untitled1`,
                number: 0,
                legos: legoCollections,
              },
            ],
          })
          draftState.categories.set("Collections", [])
        }
      })

    default:
      return state
  }
}
export default reducer
