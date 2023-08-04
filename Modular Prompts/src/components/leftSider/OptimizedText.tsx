const OptimizedText: React.FC<{ optimizedText: string }> = ({
  optimizedText,
}) => {
  if (!optimizedText) {
    return <div>Click the "Optimize" button for optimized prompts</div>
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
