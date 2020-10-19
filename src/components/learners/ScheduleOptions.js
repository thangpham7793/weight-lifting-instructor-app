import React from "react"
import {
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormControl,
  Checkbox,
  Typography,
  RadioGroup,
  Radio,
} from "@material-ui/core"

export function ScheduleOptions({
  schedules,
  onScheduleChecked,
  label,
  selectedScheduleId,
}) {
  let content
  if (schedules.length > 0) {
    const radioButtons = schedules.map(({ scheduleName, scheduleId }) => {
      return (
        <FormControlLabel
          value={scheduleId}
          key={scheduleId}
          control={<Radio name={scheduleName} color="primary" />}
          label={scheduleName}
        />
      )
    })
    content = (
      <>
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          aria-label="available-schedules"
          name="schedules"
          value={selectedScheduleId}
          onChange={onScheduleChecked}
        >
          {radioButtons}
        </RadioGroup>
      </>
    )
  } else {
    content = <Typography component="p">No schedule Available</Typography>
  }

  return (
    <FormControl component="fieldset" style={{ marginBottom: "var(--mg-sm)" }}>
      {content}
    </FormControl>
  )
}
