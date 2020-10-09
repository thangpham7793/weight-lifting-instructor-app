import React, { useState, useEffect } from "react"
import { myExcelReader } from "./myExcelReader"
import fetchService from "../../services/http"

//a good candidate for Redux, since needed by many components, lets just do useState for now
function ProgrammeDropDown({
  programmes,
  onProgrammeSelected,
  selectedProgrammeId,
}) {
  if (programmes.length === 1) {
    return <div>Loading Programmes ...</div>
  }

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

function FileUploader({ onFileUploaded }) {
  return (
    <div>
      <input
        type="file"
        id="fileUploader"
        name="fileUploader"
        accept=".xls, .xlsx"
        onChange={onFileUploaded}
      />
      <pre id="jsonObject"> JSON : </pre>
    </div>
  )
}

export function ScheduleUploader() {
  const [programmes, setProgrammes] = useState([
    {
      programmeId: 0,
      programmeName: "None",
    },
  ])
  const [selectedProgrammeId, setSelectedProgrammeId] = useState(
    programmes[0].programmeId
  )

  function onProgrammeSelected(e) {
    setSelectedProgrammeId(parseInt(e.target.value))
  }

  useEffect(() => {
    async function fetchProgrammes() {
      const payload = await fetchService.fetchProgrammes()
      setProgrammes((p) => [...payload.programmes, ...p])
    }
    fetchProgrammes()
  }, [])

  function onFileUploaded(e) {
    const selectedFile = e.target.files[0]
    const r = new myExcelReader(selectedProgrammeId)
    //empty rows are skipped!
    //this is async (oneload and onerror are defined inside the r instance)
    r.reader.readAsBinaryString(selectedFile)
  }

  return (
    <>
      <div>
        <div>
          <ProgrammeDropDown
            onProgrammeSelected={onProgrammeSelected}
            programmes={programmes}
            selectedProgrammeId={selectedProgrammeId}
          />
        </div>
        <FileUploader onFileUploaded={onFileUploaded} />
      </div>
    </>
  )
}
