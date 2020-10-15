import React, { useState, useEffect } from "react"
import { myExcelReader } from "./myExcelReader"
import { FileUploader, ProgrammeOptions } from "./register"
import { FetchNotificationDivFactory } from "../factoryComponent"
import { TextField, makeStyles } from "@material-ui/core"
import httpService from "../../services/ProgrammeServiceSingleton"

const useStyles = makeStyles((theme) => ({
  // scheduleName: {
  //   textAlign: "center",
  //   width: "20%",
  //   margin: "0 auto",
  // },
  input: {
    fontFamily: "var(--ff)",
    color: "#001e18",
  },
  formLabelRoot: {
    fontFamily: "var(--ff)",
    color: "var(--txt-cl)",
  },
  formLabelFocused: {
    fontFamily: "var(--ff)",
    color: "var(--txt-cl)",
    "'& label.Mui-focused'": {
      fontFamily: "var(--ff)",
      color: "var(--txt-cl)",
    },
  },
}))

//a good candidate for Redux, since needed by many components, lets just do useState for now
export function ScheduleUploader() {
  const classes = useStyles()
  const [programmes, setProgrammes] = useState(null)
  const [selectedProgrammeId, setSelectedProgrammeId] = useState(null)
  const [scheduleName, setScheduleName] = useState("")
  const [isFetchSuccess, setIsFetchSuccess] = useState(null)
  const FetchProgrammesNotificationDiv = FetchNotificationDivFactory(
    "programmes"
  )

  function onProgrammeSelected(e) {
    setSelectedProgrammeId(parseInt(e.target.value))
  }

  function onScheduleNameChanged(e) {
    setScheduleName(e.target.value)
  }

  useEffect(() => {
    //this should stay here unless all components have a status tracking feature, which makes sense
    async function fetchProgrammes() {
      const payload = await httpService.fetchProgrammes()

      if (payload) {
        console.log(payload)
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
    const r = new myExcelReader(selectedProgrammeId, scheduleName)
    //empty rows are skipped!
    //this is async (oneload and onerror are defined inside the r instance)
    r.reader
      .readAsArrayBufferPromise(selectedFile)
      .then((res) => console.log(res))
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      {programmes ? (
        <>
          <TextField
            label="Cycle Name"
            className={classes.scheduleName}
            onChange={onScheduleNameChanged}
            value={scheduleName}
            InputProps={{ className: classes.input }}
            InputLabelProps={{
              className: classes.formLabelRoot,
            }}
          />
          <ProgrammeOptions
            onProgrammeSelected={onProgrammeSelected}
            programmes={programmes}
            selectedProgrammeId={selectedProgrammeId}
            isFetchSuccess={isFetchSuccess}
          />
          {scheduleName.length > 5 ? (
            <FileUploader onFileUploaded={onFileUploaded} />
          ) : (
            <div>Please Enter The Cycle's Name Before Uploading</div>
          )}
        </>
      ) : (
        <FetchProgrammesNotificationDiv isFetchSuccess={isFetchSuccess} />
      )}
    </div>
  )
}
