import React from "react"

export function ProgrammeOptions({
  programmes,
  onProgrammeSelected,
  selectedProgrammeId,
}) {
  const options = programmes.map(({ programmeName, programmeId }) => {
    return (
      <option key={programmeId} value={programmeId}>
        {programmeName}
      </option>
    )
  })
  return (
    <select onChange={onProgrammeSelected} value={selectedProgrammeId}>
      {options}
    </select>
  )
}
