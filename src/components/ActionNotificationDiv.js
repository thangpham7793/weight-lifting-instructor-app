import React from "react"
import {
  CheckCircleOutlineRounded,
  ErrorOutlineRounded,
} from "@material-ui/icons"
import { Typography } from "@material-ui/core"

export const ActionNotificationDiv = React.memo(
  ({ actionStatus, onCloseActionStatusDiv }) => {
    const { action, isActionSuccess, errorMessage } = actionStatus

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
          message = errorMessage
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
          position: "fixed",
          width: "max-content",
          borderRadius: "1rem",
          left: "5%",
          bottom: "7%",
        }}
      >
        {isActionSuccess ? (
          <CheckCircleOutlineRounded />
        ) : (
          <ErrorOutlineRounded />
        )}
        <span>{message}</span>
        <Typography
          variant="span"
          className="action-status-close"
          onClick={onCloseActionStatusDiv}
        >
          X
        </Typography>
      </div>
    )
  }
)
