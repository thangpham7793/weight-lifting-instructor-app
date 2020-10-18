import React from "react"
import {
  CheckCircleOutlineRounded,
  ErrorOutlineRounded,
} from "@material-ui/icons"

export const ActionNotificationDiv = React.memo(
  ({ actionStatus, onCloseActionStatusDiv }) => {
    const { action, isActionSuccess } = actionStatus

    let message = "Action Status"
    let color = ""
    let background = ""
    let visibility = ""

    if (!action) {
      visibility = "hidden"
    } else {
      switch (isActionSuccess) {
        default:
          message = `Applying ${action.toUpperCase()} ...`
          background = "yellow"
          color = "#111"
          break
        case true:
          message = `${action.toUpperCase()} Successful!`
          color = "green"
          background = "rgb(107, 236, 172)"
          break
        case false:
          message = `${action.toUpperCase()} Failed!`
          color = "red"
          background = "rgb(241, 162, 142)"
          break
      }
    }

    return (
      <div
        className="action-status-div"
        style={{
          visibility: visibility,
          color,
          fontWeight: "600",
          background,
        }}
      >
        {isActionSuccess ? (
          <CheckCircleOutlineRounded />
        ) : (
          <ErrorOutlineRounded />
        )}
        <span>{message}</span>
        <span className="action-status-close" onClick={onCloseActionStatusDiv}>
          X
        </span>
      </div>
    )
  }
)
