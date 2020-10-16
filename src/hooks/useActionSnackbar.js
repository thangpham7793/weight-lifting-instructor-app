import React, { useState } from "react"
import { capitalise } from "../utils"
import { ActionNotificationDiv } from "../components/ActionNotificationDiv"

export function useActionSnackbar(action, serviceMethod) {
  const [actionStatus, setActionStatus] = useState({
    action: null,
    isActionSuccess: true,
  })

  async function callDecoratedService(payload = []) {
    setActionStatus({ action: action, isActionSuccess: null })
    const isSuccessful = await serviceMethod(...payload)
    if (isSuccessful) {
      setActionStatus({ action: action, isActionSuccess: true })
      console.log(`${capitalise(action)} Successful!`)
    } else {
      setActionStatus({ action: action, isActionSuccess: false })
      console.log(`${capitalise(action)} failed!`)
    }
    //for custom side-effect outside of the component
    return isSuccessful
  }

  function onCloseActionStatusDiv() {
    setActionStatus({ action: null, isActionSuccess: null })
  }

  function Component() {
    return (
      <ActionNotificationDiv
        actionStatus={actionStatus}
        onCloseActionStatusDiv={onCloseActionStatusDiv}
      />
    )
  }

  //this allows the hook to be used with different services in the same component
  function makePayloadObjectWithCustomPropNames(action) {
    let returnedObj = {}
    returnedObj[`${action}ActionStatus`] = actionStatus
    returnedObj[`set${capitalise(action)}ActionStatus`] = setActionStatus
    returnedObj[
      `callDecorated${capitalise(action)}Service`
    ] = callDecoratedService
    returnedObj[
      `onClose${capitalise(action)}StatusDiv`
    ] = onCloseActionStatusDiv

    returnedObj[`${capitalise(action)}Snackbar`] = Component
    return returnedObj
  }

  const propsAndHooks = makePayloadObjectWithCustomPropNames(action)

  return propsAndHooks
}
