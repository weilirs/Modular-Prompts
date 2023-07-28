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
    blocks: { order, data, categories },
  } = useTypedSelector((state) => state)

  const [blockCollectionState, setblockCollectionState] = useState([])

  useEffect(() => {
    const collection = []
    for (let i = 0; i < order.length; i++) {
      const elements = categories.get(order[i])
      collection.push(...elements)
    }
    setblockCollectionState(collection.map((id) => data[id]))
  }, [order, data, categories])

  const blocksText = blockCollectionState
    .map((block) => `${block.category}: ${block.detail}`)
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
