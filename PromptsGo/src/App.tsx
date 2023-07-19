import "./App.css"
import RightSider from "./components/rightSider/RightSider"
import Center from "./components/center/Center"
import { Provider } from "react-redux"
import { store } from "./state"

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Center />
        <RightSider />
      </div>
    </Provider>
  )
}

export default App
