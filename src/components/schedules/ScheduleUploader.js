import React, { useState, useEffect } from "react"
import { myExcelReader } from "./myExcelReader"
import {
  fileReaderPromise,
  makeSchedulePayload,
  findIndexAndDelete,
} from "../../services/register"
import { FileUploader, ProgrammeOptions, ScheduleNameInput } from "./register"
import { Grid, FormHelperText } from "@material-ui/core"
import { useFetchSnackbar, useActionSnackbar } from "../../hooks/register"
import httpService from "../../services/ProgrammeServiceSingleton"

//a good candidate for Redux, since needed by many components, lets just do useState for now
export function ScheduleUploader({ onActionSuccess }) {
  const [programmes, setProgrammes] = useState(null)
  const [selectedProgrammeIds, setSelectedProgrammeIds] = useState([])
  const [scheduleName, setScheduleName] = useState("")
  // const [isFetchSuccess, setIsFetchSuccess] = useState(null)

  const {
    isFetchSuccess,
    setIsFetchSuccess,
    FetchNotificationDiv,
  } = useFetchSnackbar("programmes")

  const { callDecoratedUploadService, UploadSnackbar } = useActionSnackbar(
    "upload",
    httpService.postNewSchedule
  )

  function onProgrammeChecked(e) {
    const checkedProgrammeId = parseInt(e.target.value)
    if (e.target.checked) {
      console.log(checkedProgrammeId)
      setSelectedProgrammeIds([...selectedProgrammeIds, checkedProgrammeId])
    } else {
      setSelectedProgrammeIds((selectedProgrammeIds) => {
        let newArr = [...selectedProgrammeIds]
        findIndexAndDelete(checkedProgrammeId, newArr)
        return newArr
      })
    }
  }

  function onClickedScheduleNameChanged(e) {
    setScheduleName(e.target.value)
  }

  useEffect(() => {
    //this should stay here unless all components have a status tracking feature, which makes sense
    async function fetchProgrammes() {
      const { ok, payload } = await httpService.fetchProgrammes()

      if (ok) {
        console.log(payload)
        //effect here
        setProgrammes(payload.programmes)
        setIsFetchSuccess(true)
      } else {
        //another effect
        setIsFetchSuccess(false)
      }
    }
    fetchProgrammes()
  }, [setIsFetchSuccess])

  async function onFileUploaded(e) {
    const selectedFile = e.target.files[0]
    const r = new myExcelReader(selectedProgrammeIds, scheduleName)
    //empty rows are skipped!
    //this is async (oneload and onerror are defined inside the r instance)
    r.reader.readAsArrayBufferPromise(selectedFile)

    const buffer = await fileReaderPromise(selectedFile)
    const newSchedule = makeSchedulePayload(
      buffer,
      selectedProgrammeIds,
      scheduleName,
      true
    )

    const { ok, payload } = await callDecoratedUploadService([newSchedule])
    if (ok) {
      const newScheduleInfoObject = makeNewScheduleInfoObject(
        payload,
        programmes
      )
      onActionSuccess("upload", newScheduleInfoObject)
      console.log("Upload Successful!")
      return
    }
  }

  function makeNewScheduleInfoObject(payload, programmes) {
    return {
      ...payload,
      programmes: programmes.filter((p) =>
        selectedProgrammeIds.includes(p.programmeId)
      ),
    }
  }

  return (
    <Grid
      item
      xs={8}
      md={12}
      lg={12}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      {programmes ? (
        <>
          <ScheduleNameInput
            label="Cycle Name"
            onClickedScheduleNameChanged={onClickedScheduleNameChanged}
            scheduleName={scheduleName}
          />
          <ProgrammeOptions
            programmes={programmes}
            isFetchSuccess={isFetchSuccess}
            onProgrammeChecked={onProgrammeChecked}
            label="Publish to Team: "
          />
          <UploadSnackbar />
          {scheduleName.length > 5 ? (
            <FileUploader onFileUploaded={onFileUploaded} />
          ) : (
            <FormHelperText>
              Please Enter The Cycle's Name Before Uploading
            </FormHelperText>
          )}
        </>
      ) : (
        // <FetchProgrammesNotificationDiv isFetchSuccess={isFetchSuccess} />
        <FetchNotificationDiv />
      )}
    </Grid>
  )
}
