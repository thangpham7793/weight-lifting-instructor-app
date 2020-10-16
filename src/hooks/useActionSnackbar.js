import { useState } from "react"

export function useActionSnackbar(action, serviceMethod) {
  const [actionStatus, setActionStatus] = useState({
    action: null,
    isActionSuccess: true,
  })

  async function decoratedService(payload = []) {
    setActionStatus({ action: action, isActionSuccess: null })
    const isSuccessful = await serviceMethod(...payload)
    if (isSuccessful) {
      setActionStatus({ action: action, isActionSuccess: true })

      console.log("Publish Successful!")
      return
    }
    setActionStatus({ action: action, isActionSuccess: false })
    console.log("Publish failed!")
  }

  return [actionStatus, setActionStatus, decoratedService]
}
