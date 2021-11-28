export const displayTextWithNewLines = (text: string) => {
  const textParagraphs = text.split('\n')
  // eslint-disable-next-line react/no-array-index-key
  const paragraphs = textParagraphs.map((x, i) => <p key={i}>{x}</p>)
  return <>{paragraphs}</>
}
