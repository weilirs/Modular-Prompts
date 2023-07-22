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
    "Background",
    "Character",
    "Mission",
    "output_requirement",
    "other_requirement",
  ].includes(category)
}

const BlocksContainer: React.FC<BlocksContainerProps> = ({
  selectedButton,
}) => {
  const [buttons, setButtons] = useState<any[]>([])
  const [expandedStates, setExpandedStates] = useState({})

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

  const toggleExpandCollapse = (categoryName) => {
    setExpandedStates((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName],
    }))
  }
  return (
    <div className="grid grid-cols-2 gap-4">
      {selected?.minorCategories?.map((minor) => (
        <div key={minor.name}>
          <button
            className="text-center"
            onClick={() => {
              handleButtonClick(minor)
              toggleExpandCollapse(minor.name)
            }}
          >
            {minor.name}
          </button>
          {/* Collapse/Expand button */}
          <button onClick={() => toggleExpandCollapse(minor.name)}></button>
          {/* Conditionally display buttons */}
          {expandedStates[minor.name] && buttons}
        </div>
      ))}
    </div>
  )
}

export default BlocksContainer
