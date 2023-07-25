export type BlockTypes =
  | "Background"
  | "Character"
  | "Mission"
  | "output_requirement"
  | "other_requirement"

export interface Block {
  id: string
  type: BlockTypes
  content: string
  detail: string
}
