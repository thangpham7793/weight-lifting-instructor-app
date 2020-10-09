import React, { useState, useEffect } from "react"
import { myExcelReader } from "./myExcelReader"
import fetchService from "../../services/http"
import { catchAsync } from "../../utils"

//a good candidate for Redux, since needed by many components, lets just do useState for now
function ProgrammeDropDown({
  programmes,
  onProgrammeSelected,
  selectedProgrammeId,
  isFetchSuccess,
}) {
  if (programmes.length === 1 && isFetchSuccess === null) {
    return <div>Loading Programmes ...</div>
  }

  if (isFetchSuccess === false) {
    return <div>Failed to load programmes ...</div>
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
  const [isFetchSuccess, setIsFetchSuccess] = useState(null)

  function onProgrammeSelected(e) {
    setSelectedProgrammeId(parseInt(e.target.value))
  }

  useEffect(() => {
    //this should stay here unless all components have a status tracking feature, which makes sense
    async function fetchProgrammes() {
      const payload = await fetchService.fetchProgrammes()

      if (payload.programmes) {
        //effect here
        setProgrammes((p) => [...payload.programmes, ...p])
        setIsFetchSuccess(true)
      }
    }

    function handleFailedFetch() {
      //another effect
      setIsFetchSuccess(false)
    }

    catchAsync(fetchProgrammes, handleFailedFetch)()
  }, [])

  function onFileUploaded(e) {
    const selectedFile = e.target.files[0]
    const r = new myExcelReader(selectedProgrammeId)
    //empty rows are skipped!
    //this is async (oneload and onerror are defined inside the r instance)
    r.reader
      .readAsArrayBufferPromise(selectedFile)
      .then((res) => console.log(res))
  }

  return (
    <>
      <div>
        <div>
          <ProgrammeDropDown
            onProgrammeSelected={onProgrammeSelected}
            programmes={programmes}
            selectedProgrammeId={selectedProgrammeId}
            isFetchSuccess={isFetchSuccess}
          />
        </div>
        <FileUploader onFileUploaded={onFileUploaded} />
      </div>
    </>
  )
}
