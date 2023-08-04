import type { MenuProps } from "antd"
import { Menu, Modal, Input } from "antd"
import React, { useState, useEffect } from "react"
import type { RootState } from "../../state/store"
import { useSelector, useDispatch } from "react-redux"
import {
  addNewCategory,
  deleteCategory,
} from "../../state/reducers/blocksReducers"
type NavigatorProps = {
  setSelectedButton: (value: string) => void
}

const Navigator: React.FC<NavigatorProps> = ({ setSelectedButton }) => {
  const categories = useSelector((state: RootState) => state.blocks.categories)
  const dispatch = useDispatch()

  const [isModalVisible, setIsModalVisible] = useState(false)

  const [newCategoryInfo, setNewCategoryInfo] = useState({ category: "" })
  const items: MenuProps["items"] = []

  // Iterate over keys of new_categories object
  for (const key in categories) {
    items.push({
      label: key,
      key: key,
      onClick: () => setSelectedButton(key),
    })
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    if (newCategoryInfo.category) {
      dispatch(addNewCategory(newCategoryInfo.category))
      setNewCategoryInfo({ category: "" })
    }
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const addNewCategoryButton = {
    label: "Add New Category",
    key: "Add New Category",
  }
  items.push(addNewCategoryButton)
  const [current, setCurrent] = useState("Background")

  useEffect(() => {
    setSelectedButton(current)
  }, [])

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key)
    setSelectedButton(e.key)
    if (e.key === "Add New Category") {
      showModal()
    }
  }

  const onDoubleClick = (key: string) => {
    dispatch(deleteCategory(key))
  }

  return (
    <div>
      <Menu mode="horizontal" onClick={onClick} selectedKeys={[current]}>
        {items.map((item) => (
          <Menu.Item
            key={item.key}
            onDoubleClick={() => onDoubleClick(item.key)}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>

      <Modal
        title="Add New Category"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Category's Name"
          value={newCategoryInfo.category}
          onChange={(e) =>
            setNewCategoryInfo({ ...newCategoryInfo, category: e.target.value })
          }
        />
      </Modal>
    </div>
  )
}

export default Navigator
