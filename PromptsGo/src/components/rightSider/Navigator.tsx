type NavigatorProps = {
  setSelectedButton: (value: string) => void
}

const Navigator: React.FC<NavigatorProps> = ({ setSelectedButton }) => {
  return (
    <div className="border-4 border-black p-4">
      <div className="grid grid-cols-6 gap-4 divide-x divide-gray-300">
        <button
          className="text-center"
          onClick={() => setSelectedButton("Collection")}
        >
          Collection
        </button>
        <button
          className="text-center"
          onClick={() => setSelectedButton("Background")}
        >
          Background
        </button>
        <button
          className="text-center"
          onClick={() => setSelectedButton("Mission")}
        >
          Mission
        </button>
        <button
          className="text-center"
          onClick={() => setSelectedButton("Character")}
        >
          Character
        </button>
        <button
          className="text-center"
          onClick={() => setSelectedButton("output_requirement")}
        >
          output_requirement
        </button>
        <button
          className="text-center"
          onClick={() => setSelectedButton("other_requirement")}
        >
          other_requirement
        </button>
      </div>
    </div>
  )
}
export default Navigator
