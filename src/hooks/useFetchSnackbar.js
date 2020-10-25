import React, { useState } from "react"
import { Grid } from "@material-ui/core"

export function useFetchSnackbar(resourceName = null, postFetchAction = null) {
  const [isFetchSuccess, setIsFetchSuccess] = useState(null)

  const Component = React.memo(({ isFetchSuccess, ...props }) => {
    //NOTE: a factory function for customizing a notification div based on the kind of payload
    switch (isFetchSuccess) {
      default:
        return (
          <div {...props} style={{ color: "var(--bg-cl)" }}>
            Fetching {resourceName ? resourceName : "data"} ...
          </div>
        )
      case true:
        return (
          <div {...props} style={{ color: "green" }}>
            {postFetchAction ? postFetchAction : "Finished Fetching Data!"}
          </div>
        )
      case false:
        return (
          <div {...props} style={{ color: "red" }}>
            Failed to Fetch {resourceName ? resourceName : "data"}. Please retry
            later.
          </div>
        )
    }
  })

  function FetchNotificationDiv({ ...props }) {
    return (
      <Grid
        item
        container
        direction="column"
        style={{ height: "100%", paddingTop: "2rem" }}
      >
        <Component isFetchSuccess={isFetchSuccess} {...props} />
      </Grid>
    )
  }

  return { isFetchSuccess, setIsFetchSuccess, FetchNotificationDiv }
}
