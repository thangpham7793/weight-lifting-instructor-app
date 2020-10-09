import React from "react"

export function NotificationDivFactory(
  resourceName = null,
  postFetchAction = null
) {
  return function NotificationDiv({ isFetchSuccess }) {
    //NOTE: a factory function for customizing a notification div based on the kind of payload

    switch (isFetchSuccess) {
      default:
        return <div>Loading {resourceName ? resourceName : "data"} ...</div>
      case true:
        return (
          <div>
            {postFetchAction ? postFetchAction : "Finished loading data!"}
          </div>
        )
      case false:
        return <div>Failed to load {resourceName ? resourceName : "data"}</div>
    }
  }
}
