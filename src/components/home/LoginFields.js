import React from "react"
import { Grid, TextField } from "@material-ui/core"

export function LoginFields({ credentials, onInputChanged }) {
  const fields = Object.keys(credentials).map((fieldName) => (
    <Grid
      item
      container
      xs={10}
      sm={6}
      md={4}
      lg={3}
      style={{ margin: "0 auto" }}
      key={fieldName}
      justify="space-between"
    >
      <TextField
        style={{ marginBottom: "1rem", width: "100%" }}
        variant="outlined"
        label={fieldName}
        InputProps={{
          // value: credentials[fieldName],
          name: fieldName,
          type: fieldName === "password" ? "password" : "text",
        }}
        onChange={onInputChanged}
      />
    </Grid>
  ))
  return <>{fields}</>
}
