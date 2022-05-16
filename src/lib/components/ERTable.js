import React, { useMemo } from 'react'
import useScrollPercentage from "./useScrollPercentage";

const ERTable = ({ columns, rows, rowHeight, lines, ...props }) => {
  const [scrollRef, scrollPercentage] = useScrollPercentage()

  const memoizedRows = useMemo(() => {
    return rows.map((row, index) => <tr key={`endless-row-${index}`} style={{
      maxHeight: rowHeight,
      background: "#" + ((1 << 24) * Math.random() | 0).toString(16)
    }}>
      <td style={{ maxHeight: `${rowHeight}px` }}>{row.name}</td>
    </tr>)
  }, [rows, rowHeight])
  const renderedRows = useMemo(() => {
    const perc = scrollPercentage / 100
    let max = Math.ceil(rows.length * perc)
    if (max < lines) max = lines
    const tenPercent = Math.ceil(lines / 10)
    if (max + tenPercent > rows.length) {
      max = rows.length
    } else {
      max += tenPercent
    }
    let min = max - lines
    if (min - tenPercent < 0) {
      min = 0
    } else {
      min -= tenPercent
    }
    return memoizedRows.slice(min, max)
  }, [lines, memoizedRows, scrollPercentage])

  const aboveLength = scrollPercentage * rowHeight * (rows.length - lines) / 100
  const belowLength = (rowHeight * (rows.length - lines)) - aboveLength

  return (
    <div style={{ maxHeight: `${rowHeight * lines}px`, overflow: 'auto' }} ref={scrollRef}>
      <table>
        <tr style={{
          height: `${aboveLength}px`,
          visibility: 'hidden',
        }}>
          <td>Hidden</td>
        </tr>
        {renderedRows}
        <tr style={{
          height: `${belowLength}px`,
          visibility: 'hidden',
        }}>
          <td>Hidden</td>
        </tr>
      </table>
    </div>
  )
}

export default ERTable