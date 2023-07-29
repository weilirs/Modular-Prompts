import type { MenuProps } from "antd"
import { Menu, Modal, Input } from "antd"
import React, { useState, useEffect } from "react"
import { useTypedSelector } from "../../hooks/use-typed-selector"
import { useActions } from "../../hooks/use-actions"

type NavigatorProps = {
  setSelectedButton: (value: string) => void
}

const Navigator: React.FC<NavigatorProps> = ({ setSelectedButton }) => {
  const {
    blocks: { categories },
  } = useTypedSelector((state) => state)

  const { addNewCategory, deleteCategory } = useActions()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [newCategoryInfo, setNewCategoryInfo] = useState({ category: "" })
  const items: MenuProps["items"] = []

  // Iterate over keys of new_categories object
  categories.forEach((value, cat) => {
    items.push({
      label: cat,
      key: cat,
      onClick: () => setSelectedButton(cat),
    })
  })

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    if (newCategoryInfo.category) {
      addNewCategory(newCategoryInfo.category)
    }
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const addNewCategoryButton = {
    label: "Add New Category",
    key: "Add New Category",
    onClick: () => {
      showModal()
    },
  }
  items.push(addNewCategoryButton)
  const [current, setCurrent] = useState("Background")

  useEffect(() => {
    setSelectedButton(current)
  }, [])

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key)
    setSelectedButton(e.key)
  }

  const onDoubleClick = (key: string) => {
    deleteCategory(key)
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
