import RightSider from "./components/rightSider/RightSider"
import Center from "./components/center/Center"
import LeftSider from "./components/leftSider/leftSider"
import { Provider } from "react-redux"
import { store } from "./state"
import { Col, Row, Tour } from "antd"
import { useState } from "react"

const App: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true)
  const steps: TourProps["steps"] = [
    {
      title: "Double Click to Delete",
      description: "All modulars can be deleted by double clicking",
    },
  ]
  return (
    <div className="border-t pt-4">
      <Provider store={store}>
        <Row>
          <Col span={8}>
            <LeftSider />
          </Col>

          <Col span={6}>
            <Center />
          </Col>

          <Col span={10}>
            <RightSider />
          </Col>
        </Row>
        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      </Provider>
    </div>
  )
}

export default App
