import React, { useState, useEffect } from "react"
import { myExcelReader } from "./myExcelReader"
import fetchService from "../../services/http"
import { FileUploader, ProgrammeOptions } from "./register"
import { FetchNotificationDivFactory } from "../factoryComponent"

//a good candidate for Redux, since needed by many components, lets just do useState for now

export function ScheduleUploader() {
  const [programmes, setProgrammes] = useState(null)
  const [selectedProgrammeId, setSelectedProgrammeId] = useState(null)

  const [isFetchSuccess, setIsFetchSuccess] = useState(null)
  const FetchProgrammesNotificationDiv = FetchNotificationDivFactory(
    "programmes"
  )

  function onProgrammeSelected(e) {
    setSelectedProgrammeId(parseInt(e.target.value))
  }

  useEffect(() => {
    //this should stay here unless all components have a status tracking feature, which makes sense
    async function fetchProgrammes() {
      const payload = await fetchService.fetchProgrammes()

      if (payload.programmes) {
        //effect here
        setProgrammes((p) => [
          ...payload.programmes,
          {
            programmeId: 0,
            programmeName: "None",
          },
        ])
        setSelectedProgrammeId(0)
        setIsFetchSuccess(true)
      } else {
        //another effect
        setIsFetchSuccess(false)
      }
    }
    fetchProgrammes()
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
          {programmes ? (
            <ProgrammeOptions
              onProgrammeSelected={onProgrammeSelected}
              programmes={programmes}
              selectedProgrammeId={selectedProgrammeId}
              isFetchSuccess={isFetchSuccess}
            />
          ) : (
            <FetchProgrammesNotificationDiv isFetchSuccess={isFetchSuccess} />
          )}
        </div>
        <FileUploader onFileUploaded={onFileUploaded} />
      </div>
    </>
  )
}
