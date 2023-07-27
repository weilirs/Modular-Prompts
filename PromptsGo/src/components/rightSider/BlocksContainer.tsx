import { useActions } from "../../hooks/use-actions"
import { useState, useEffect, useRef } from "react"
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

  const {
    insertBlockAfter,
    addNewBlock,
    deleteLego,
    addMinorCategory,
    deleteMinorCategory,
  } = useActions()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isMinorModalVisible, setIsMinorModalVisible] = useState(false)
  const [newBlockInfo, setNewBlockInfo] = useState({ keyword: "", detail: "" })
  const [newMinorInfo, setNewMinorInfo] = useState({ name: "" })
  const [currentMinor, setCurrentMinor] = useState(null) // Store the current minor
  const timer = useRef(null)

  const showModal = (minorName) => {
    setCurrentMinor(minorName)
    setIsModalVisible(true)
  }

  const showMinorModal = () => {
    setIsMinorModalVisible(true)
  }

  const handleMinorOk = () => {
    if (newMinorInfo.name) {
      addMinorCategory(selected.category, newMinorInfo.name)
    }
    setIsMinorModalVisible(false)
  }

  const handleMinorCancel = () => {
    setIsMinorModalVisible(false)
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

  const handleClick = (block) => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
      return
    }

    timer.current = setTimeout(() => {
      insertBlockAfter(selected.category, block.keyWord, block.detail)
      timer.current = null
    }, 250)
  }

  const handleDoubleClick = (minor, block) => {
    clearTimeout(timer.current)
    timer.current = null
    deleteLego(selected.category, minor.name, block.keyWord)
  }

  const handleMinorDoubleClick = (minorName) => {
    deleteMinorCategory(selected.category, minorName)
  }

  const selected = dataset.tables?.find(
    (block) => block.category === selectedButton
  )

  const items: CollapseProps["items"] = selected?.minorCategories?.map(
    (minor) => ({
      label: (
        <div
          onDoubleClick={() => handleMinorDoubleClick(minor.name)}
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
                onClick={() => handleClick(block)}
                onDoubleClick={() => handleDoubleClick(minor, block)}
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
      <Modal
        title="Add Minor Category"
        visible={isMinorModalVisible}
        onOk={handleMinorOk}
        onCancel={handleMinorCancel}
      >
        <Input
          placeholder="Category's Name"
          value={newMinorInfo.name}
          onChange={(e) =>
            setNewMinorInfo((info) => ({ ...info, name: e.target.value }))
          }
        />
      </Modal>
      <Button onClick={showMinorModal}>Add Minor Category</Button>
    </div>
  )
}

export default BlocksContainer
