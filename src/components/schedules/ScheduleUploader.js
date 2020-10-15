import React, { useState, useEffect } from "react"
import { myExcelReader } from "./myExcelReader"
import { FileUploader, ProgrammeOptions } from "./register"
import { FetchNotificationDivFactory } from "../factoryComponent"
import {
  TextField,
  Typography,
  makeStyles,
  Grid,
  FormHelperText,
} from "@material-ui/core"
import httpService from "../../services/ProgrammeServiceSingleton"

const useStyles = makeStyles((theme) => ({
  scheduleName: {
    marginBottom: "var(--mg-sm)",
  },
  input: {
    fontFamily: "var(--ff)",
    color: "#001e18",
    marginBottom: "var(--mg-sm)",
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
  const [selectedProgrammeIds, setSelectedProgrammeIds] = useState([])
  const [scheduleName, setScheduleName] = useState("")
  const [isFetchSuccess, setIsFetchSuccess] = useState(null)
  const FetchProgrammesNotificationDiv = FetchNotificationDivFactory(
    "programmes"
  )

  function findIndexAndDelete(val, arr) {
    arr.splice(
      arr.findIndex((v) => v === val),
      1
    )
  }

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
        setProgrammes(payload.programmes)
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
    const r = new myExcelReader(selectedProgrammeIds, scheduleName)
    //empty rows are skipped!
    //this is async (oneload and onerror are defined inside the r instance)
    r.reader.readAsArrayBufferPromise(selectedFile)
  }

  return (
    <Grid
      container
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
            programmes={programmes}
            isFetchSuccess={isFetchSuccess}
            onProgrammeChecked={onProgrammeChecked}
          />
          {scheduleName.length > 5 ? (
            <FileUploader onFileUploaded={onFileUploaded} />
          ) : (
            <FormHelperText>
              <Typography component="div">
                Please Enter The Cycle's Name Before Uploading
              </Typography>
            </FormHelperText>
          )}
        </>
      ) : (
        <FetchProgrammesNotificationDiv isFetchSuccess={isFetchSuccess} />
      )}
    </Grid>
  )
}
