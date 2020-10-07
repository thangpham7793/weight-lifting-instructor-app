import React, { useState } from "react"
import { Formik, Form, useField } from "formik"
import * as Yup from "yup"

import { camelCaseToNormal } from "../../utils"

const learnerSchema = Yup.object({
  learnerId: Yup.number().required(), //this should not be shown
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  snatch: Yup.number().positive().required(),
  clean: Yup.number().positive().required(),
  jerk: Yup.number().positive().required(),
  cleanAndJerk: Yup.number().positive().required(),
  backSquat: Yup.number().positive().required(),
  frontSquat: Yup.number().positive().required(),
  pushPress: Yup.number().positive().required(),
})

function PersonalBestInput({ label, ...props }) {
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.id || props.name}>{camelCaseToNormal(label)}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

export function PBForm({ selectedLearner, updateLearnerPbs }) {
  const inputs = Object.keys(selectedLearner).map((fieldName) => {
    if (fieldName === "learnerId") return null
    return (
      <PersonalBestInput
        label={fieldName}
        name={fieldName}
        type="text"
        key={fieldName}
      />
    )
  })

  return (
    <>
      <h3>Personal Bests</h3>
      <Formik
        initialValues={selectedLearner}
        validationSchema={learnerSchema}
        onSubmit={updateLearnerPbs}
      >
        <Form>
          {inputs}
          <button type="submit">Update</button>
        </Form>
      </Formik>
    </>
  )
}
