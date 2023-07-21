import { useActions } from "../../hooks/use-actions"
import { useTypedSelector } from "../../hooks/use-typed-selector"
import { useEffect, useState } from "react"

const Center: React.FC = () => {
  const { deleteBlock } = useActions()

  // retrieve the state from redux store
  const {
    blocks: {
      order,
      data,
      Background,
      Character,
      Mission,
      output_requirement,
      other_requirement,
    },
  } = useTypedSelector((state) => state)

  const [collectionState, setCollectionState] = useState([])
  const [blockCollectionState, setblockCollectionState] = useState([])

  useEffect(() => {
    const collection = []
    for (let i = 0; i < order.length; i++) {
      if (order[i] === "Background") collection.push(...Background)
      else if (order[i] === "Character") collection.push(...Character)
      else if (order[i] === "Mission") collection.push(...Mission)
      else if (order[i] === "output_requirement")
        collection.push(...output_requirement)
      else if (order[i] === "other_requirement")
        collection.push(...other_requirement)
    }
    setCollectionState(collection)

    const blockCollection = collection.map((id) => data[id])
    setblockCollectionState(blockCollection)
  }, [
    order,
    data,
    Background,
    Character,
    Mission,
    output_requirement,
    other_requirement,
  ])

  const renderedBlocks = blockCollectionState.map((block) => (
    <button
      key={block.id}
      onDoubleClick={() => {
        deleteBlock(block.type, block.id)
      }}
    >
      {block.type}: {block.content}
    </button>
  ))

  return (
    <div className="border-4 border-black p-4">
      <div className="flex flex-col">{renderedBlocks}</div>
    </div>
  )
}

export default Center
