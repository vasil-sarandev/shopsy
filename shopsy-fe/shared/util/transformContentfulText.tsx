export const transformContentfulText = (text) =>
  // eslint-disable-next-line react/no-array-index-key
  text.split('\n').map((line, i) => [i > 0 ? <div key={i}>{line}</div> : line])
