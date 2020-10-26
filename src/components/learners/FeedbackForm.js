import React, { useState } from "react"
import { useSelector } from "react-redux"
import {
  TextField,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
  FormControlLabel,
  Grid,
  Typography,
} from "@material-ui/core"
import { Send, Close } from "@material-ui/icons"
import { range, spinner } from "../../utils"
import { FormButton } from "../LearnerApp/PracticeBestsPage/FormButton"
import { quickStyles } from "../../services/register"
import { formInputProps } from "./formInputProps"
import { selectLearnerInfo } from "../../reducers/learnerInfoSlice"
import { capitalise } from "../../utils"

function makeLabel(value) {
  switch (value) {
    case 1:
      return `${value} Meh`
    case 5:
      return `${value} Fantastic`
    default:
      return value
  }
}

export function FeedbackForm({ setOpenFeedbackDialog, setActionStatus }) {
  const { learnerName } = useSelector(selectLearnerInfo)

  const defaultFormData = {
    [formInputProps.name.name]: learnerName ? learnerName : "",
    [formInputProps.feeling.name]: "",
    [formInputProps.comment.name]: "",
    isNameEdited: false,
  }

  const [formData, setFormData] = useState(defaultFormData)

  function onFeedbackFormChanged(e) {
    const fieldName = e.target.name
    let fieldValue = e.target.value

    if (fieldName === formInputProps.name.name && !formData.isNameEdited) {
      formData.isNameEdited = true
    }

    if (fieldName === formInputProps.name.name) {
      if (!fieldValue.substr(-1) === " ") {
        fieldValue = capitalise(fieldValue, true)
      }
    }

    if (fieldName === formInputProps.feeling.name) {
      fieldValue = parseInt(fieldValue)
    }

    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    })
    console.log(e.target.value)
  }

  function onFeedbackFormSubmitted(e) {
    e.preventDefault()
    const clickedBtn = e.currentTarget.getAttribute("name")
    if (clickedBtn === "submit") {
      spinner.show(true)
      let action = "Sending Feedback"
      setActionStatus({ action: action, isActionSuccess: null })
      console.log(formData)
      const extraData = {}

      // eslint-disable-next-line no-undef
      $("#feedbackForm").ajaxSubmit({
        data: extraData,
        dataType: "jsonp",
        error: function () {
          spinner.show(false)
          setActionStatus({ action: action, isActionSuccess: true })
          setOpenFeedbackDialog(false)
        },
      })
    } else {
      setOpenFeedbackDialog(false)
    }
  }

  // eslint-disable-next-line no-undef
  $("#feedbackForm").on("submit", onFeedbackFormSubmitted)

  const classes = quickStyles({
    formTitle: {
      fontSize: "1rem",
      textAlign: "center",
      fontWeight: "600",
    },
    formControl: {
      display: "flex",
      height: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    formLabel: {
      marginBottom: "0.5rem",
    },
    btnWrapper: {
      marginBottom: "1rem",
    },
    formBtn: {
      width: "40%",
      maxWidth: "250px",
      display: "flex",
      justifyContent: "space-evenly",
      padding: "0.5rem",
    },
    formBtnLabel: {
      fontSize: "0.5rem",
    },
  })

  return (
    <FormControl
      component="form"
      className={classes.formControl}
      {...formInputProps.form}
    >
      <Typography variant="h6" className={classes.formTitle} color="primary">
        Help Me Makes You <br /> {"\u{1F3CB}"} Train Better {"\u{1F3CB}"}
      </Typography>
      {learnerName ? (
        <input
          {...formInputProps.name}
          type="hidden"
          value={capitalise(formData[formInputProps.name.name], true)}
        />
      ) : (
        <TextField
          label="Name"
          value={formData[formInputProps.name.name]}
          onChange={onFeedbackFormChanged}
          inputProps={formInputProps.name}
          error={
            formData.isNameEdited &&
            formData[formInputProps.name.name].length === 0
          }
          helperText={
            formData.isNameEdited &&
            formData[formInputProps.name.name].length === 0 &&
            "Must not be empty"
          }
        />
      )}
      <Grid item>
        <FormLabel
          component="legend"
          htmlFor={formInputProps.feelingLegend.for}
          className={classes.formLabel}
        >
          How do you feel about today's session?
        </FormLabel>
        <RadioGroup
          aria-label="feeling"
          value={formData[formInputProps.feeling.name]}
          onChange={onFeedbackFormChanged}
        >
          {range(5).map((rating) => {
            return (
              <FormControlLabel
                key={rating}
                value={rating}
                control={
                  <Radio color="primary" inputProps={formInputProps.feeling} />
                }
                label={makeLabel(rating)}
              />
            )
          })}
        </RadioGroup>
      </Grid>
      {/* <FormLabel
        component="legend"
        htmlFor={formInputProps.commentLegend.for}
      ></FormLabel> */}
      <TextField
        multiline
        label="Comment"
        rowsMax={5}
        value={formData[formInputProps.comment.name]}
        onChange={onFeedbackFormChanged}
        inputProps={formInputProps.comment}
      />
      <Grid
        container
        item
        wrap="nowrap"
        justify="space-between"
        className={classes.btnWrapper}
      >
        <FormButton
          onClick={onFeedbackFormSubmitted}
          label="Close"
          name="close"
          icon={Close}
          classes={classes}
        />
        <FormButton
          onClick={onFeedbackFormSubmitted}
          label="Submit"
          icon={Send}
          name="submit"
          type="submit"
          classes={classes}
          disabled={
            formData[formInputProps.name.name] === "" ||
            formData[formInputProps.feeling.name] === ""
          }
        />
      </Grid>
    </FormControl>
  )
}
