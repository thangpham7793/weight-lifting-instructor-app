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
    <>
      <div style={{ textAlign: "left", margin: "0 auto" }}>
        <label htmlFor="teams">Publish to Team: </label>
      </div>
      <select
        name="teams"
        onChange={onProgrammeSelected}
        value={selectedProgrammeId ? selectedProgrammeId : 0}
        style={{ width: "20vw", margin: "0 auto" }}
      >
        {options}
      </select>
    </>
  )
}
