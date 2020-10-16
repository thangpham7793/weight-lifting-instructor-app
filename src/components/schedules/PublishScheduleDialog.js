import React, { useState, useEffect } from "react"
import { ProgrammeOptions } from "./register"
import { Dialog, DialogActions, DialogTitle, Grid } from "@material-ui/core"
import { findIndexAndDelete } from "../../services/register"
import { useActionSnackbar, useFetchSnackbar } from "../../hooks/register"
import httpService from "../../services/ProgrammeServiceSingleton"

export function PublishScheduleDialog({
  scheduleId,
  onDialogCloseClicked,
  open,
  onActionSuccess,
}) {
  // const [isFetchSuccess, setIsFetchSuccess] = useState(null)
  const [selectedProgrammeIds, setSelectedProgrammeIds] = useState([])
  const [programmes, setProgrammes] = useState(null)

  const { setIsFetchSuccess, FetchNotificationDiv } = useFetchSnackbar(
    "available programmes"
  )

  const {
    publishActionStatus,
    callDecoratedPublishService,
    PublishSnackbar,
  } = useActionSnackbar("publish", httpService.publishSchedule)

  function onProgrammeChecked(e) {
    const checkedProgrammeId = parseInt(e.target.value)
    if (e.target.checked) {
      setSelectedProgrammeIds([...selectedProgrammeIds, checkedProgrammeId])
    } else {
      setSelectedProgrammeIds((selectedProgrammeIds) => {
        let newArr = [...selectedProgrammeIds]
        findIndexAndDelete(checkedProgrammeId, newArr)
        return newArr
      })
    }
  }

  async function onPublishScheduleClicked() {
    const { ok } = await callDecoratedPublishService([
      scheduleId,
      selectedProgrammeIds,
    ])

    if (ok) {
      onActionSuccess("publish", {
        scheduleId,
        programmes: getAddedProgrammes(selectedProgrammeIds, programmes),
      })
    }
  }

  function getAddedProgrammes(selectedProgrammeIds, programmes) {
    return programmes.filter((p) =>
      selectedProgrammeIds.includes(p.programmeId)
    )
  }

  useEffect(() => {
    async function getAvailableProgrammesToPublish(scheduleId) {
      const { ok, payload } = await httpService.getAvailableProgrammesToPublish(
        scheduleId
      )
      if (ok) {
        setIsFetchSuccess(true)
        setProgrammes(payload)
        return
      }
      setIsFetchSuccess(false)
    }

    if (open) {
      getAvailableProgrammesToPublish(scheduleId)
    }
  }, [scheduleId, open, setIsFetchSuccess])

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
            <FetchNotificationDiv />
          )}
          {publishActionStatus.action ? <PublishSnackbar /> : null}
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
            disabled={
              selectedProgrammeIds.length > 0 || !programmes ? false : true
            }
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
