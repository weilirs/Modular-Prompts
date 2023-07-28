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
    blocks: { new_categories },
  } = useTypedSelector((state) => state)

  const { addNewCategory } = useActions()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [newCategoryInfo, setNewCategoryInfo] = useState({ category: "" })
  const items: MenuProps["items"] = [
    {
      label: "Collection",
      key: "Collection",
      onClick: () => setSelectedButton("Collection"),
    },
    {
      label: "Background",
      key: "Background",
      onClick: () => setSelectedButton("Background"),
    },
    {
      label: "Mission",
      key: "Mission",
      onClick: () => setSelectedButton("Mission"),
    },
    {
      label: "Character",
      key: "Character",
      onClick: () => setSelectedButton("Character"),
    },
    {
      label: "output_requirement",
      key: "output_requirement",
      onClick: () => setSelectedButton("output_requirement"),
    },
    {
      label: "other_requirement",
      key: "other_requirement",
      onClick: () => setSelectedButton("other_requirement"),
    },
  ]

  // Iterate over keys of new_categories object
  Object.keys(new_categories).forEach((category) => {
    items.push({
      label: category,
      key: category,
      onClick: () => setSelectedButton(category),
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
  return (
    <div>
      <Menu
        mode="horizontal"
        items={items}
        onClick={onClick}
        selectedKeys={[current]}
      />
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
