import Navigator from "./Navigator"
import { useState } from "react"
import BlocksContainer from "./BlocksContainer"
const RightSider = () => {
  // pass the information of the selected button in Navigator to BlocksContainer
  const [selectedButton, setSelectedButton] = useState("Background")
  return (
    <div className="h-64">
      <Navigator setSelectedButton={setSelectedButton} />
      <BlocksContainer selectedButton={selectedButton} />
    </div>
  )
}
export default RightSider
