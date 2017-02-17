export const OPEN_ALERT_DIALOG = 'OPEN_ALERT_DIALOG'

export function openAlertDialog(open, content) {
  return {
    type: OPEN_ALERT_DIALOG,
    open,
    content
  }
}