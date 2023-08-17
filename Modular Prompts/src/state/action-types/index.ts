import { DataType } from "../../data/DataType"
export interface PayloadType {
  id: string
  category: string
  keyWord: string
  detail: string
  name: string
}

export interface ActionType {
  type: string
  payload: PayloadType
}

export interface StateType {
  dataset: DataType
}
