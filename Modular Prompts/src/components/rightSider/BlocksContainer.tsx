import { useState, useRef } from "react"
import { Collapse, CollapseProps, Button, Tooltip, Modal, Input } from "antd"
import type { RootState } from "../../state/store"
import { AppDispatch } from "../../state/store"
import {
  insertBlockAfter,
  addNewLego,
  deleteLego,
  addMinorCategory,
  deleteMinorCategory,
} from "../../state/reducers/blocksReducers"
import { useSelector, useDispatch } from "react-redux"

interface BlocksContainerProps {
  selectedButton: string
}

type BlockType = {
  keyWord: string
  detail: string
}
type MinorType = {
  name?: string
  number?: number
  legos?: {
    keyWord: string
    detail: string
    varNum?: number
  }[]
}
const BlocksContainer: React.FC<BlocksContainerProps> = ({
  selectedButton,
}) => {
  const dataset = useSelector((state: RootState) => state.blocks.dataset)
  const dispatch: AppDispatch = useDispatch()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isMinorModalVisible, setIsMinorModalVisible] = useState(false)
  const [newBlockInfo, setNewBlockInfo] = useState({ keyword: "", detail: "" })
  const [newMinorInfo, setNewMinorInfo] = useState({ name: "" })
  const [currentMinor, setCurrentMinor] = useState<string | null>(null) // Store the current minor
  const timer = useRef<NodeJS.Timeout | null>(null)

  const showMinorModal = () => {
    setIsMinorModalVisible(true)
  }

  const handleMinorOk = () => {
    if (newMinorInfo.name) {
      dispatch(
        addMinorCategory({
          category: selected!.category,
          name: newMinorInfo.name,
        })
      )
      setNewMinorInfo({ name: "" })
    }
    setIsMinorModalVisible(false)
  }

  const handleMinorCancel = () => {
    setIsMinorModalVisible(false)
  }

  const showModal = (minorName: string) => {
    setCurrentMinor(minorName)
    setIsModalVisible(true)
  }

  const handleOk = () => {
    if (currentMinor) {
      if (selected && newBlockInfo) {
        dispatch(
          addNewLego({
            category: selected.category,
            name: currentMinor,
            keyWord: newBlockInfo.keyword,
            detail: newBlockInfo.detail,
          })
        )

        setNewBlockInfo({ keyword: "", detail: "" })
      }
    }

    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleClick = (block: BlockType) => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
      return
    }

    timer.current = setTimeout(() => {
      dispatch(
        insertBlockAfter({
          category: selected!.category,
          keyWord: block.keyWord,
          detail: block.detail,
        })
      )
      timer.current = null
    }, 250)
  }

  const handleDoubleClick = (minor: MinorType, block: BlockType) => {
    if (timer.current !== null) {
      clearTimeout(timer.current)
    }
    timer.current = null
    dispatch(
      deleteLego({
        category: selected!.category,
        name: minor.name!,
        keyWord: block.keyWord,
      })
    )
  }

  const handleMinorDoubleClick = (minorName: string) => {
    dispatch(
      deleteMinorCategory({ category: selected!.category, name: minorName })
    )
  }

  const selected = dataset.tables?.find(
    (block) => block.category === selectedButton
  )

  const items: CollapseProps["items"] = selected?.minorCategories?.map(
    (minor) => ({
      label: (
        <div
          onDoubleClick={() => handleMinorDoubleClick(minor.name!)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {minor.name}
          <Button onClick={() => showModal(minor.name!)}>Add Block</Button>
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
    (selectedButton !== "Add New Category" && (
      <div className="flex flex-col gap-4 border rounded-bl overflow-auto">
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
            placeholder="Minor Category's Name"
            value={newMinorInfo.name}
            onChange={(e) =>
              setNewMinorInfo((info) => ({ ...info, name: e.target.value }))
            }
          />
        </Modal>
        <Button onClick={showMinorModal} className="m-4">
          Add Minor Category
        </Button>
      </div>
    )) || <div></div>
  )
}

export default BlocksContainer
