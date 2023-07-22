import RightSider from "./components/rightSider/RightSider"
import Center from "./components/center/Center"
import LeftSider from "./components/leftSider/leftSider"
import { Provider } from "react-redux"
import { store } from "./state"

const App = () => {
  return (
    <Provider store={store}>
      <div className="flex">
        <div className="w-1/3 h-500">
          <LeftSider />
        </div>
        <div className="w-1/3 h-500">
          <Center />
        </div>
        <div className="w-1/3 h-500">
          <RightSider />
        </div>
      </div>
    </Provider>
  )
}

export default App
