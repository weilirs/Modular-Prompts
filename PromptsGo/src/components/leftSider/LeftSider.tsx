import { useTypedSelector } from "../../hooks/use-typed-selector"
import { useEffect, useState } from "react"
import { useActions } from "../../hooks/use-actions"
import { Button, Input } from "antd"
import OriginalText from "./OriginalText"
import promptperfect from "./PromptsPerfect"
import OptimizedText from "./OptimizedText"
const LeftSider: React.FC = () => {
  const [optimizedText, setOptimizedText] = useState("")
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey") || "")

  const { clear } = useActions()
  const {
    blocks: {
      order,
      data,
      Background,
      Character,
      Mission,
      output_requirement,
      other_requirement,
      new_categories,
    },
  } = useTypedSelector((state) => state)

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
      else if (order[i] in new_categories)
        collection.push(...new_categories[order[i]])
    }
    setblockCollectionState(collection.map((id) => data[id]))
  }, [
    order,
    data,
    Background,
    Character,
    Mission,
    output_requirement,
    other_requirement,
    new_categories,
  ])

  const blocksText = blockCollectionState
    .map((block) => `${block.type}: ${block.detail}`)
    .join("\n")

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      console.log("Copied to clipboard")
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleInputChange = (event) => {
    setApiKey(event.target.value)
  }

  const prompts = async () => {
    try {
      const response = await promptperfect(blocksText, "chatgpt", apiKey)
      const optimized = await response.json()
      setOptimizedText(optimized.result.promptOptimized) // add this line
    } catch (err) {
      console.error("Failed to optimize text: ", err)
    }
  }

  return (
    <>
      <OriginalText blocksText={blocksText} />
      <Button onClick={() => copyToClipboard(blocksText)}>Copy All</Button>
      <Button onClick={() => clear()}>Clear All</Button>
      <Button onClick={() => prompts()}>Optimize</Button>
      <Input
        placeholder={"Enter API Key for Optimized Prompts"}
        value={apiKey}
        onChange={handleInputChange}
      />
      <OptimizedText optimizedText={optimizedText} />
    </>
  )
}

export default LeftSider
