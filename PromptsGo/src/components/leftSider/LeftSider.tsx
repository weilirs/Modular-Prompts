import { useTypedSelector } from "../../hooks/use-typed-selector"
import { useEffect, useState } from "react"
import { useActions } from "../../hooks/use-actions"
import { Button, Input, Modal } from "antd"
import OriginalText from "./OriginalText"
import promptperfect from "./PromptsPerfect"
import OptimizedText from "./OptimizedText"
const LeftSider: React.FC = () => {
  const [optimizedText, setOptimizedText] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [newInfo, setNewInfo] = useState({ collectionName: "" })

  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey") || "")

  const { clear, collect } = useActions()
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
    .map((block) =>
      block.category !== "Collections"
        ? `${block.category}: ${block.detail}`
        : block.detail
    )
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

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    if (newInfo.collectionName) {
      collect(blockCollectionState, newInfo.collectionName)
      setNewInfo({ collectionName: "" })
    }
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div className="ml-2">
      <OriginalText blocksText={blocksText} />
      <div className="mt-2">
        <Modal
          title="Add New Collection"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input
            placeholder="Collection's Name"
            value={newInfo.collectionName}
            onChange={(e) =>
              setNewInfo((info) => ({
                ...info,
                collectionName: e.target.value,
              }))
            }
          />
        </Modal>
        <div className="mb-2">
          <div className="flex justify-around mb-2 border-b pb-2">
            <Button onClick={showModal}>Collect</Button>
            <Button onClick={() => copyToClipboard(blocksText)}>
              Copy Original
            </Button>
            <Button onClick={() => clear()}>Clear All</Button>
          </div>
          <div className="flex justify-around">
            <Button onClick={() => prompts()}>Optimize</Button>
            <Button onClick={() => copyToClipboard(optimizedText)}>
              Copy Optimized
            </Button>
          </div>
        </div>
        <div className="mb-2">
          <Input.Password
            placeholder={`Enter "PromptPerfect" API Key for Optimized Prompts`}
            value={apiKey}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <OptimizedText optimizedText={optimizedText} />
    </div>
  )
}

export default LeftSider
