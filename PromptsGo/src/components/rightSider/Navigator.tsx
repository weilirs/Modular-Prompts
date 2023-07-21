type NavigatorProps = {
  setSelectedButton: (value: string) => void
}

const Navigator: React.FC<NavigatorProps> = ({ setSelectedButton }) => {
  return (
    <div className="border-4 border-black p-4">
      <div className="grid grid-cols-6 gap-4 divide-x divide-gray-300">
        <button
          className="text-center"
          onClick={() => setSelectedButton("Character")}
        >
          Character
        </button>
        <button className="text-center" onClick={() => setSelectedButton("2")}>
          02
        </button>
        <button className="text-center" onClick={() => setSelectedButton("3")}>
          03
        </button>
        <button className="text-center" onClick={() => setSelectedButton("4")}>
          04
        </button>
        <button className="text-center" onClick={() => setSelectedButton("5")}>
          05
        </button>
        <button className="text-center" onClick={() => setSelectedButton("6")}>
          06
        </button>
      </div>
    </div>
  )
}
export default Navigator
