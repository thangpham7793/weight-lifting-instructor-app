import { makeStyles } from "@material-ui/core/styles"

export function quickStyles(styleObject) {
  return makeStyles(() => styleObject)()
}
