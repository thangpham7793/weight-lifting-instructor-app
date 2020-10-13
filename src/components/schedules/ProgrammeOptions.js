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
      <div>
        <label htmlFor="programmes">Publish to Programme: </label>
      </div>
      <select
        name="programmes"
        onChange={onProgrammeSelected}
        value={selectedProgrammeId ? selectedProgrammeId : undefined}
        style={{ width: "20vw", margin: "0 auto" }}
      >
        {options}
      </select>
    </>
  )
}
