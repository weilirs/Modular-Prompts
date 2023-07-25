import { data } from "../../data/data"
import { useActions } from "../../hooks/use-actions"
import { BlockTypes } from "../../state"
import { useState } from "react"
import { Collapse, CollapseProps, Button, Tooltip } from "antd"

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
  const { insertBlockAfter } = useActions()
  const selected = data.tables?.find(
    (block) => block.category === selectedButton
  )

  const items: CollapseProps["items"] = selected?.minorCategories?.map(
    (minor) => ({
      label: minor.name,
      key: minor.name,
      children: (
        <div className="grid grid-cols-2 gap-2">
          {minor.legos?.map((block) => (
            <Tooltip title={block.detail}>
              <Button
                key={block.keyWord}
                onClick={() => {
                  if (isBlockTypes(selected.category)) {
                    insertBlockAfter(
                      selected.category,
                      block.keyWord,
                      block.detail
                    )
                  }
                }}
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "block",
                  width: "100%",
                }}
              >
                {block.keyWord}
              </Button>
            </Tooltip>
          ))}
        </div>
      ),
    })
  )

  return (
    <div className="flex flex-col gap-4 border border-blue-800 overflow-auto">
      <Collapse items={items} ghost={true} />
    </div>
  )
}

export default BlocksContainer
