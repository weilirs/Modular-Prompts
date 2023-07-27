import { useActions } from "../../hooks/use-actions"
import { useState, useEffect } from "react"
import { Collapse, CollapseProps, Button, Tooltip, Modal, Input } from "antd"
import { useTypedSelector } from "../../hooks/use-typed-selector"

interface BlocksContainerProps {
  selectedButton: string
}

const BlocksContainer: React.FC<BlocksContainerProps> = ({
  selectedButton,
}) => {
  const {
    blocks: { dataset },
  } = useTypedSelector((state) => state)

  const { insertBlockAfter, addNewBlock } = useActions()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [newBlockInfo, setNewBlockInfo] = useState({ keyword: "", detail: "" })
  const [currentMinor, setCurrentMinor] = useState(null) // Store the current minor

  const showModal = (minorName) => {
    setCurrentMinor(minorName)
    setIsModalVisible(true)
  }

  const handleOk = () => {
    if (currentMinor) {
      if (selected && newBlockInfo) {
        addNewBlock(
          selected.category,
          currentMinor,
          newBlockInfo.keyword,
          newBlockInfo.detail
        )
      }
    }

    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const selected = dataset.tables?.find(
    (block) => block.category === selectedButton
  )

  const items: CollapseProps["items"] = selected?.minorCategories?.map(
    (minor) => ({
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {minor.name}
          <Button onClick={() => showModal(minor.name)}>Add Block</Button>
        </div>
      ),
      key: minor.name,
      children: (
        <div className="grid grid-cols-2 gap-2">
          {minor.legos?.map((block) => (
            <Tooltip title={block.detail}>
              <Button
                key={block.keyWord}
                onClick={() => {
                  insertBlockAfter(
                    selected.category,
                    block.keyWord,
                    block.detail
                  )
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
      <Modal
        title="Add Block"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Block Keyword"
          value={newBlockInfo.keyword}
          onChange={(e) =>
            setNewBlockInfo((info) => ({ ...info, keyword: e.target.value }))
          }
        />
        <Input
          placeholder="Block Detail"
          value={newBlockInfo.detail}
          onChange={(e) =>
            setNewBlockInfo((info) => ({ ...info, detail: e.target.value }))
          }
        />
      </Modal>
    </div>
  )
}

export default BlocksContainer
