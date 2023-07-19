import { data } from "../../data/data"
import { useActions } from "../../hooks/use-actions"
import { BlockTypes } from "../../state"
import { useTypedSelector } from "../../hooks/use-typed-selector"
import { useState } from "react"

interface BlocksContainerProps {
  selectedButton: string
}

function isBlockTypes(category: string): category is BlockTypes {
  return [
    "background",
    "character",
    "mission",
    "output_requirement",
    "other_requirement",
  ].includes(category)
}

const BlocksContainer: React.FC<BlocksContainerProps> = ({
  selectedButton,
}) => {
  const [buttons, setButtons] = useState<any[]>([])

  const { insertBlockAfter } = useActions()
  const temp = useTypedSelector((state) => state.blocks.data)
  const selected = data.tables?.find(
    (block) => block.category === selectedButton
  )
  const handleButtonClick = (minor: any) => {
    const newButtons = minor.legos?.map((block: any) => (
      <button
        key={block.keyWord}
        onClick={() => {
          if (isBlockTypes(selected.category)) {
            insertBlockAfter(selected.category, block.keyWord)
          }
        }}
      >
        {block.keyWord}
      </button>
    ))
    setButtons(newButtons)
  }
  return (
    // render an array of blocks based on the selected button which match the "category" in data.ts
    <div className="grid grid-cols-2 gap-4">
      {selected?.minorCategories?.map((minor) => (
        <button
          key={minor.name}
          className="text-center"
          onClick={() => handleButtonClick(minor)}
        >
          {minor.name}
        </button>
      ))}
      {buttons}
    </div>
  )
}

export default BlocksContainer
