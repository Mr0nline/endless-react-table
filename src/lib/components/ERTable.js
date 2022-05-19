import React, { useMemo } from 'react'
import useScrollPercentage from './useScrollPercentage'

const ERTable = ({ columns, rows, rowHeight, lines, header = true, footer = false, ...props }) => {
  const [scrollRef, scrollPercentage] = useScrollPercentage()
  const memoizedColumns = useMemo(() => columns, [columns])

  const memoizedHeader = useMemo(() => {
    if (!header) return null
    return (
      <thead style={{ position: 'sticky', background: 'white', top: 0 }}>
        <tr>
          {
          memoizedColumns.map((column, index) => {
            return (
              <th
                key={`virtual-header-${index}`} style={{
                  maxHeight: `${rowHeight}px`,
                  width: column.width || 50,
                  ...(column?.styles || {}),
                  ...(column?.styles?.header || {})
                }}
              >{column?.name}
              </th>
            )
          })
        }
        </tr>
      </thead>
    )
  }, [header, memoizedColumns, rowHeight])

  const memoizedRows = useMemo(() => {
    return rows.map((row, index) => (
      <tr
        key={`virtual-row-${index}`} style={{
          maxHeight: rowHeight,
          background: '#' + ((1 << 24) * Math.random() | 0).toString(16)
        }}
      >
        {
          memoizedColumns.map((column, cellIndex) => {
            return (
              <td
                key={`virtual-row-cell-${cellIndex}`}
                style={{ maxHeight: `${rowHeight}px`, width: column.width || 50 }}
              >{row?.name}
              </td>
            )
          })
        }
      </tr>
    ))
  }, [rows, rowHeight, memoizedColumns])

  const memoizedFooter = useMemo(() => {
    if (!footer) return null
    return (
      <tfoot style={{ position: 'sticky', background: 'white', bottom: 0 }}>
        <tr>
          {
          memoizedColumns.map((column, index) => {
            return (
              <td
                key={`virtual-footer-${index}`} style={{
                  maxHeight: `${rowHeight}px`,
                  width: column.width || 50,
                  ...(column?.styles || {}),
                  ...(column?.styles?.footer || {})
                }}
              >{column?.name}
              </td>
            )
          })
        }
        </tr>
      </tfoot>
    )
  }, [footer, rowHeight, memoizedColumns])

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
  }, [rows, lines, memoizedRows, scrollPercentage])

  const aboveLength = scrollPercentage * rowHeight * (rows.length - lines) / 100
  const belowLength = (rowHeight * (rows.length - lines)) - aboveLength

  return (
    <div style={{ maxHeight: `${rowHeight * lines}px`, overflow: 'auto' }} ref={scrollRef}>
      <table>
        {memoizedHeader}
        <tbody style={{ maxHeight: `${rowHeight * memoizedRows.length}px` }}>
          <tr style={{
            height: `${aboveLength}px`,
            visibility: 'hidden'
          }}
          >
            <td>Hidden</td>
          </tr>
          {renderedRows}
          <tr style={{
            height: `${belowLength}px`,
            visibility: 'hidden'
          }}
          >
            <td>Hidden</td>
          </tr>
        </tbody>
        {memoizedFooter}
      </table>
    </div>
  )
}

export default ERTable
