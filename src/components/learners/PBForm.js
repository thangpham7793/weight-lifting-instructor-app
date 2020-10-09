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

export function PersonalBestInput({ label, ...props }) {
  const [field, meta] = useField(props)
  return (
    <div>
      <label htmlFor={props.id || props.name}>{camelCaseToNormal(label)}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

export function PBForm({ selectedLearner = {}, openLearnerPbsUpdateModal }) {
  //it does changes, but doesn't show on the UI
  const inputs = Object.keys(selectedLearner).map((fieldName) => {
    if (fieldName === "learnerId") return null
    return (
      <PersonalBestInput
        label={fieldName}
        name={fieldName}
        type="text"
        key={fieldName}
        value={selectedLearner[fieldName]} //this makes it readonly
      />
    )
  })

  //it does get called, it's just that ... the initial values aren't reset?
  console.log("I was re-rendered!")
  //use modal then
  return (
    <>
      <h3>Personal Bests</h3>
      <Formik
        initialValues={selectedLearner}
        values={selectedLearner}
        onSubmit={openLearnerPbsUpdateModal}
      >
        <Form>
          {inputs}
          <button type="submit">Update</button>
        </Form>
      </Formik>
    </>
  )
}
