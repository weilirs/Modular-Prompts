import { Action } from "../actions"
import { ActionType } from "../action-types"
import { Block } from "../block"
import { produce, enableMapSet } from "immer"
import { data } from "../../data/data"
import { loadState } from "../../utils/localStorage"
import { createSlice } from "@reduxjs/toolkit"

const persistedState = loadState()

let Categories = {}
if (!persistedState) {
  Categories = {
    Collections: [],
    Background: [],
    Character: [],
    Mission: [],
    output_requirement: [],
    other_requirement: [],
  }
} else {
  const tables = persistedState.blocks.dataset.tables
  for (const table of tables) {
    Categories[table.category] = []
  }
}
interface BlocksState {
  order: string[] // order of types
  data: { [key: string]: Block }
  categories: { [key: string]: [] } // map from type to array of ids
  dataset: {}
}

const initialState: BlocksState = {
  order: [],
  data: {},
  categories: Categories,
  dataset: persistedState ? persistedState.blocks.dataset : data,
}

const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    insertBlockAfter(state, action) {
      const newBlock: Block = {
        id: Math.random().toString(36).substr(2, 9),
        category: action.payload.category,
        keyWord: action.payload.keyWord,
        detail: action.payload.detail,
      }

      // insert this id to the corresponding type array
      const cat = action.payload.category

      if (state.categories[cat]) {
        state.categories[cat].push(newBlock.id)
      }

      state.data[newBlock.id] = newBlock
      // if the type is not in the order array, add it
      if (!state.order.includes(action.payload.category)) {
        state.order.push(action.payload.category)
      }
    },
    deleteBlock(state, action) {
      // delete the id from the corresponding type array
      const cat = action.payload.category
      const newValues = state.categories[cat].filter(
        (id) => id !== action.payload.id
      )
      state.categories[cat] = newValues

      delete state.data[action.payload.id]

      // if the type array is empty, delete it from the order array
      if (state.categories[cat].length === 0) {
        state.order = state.order.filter((category) => category !== cat)
      }
    },
    updateBlock(state, action) {
      state.data[action.payload.id].detail = action.payload.detail
    },
    addNewLego(state, action) {
      const category = action.payload.category
      const name = action.payload.name
      const newLego = {
        keyWord: action.payload.keyWord,
        detail: action.payload.detail,
        useTime: 1,
      }
      for (const cat of state.dataset.tables) {
        if (cat.category === category) {
          const minorCategories = cat.minorCategories
          for (const minorCat of minorCategories) {
            if (name === minorCat.name) {
              minorCat.legos.push(newLego)
            }
          }
        }
      }
    },
    deleteLego(state, action) {
      const category = action.payload.category
      const name = action.payload.name
      const keyWord = action.payload.keyWord
      for (const cat of state.dataset.tables) {
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
    },
    updateLego(state, action) {
      const category = action.payload.category
      const name = action.payload.name
      const newLego = {
        keyWord: action.payload.keyWord,
        detail: action.payload.detail,
        useTime: 1,
      }
      state.dataset.tables.forEach((table) => {
        if (table.category === category) {
          table.legos = table.legos.map((lego) => {
            if (lego.keyWord === name) {
              return newLego
            } else {
              return lego
            }
          })
        }
      })
    },
    addMinorCategory(state, action) {
      const category = action.payload.category
      const name = action.payload.name
      state.dataset.tables.forEach((table) => {
        if (table.category === category) {
          table.minorCategories.push({
            name: name,
            number: 0,
            legos: [],
          })
        }
      })
    },
    deleteMinorCategory(state, action) {
      const category = action.payload.category
      const name = action.payload.name
      for (const cat of state.dataset.tables) {
        if (cat.category === category) {
          cat.minorCategories = cat.minorCategories.filter(
            (minorCat) => minorCat.name !== name
          )
        }
      }
    },
    addNewCategory(state, action) {
      const category = action.payload
      state.dataset.tables.push({
        category: category,
        minorCategories: [],
      })
      state.categories[category] = []
    },
    deleteCategory(state, action) {
      const category = action.payload
      state.dataset.tables = state.dataset.tables.filter(
        (cat) => cat.category !== category
      )
      delete state.categories[category]
    },
    clear(state) {
      state.order = []
      state.data = {}

      for (const category in state.categories) {
        state.categories[category] = []
      }
    },
    collect(state, action) {
      const legoCollections = action.payload.legos
      const collectionName = action.payload.collectionName
      if (state.categories.hasOwnProperty("Collections")) {
        for (const cat of state.dataset.tables) {
          if (cat.category === "Collections") {
            cat.minorCategories.push({
              name: collectionName,
              number: 0,
              legos: legoCollections,
            })
          }
        }
      } else {
        state.dataset.tables.push({
          category: "Collections",
          minorCategories: [
            {
              name: collectionName,
              number: 0,
              legos: legoCollections,
            },
          ],
        })
        state.categories["Collections"] = []
      }
    },
  },
})

export const {
  insertBlockAfter,
  deleteBlock,
  updateBlock,
  addNewLego,
  deleteLego,
  updateLego,
  addMinorCategory,
  deleteMinorCategory,
  addNewCategory,
  deleteCategory,
  clear,
  collect,
} = blocksSlice.actions
export default blocksSlice.reducer
