import React, { useMemo } from "react"
import { useTable } from "react-table"

function camelCaseToNormal(camelCaseStr) {
  return camelCaseStr.split("").reduce((str, char, index) => {
    //first letter is uppercased and returned
    if (index === 0) {
      return char.toUpperCase()
    }
    //if a letter is uppercase, add a space in front
    if (char === char.toUpperCase()) {
      return str + " " + char
    } else {
      return str + char
    }
  }, "")
}

//TODO: this is a good candidate for a decorator?

function makeTableData(rawData) {
  const rawColumns = Object.keys(rawData[0]).reduce((acc, k) => {
    return [...acc, { Header: camelCaseToNormal(k), accessor: k }]
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

    <table {...getTableProps()}>
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

                  <th {...column.getHeaderProps()}>
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
                      <td {...cell.getCellProps()}>
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
