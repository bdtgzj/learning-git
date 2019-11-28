// rtl === React-Testing-Library
import React from 'react'

function HiddenMessage({children}) {
  const [showMessage, setShowMessage] = React.useState(false)
  return (
    <div>
      <label htmlFor="toggle">Show Message</label>
      <input
        id="toggle"
        type="checkbox"
        onChange={e => setShowMessage(e.target.checked)}
        checked={showMessage}
      />
      {showMessage ? children : null}
      <i aria-label="dd"><svg></svg></i>
      <span>i am span</span>
    </div>
  )
}

export default HiddenMessage