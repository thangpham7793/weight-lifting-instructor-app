import React from "react"
import { Grid, TextField } from "@material-ui/core"

export function LoginFields({ credentials, onInputChanged }) {
  const fields = Object.keys(credentials).map((fieldName) => (
    <Grid
      item
      xs={10}
      md={6}
      lg={4}
      style={{ margin: "0 auto" }}
      key={fieldName}
    >
      <TextField
        style={{ marginBottom: "1rem" }}
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
