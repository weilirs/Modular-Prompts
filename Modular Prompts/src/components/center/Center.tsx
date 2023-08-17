import { deleteBlock, updateBlock } from "../../state/reducers/blocksReducers"
import type { RootState } from "../../state/store"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState, useRef } from "react"
import { Input, Modal, Button } from "antd"
import { AppDispatch } from "../../state/store"

interface Block {
  id: string
  detail: string
  category: string
  keyWord: string
}

type ModalVisibilityType = { [key: string]: boolean }

const Center: React.FC = () => {
  const categories = useSelector((state: RootState) => state.blocks.categories)
  const order = useSelector((state: RootState) => state.blocks.order)
  const data = useSelector((state: RootState) => state.blocks.data)
  const dispatch: AppDispatch = useDispatch()
  const [collectionState, setCollectionState] = useState<string[]>([])
  const [blockCollectionState, setblockCollectionState] = useState<Block[]>([])
  const [modalVisibility, setModalVisibility] = useState<ModalVisibilityType>(
    {}
  )
  const [inputValues, setInputValues] = useState(
    blockCollectionState.reduce(
      (acc: { [key: string]: string }, block: Block) => {
        acc[block.id] = block.detail
        return acc
      },
      {}
    )
  )

  const handleOk = (id: string) => {
    return () => {
      dispatch(updateBlock({ id: id, detail: inputValues[id] }))
      const newVisibility = { ...modalVisibility }
      newVisibility[id] = false // close the modal for this block
      setModalVisibility(newVisibility)
    }
  }

  const handleCancel = (id: string) => {
    return () => {
      const newVisibility = { ...modalVisibility }
      newVisibility[id] = false // close the modal for this block
      setModalVisibility(newVisibility)
    }
  }

  const handleChange = (id: string, value: string) => {
    const newInputValues = { ...inputValues }
    newInputValues[id] = value
    setInputValues(newInputValues)
  }

  const handleButtonClick = (id: string) => {
    return () => {
      // Clear any existing timeouts (in case of a rapid double click)
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current)
      }

      // Set a timeout for the single click action
      clickTimeoutRef.current = setTimeout(() => {
        const newVisibility = { ...modalVisibility }
        newVisibility[id] = true // show the modal for this block
        setModalVisibility(newVisibility)
      }, 200) // 200ms delay, can adjust as needed
    }
  }

  const handleButtonDoubleClick = (id: string, category: string) => {
    // Clear the timeout to prevent modal from opening
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
    }

    dispatch(deleteBlock({ category: category, id: id }))
  }

  useEffect(() => {
    const collection: string[] = []
    for (let i = 0; i < order.length; i++) {
      const elements = categories[order[i]]
      collection.push(...elements)
    }
    setCollectionState(collection)

    const blockCollection = collection.map((id) => data[id])
    setblockCollectionState(blockCollection)
  }, [order, data, categories])

  const { TextArea } = Input
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const renderedBlocks = blockCollectionState.map((block) => (
    <>
      <Modal
        key={block.id} // Adding a key since this is a list
        title="Edit Block"
        visible={modalVisibility[block.id] || false}
        onOk={handleOk(block.id)}
        onCancel={handleCancel(block.id)} // Pass block.id to handleCancel
      >
        <TextArea
          className="mb-4"
          autoSize
          placeholder={block.detail}
          value={inputValues[block.id] || block.detail}
          onChange={(e) => handleChange(block.id, e.target.value)}
        />
      </Modal>
      <Button
        className="mb-4"
        onClick={handleButtonClick(block.id)}
        onDoubleClick={() => handleButtonDoubleClick(block.id, block.category)}
      >
        {block.keyWord}
      </Button>
    </>
  ))
  return (
    <div className="border-l border-r m-2 h-screen">
      <div className="m-2">{renderedBlocks}</div>
    </div>
  )
}

export default Center
