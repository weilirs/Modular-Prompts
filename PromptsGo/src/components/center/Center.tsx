import { useActions } from "../../hooks/use-actions"
import { useTypedSelector } from "../../hooks/use-typed-selector"
import { useEffect, useState } from "react"
import { Input } from "antd"

const Center: React.FC = () => {
  const { deleteBlock, updateBlock } = useActions()

  // retrieve the state from redux store
  const {
    blocks: { order, data, categories },
  } = useTypedSelector((state) => state)

  const [collectionState, setCollectionState] = useState([])
  const [blockCollectionState, setblockCollectionState] = useState([])

  useEffect(() => {
    const collection = []
    for (let i = 0; i < order.length; i++) {
      const elements = categories.get(order[i])
      collection.push(...elements)
    }
    setCollectionState(collection)

    const blockCollection = collection.map((id) => data[id])
    setblockCollectionState(blockCollection)
  }, [order, data, categories])

  const renderedBlocks = blockCollectionState.map((block) => (
    <Input
      className="mb-4"
      placeholder={block.keyWord}
      value={block.detail}
      onChange={(e) => updateBlock(block.id, e.target.value)}
      onDoubleClick={() => {
        deleteBlock(block.category, block.id)
      }}
    />
  ))

  return (
    <div className="border-4 border-black p-4">
      <div className="flex flex-col ">{renderedBlocks}</div>
    </div>
  )
}

export default Center
