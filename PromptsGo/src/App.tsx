import RightSider from "./components/rightSider/RightSider"
import Center from "./components/center/Center"
import LeftSider from "./components/leftSider/leftSider"
import { Provider } from "react-redux"
import { store } from "./state"
import { Col, Row } from "antd"

const App = () => {
  return (
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
    </Provider>
  )
}

export default App
