import React, { useState, useEffect } from "react"
import { ProgrammeOptions } from "./register"
import { Dialog, DialogActions, DialogTitle, Grid } from "@material-ui/core"
import { FetchNotificationDivFactory } from "../factoryComponent"
import { findIndexAndDelete } from "../../services/register"
import httpService from "../../services/ProgrammeServiceSingleton"
import { ActionNotificationDiv } from "../ActionNotificationDiv"
import { useActionSnackbar } from "../../hooks/register"

const FetchAvailableProgrammesNotificationDiv = FetchNotificationDivFactory(
  "available programmes"
)

export function PublishScheduleDialog({
  scheduleId,
  onDialogCloseClicked,
  open,
}) {
  const [isFetchSuccess, setIsFetchSuccess] = useState(null)
  const [selectedProgrammeIds, setSelectedProgrammeIds] = useState([])
  //need to get all programmes that do not have a particular schedule
  const [programmes, setProgrammes] = useState(null)
  // const [actionStatus, setActionStatus] = useState({
  //   action: null,
  //   isActionSuccess: true,
  // })

  const [actionStatus, setActionStatus, decoratedService] = useActionSnackbar(
    "publish",
    httpService.publishSchedule
  )

  function onCloseActionStatusDiv(e) {
    setActionStatus({ action: null, isActionSuccess: null })
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

  function onPublishScheduleClicked() {
    decoratedService([scheduleId, selectedProgrammeIds])
  }

  useEffect(() => {
    async function getAvailableProgrammesToPublish(scheduleId) {
      const res = await httpService.getAvailableProgrammesToPublish(scheduleId)
      if (res) {
        console.log(res)
        setIsFetchSuccess(true)
        setProgrammes(res)
        return
      }
      setIsFetchSuccess(false)
    }

    if (open) {
      getAvailableProgrammesToPublish(scheduleId)
    }
  }, [scheduleId, open])

  return (
    <Grid item xs={10} sm={8} md={6}>
      <Dialog
        open={open}
        onClose={onDialogCloseClicked}
        aria-labelledby="form-dialog-title"
        style={{ overflow: "hidden" }}
      >
        <DialogTitle
          style={{
            backgroundColor: "var(--txt-cl)",
            fontWeight: "var(--fw-md)",
          }}
        >
          Publish Cycle
        </DialogTitle>
        <div className="publish-schedule-dialog">
          {programmes ? (
            <ProgrammeOptions
              programmes={programmes}
              onProgrammeChecked={onProgrammeChecked}
              label="Publish to Team"
            />
          ) : (
            <FetchAvailableProgrammesNotificationDiv
              isFetchSuccess={isFetchSuccess}
            />
          )}
          {actionStatus.action ? (
            <ActionNotificationDiv
              actionStatus={actionStatus}
              onCloseActionStatusDiv={onCloseActionStatusDiv}
            />
          ) : null}
        </div>
        <DialogActions
          style={{
            justifyContent: "space-around",
            padding: "0",
            backgroundColor: "var(--txt-cl)",
            overflow: "hidden",
          }}
        >
          <button
            onClick={onPublishScheduleClicked}
            style={{ width: "max-content" }}
          >
            Publish
          </button>
          <button
            onClick={onDialogCloseClicked}
            style={{ width: "max-content" }}
          >
            Close
          </button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}
