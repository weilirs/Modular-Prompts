const OriginalText: React.FC<{ blocksText: string }> = ({ blocksText }) => {
  const blockslist = blocksText.split("\n").map((block, index) => {
    return <li key={index}>{block}</li>
  })

  return (
    <div className="border-b pb-2">
      <ul>{blockslist}</ul>
    </div>
  )
}

export default OriginalText
