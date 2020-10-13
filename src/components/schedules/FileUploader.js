import React from "react"
import { InputLabel } from "@material-ui/core"
import { CloudUploadRounded } from "@material-ui/icons"

export function FileUploader({ onFileUploaded }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <InputLabel
        style={{
          padding: "var(--pd-sm)",
          minWidth: "max-content",
          margin: "0 auto",
          border: "1px solid var(--txt-cl)",
        }}
        htmlFor="fileUploader"
      >
        <CloudUploadRounded
          style={{ color: "var(--bg-cl)", fontSize: "var(--fs-lg)" }}
        />
      </InputLabel>
      <input
        style={{ margin: "0 auto", display: "none" }}
        type="file"
        id="fileUploader"
        name="fileUploader"
        accept=".xls, .xlsx"
        onChange={onFileUploaded}
      />
      {/* <pre id="jsonObject"> JSON : </pre> */}
    </div>
  )
}
