export type DataType = {
  categories?: {
    name?: string
  }[]
  tables?: {
    category: string
    minorCategories?: {
      name?: string
      number?: number
      legos?: {
        keyWord: string
        detail: string
        varNum?: number
      }[]
    }[]
  }[]
}
