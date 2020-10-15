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
          <div {...props}>
            Loading {resourceName ? resourceName : "data"} ...
          </div>
        )
      case true:
        return (
          <div {...props}>
            {postFetchAction ? postFetchAction : "Finished loading data!"}
          </div>
        )
      case false:
        return (
          <div {...props}>
            Failed to load {resourceName ? resourceName : "data"}
          </div>
        )
    }
  }
}
