import React from "react"

export function ActionNotificationDiv({
  actionStatus,
  onCloseActionStatusDiv,
}) {
  const { action, isActionSuccess } = actionStatus

  let message = "Action Status"
  let visibility = ""

  if (!action) {
    visibility = "hidden"
  } else {
    switch (isActionSuccess) {
      default:
        message = `Applying ${action.toUpperCase()} ...`
        break
      case true:
        message = `${action.toUpperCase()} Successful!`
        break
      case false:
        message = `Failed to load ${action.toUpperCase()}`
        break
    }
  }

  return (
    <div
      className="action-status-div"
      style={{ visibility: visibility, width: "35%" }}
    >
      <div>{message}</div>
      <span className="action-status-close" onClick={onCloseActionStatusDiv}>
        X
      </span>
    </div>
  )
}
