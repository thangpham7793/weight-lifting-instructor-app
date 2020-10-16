import React from "react"

export function FetchNotificationDivFactory(
  resourceName = null,
  postFetchAction = null
) {
  return function ({ isFetchSuccess, ...props }) {
    //NOTE: a factory function for customizing a notification div based on the kind of payload
    switch (isFetchSuccess) {
      default:
        return (
          <div {...props} style={{ color: "var(--bg-cl)" }}>
            Loading {resourceName ? resourceName : "data"} ...
          </div>
        )
      case true:
        return (
          <div {...props} style={{ color: "green" }}>
            {postFetchAction ? postFetchAction : "Finished loading data!"}
          </div>
        )
      case false:
        return (
          <div {...props} style={{ color: "red" }}>
            Failed to load {resourceName ? resourceName : "data"}
          </div>
        )
    }
  }
}
