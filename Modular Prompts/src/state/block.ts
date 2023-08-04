// export type BlockTypes =
//   | "Background"
//   | "Character"
//   | "Mission"
//   | "output_requirement"
//   | "other_requirement"

export interface Block {
  id: string
  type: string
  content: string
  detail: string
}
