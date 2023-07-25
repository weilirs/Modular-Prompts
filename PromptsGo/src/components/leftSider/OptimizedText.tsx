const OptimizedText: React.FC<{ optimizedText: string }> = ({
  optimizedText,
}) => {
  if (!optimizedText) {
    return <div>Loading...</div>
  }

  const blockslist = optimizedText.split("\n").map((block, index) => {
    return <li key={index}>{block}</li>
  })

  return (
    <>
      <ul>{blockslist}</ul>
    </>
  )
}

export default OptimizedText
