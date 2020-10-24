import React, { useMemo } from "react"
import { useTable } from "react-table"
import { camelCaseToNormal } from "../../utils"

//TODO: this is a good candidate for a decorator?

function makeTableData(rawData) {
  const rawColumns = Object.keys(rawData[0]).reduce((acc, k) => {
    if (k === "learnerId") {
      return acc
    }
    return [
      ...acc,
      {
        Header:
          k === "firstName" ? camelCaseToNormal("Name") : camelCaseToNormal(k),
        accessor: k,
      },
    ]
  }, [])

  return [rawData, rawColumns]
}

export function PBTable({ payload }) {
  //object with key-value = header cell-val
  const [rawData, rawColumns] = makeTableData(payload)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = useMemo(() => rawData, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => rawColumns, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })
  return (
    // apply the table props
    <table {...getTableProps()} className="learner-table">
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th
                    className="learner-table-cell head"
                    {...column.getHeaderProps()}
                  >
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td
                        suppressContentEditableWarning={true}
                        contentEditable="true" //does this update the state though? This doesn't update the state since React is not keeping track of actual DOM changes
                        className="learner-table-cell"
                        {...cell.getCellProps()}
                      >
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    )
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
