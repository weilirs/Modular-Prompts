import { deleteBlock, updateBlock } from "../../state/reducers/blocksReducers"
import type { RootState } from "../../state/store"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { Input } from "antd"

const Center: React.FC = () => {
  const categories = useSelector((state: RootState) => state.blocks.categories)
  const order = useSelector((state: RootState) => state.blocks.order)
  const data = useSelector((state: RootState) => state.blocks.data)
  const dispatch = useDispatch()

  const [collectionState, setCollectionState] = useState([])
  const [blockCollectionState, setblockCollectionState] = useState([])

  useEffect(() => {
    const collection = []
    for (let i = 0; i < order.length; i++) {
      const elements = categories[order[i]]
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
      onChange={(e) =>
        dispatch(updateBlock({ id: block.id, detail: e.target.value }))
      }
      onDoubleClick={() => {
        dispatch(deleteBlock({ category: block.category, id: block.id }))
      }}
    />
  ))

  return (
    <div className="border-l border-r m-2 h-screen">
      <div className="m-2">{renderedBlocks}</div>
    </div>
  )
}

export default Center
