import React, { useState } from "react"

export function useFetchSnackbar(resourceName = null, postFetchAction = null) {
  const [isFetchSuccess, setIsFetchSuccess] = useState(null)

  function Component({ isFetchSuccess, ...props }) {
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

  function FetchNotificationDiv({ ...props }) {
    return <Component isFetchSuccess={isFetchSuccess} {...props} />
  }

  return { isFetchSuccess, setIsFetchSuccess, FetchNotificationDiv }
}
