import type { MenuProps } from "antd"
import { Menu } from "antd"
import React, { useState, useEffect } from "react"

type NavigatorProps = {
  setSelectedButton: (value: string) => void
}

const Navigator: React.FC<NavigatorProps> = ({ setSelectedButton }) => {
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
  const [current, setCurrent] = useState("Background")

  useEffect(() => {
    setSelectedButton(current)
  }, [])

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key)
    setSelectedButton(e.key)
  }
  return (
    <Menu
      mode="horizontal"
      items={items}
      onClick={onClick}
      selectedKeys={[current]}
    />
  )
}

export default Navigator
