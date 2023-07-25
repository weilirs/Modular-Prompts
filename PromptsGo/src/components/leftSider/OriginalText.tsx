const OriginalText: React.FC<{ blocksText: string }> = ({ blocksText }) => {
  const blockslist = blocksText.split("\n").map((block, index) => {
    return <li key={index}>{block}</li>
  })

  return (
    <>
      <ul>{blockslist}</ul>
    </>
  )
}

export default OriginalText
