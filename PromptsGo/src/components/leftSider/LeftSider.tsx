import { useTypedSelector } from "../../hooks/use-typed-selector"
import { useEffect, useState } from "react"

const LeftSider: React.FC = () => {
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

  const blockslist = blockCollectionState.map((block, index) => {
    return (
      <li key={index}>
        {block.type}: {block.content}
      </li>
    )
  })
  return <ul>{blockslist}</ul>
}

export default LeftSider
