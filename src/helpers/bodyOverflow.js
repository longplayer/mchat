function applyOverflowToBody(isAllowed) {
  if (isAllowed) {
    document.body.classList.add('pge__overflow--hidden')
  } else {
    document.body.classList.remove('pge__overflow--hidden')
  }
}

export default applyOverflowToBody
