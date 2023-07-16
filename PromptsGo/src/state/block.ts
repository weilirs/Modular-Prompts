export type BlockTypes =
  | "background"
  | "character"
  | "mission"
  | "output_requirement"
  | "other_requirement"

export interface Block {
  id: string
  type: BlockTypes
  content: string
}
