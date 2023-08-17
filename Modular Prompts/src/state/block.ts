// export type BlockTypes =
//   | "Background"
//   | "Character"
//   | "Mission"
//   | "output_requirement"
//   | "other_requirement"

export interface Block {
  id: string
  category: string
  keyWord: string
  detail: string
}
