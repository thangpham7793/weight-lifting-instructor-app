import React from "react"

export function ProgrammeOptions({
  programmes,
  onProgrammeSelected,
  selectedProgrammeId,
}) {
  const options = programmes.map(({ programmeName, programmeId }) => {
    return (
      <option
        key={programmeId}
        value={programmeId}
        selected={programmeId === selectedProgrammeId}
      >
        {programmeName}
      </option>
    )
  })
  return (
    <>
      <div>
        <label htmlFor="teams">Publish to Team: </label>
      </div>
      <select
        name="teams"
        onChange={onProgrammeSelected}
        value={selectedProgrammeId ? selectedProgrammeId : undefined}
        style={{ width: "20vw", margin: "0 auto" }}
      >
        {options}
      </select>
    </>
  )
}
