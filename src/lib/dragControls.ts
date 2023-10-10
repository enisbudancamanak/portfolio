export let mouseDown = false

export function dragControls(canvas: HTMLCanvasElement, dragAction: any) {
  var mouseX = 0,
    mouseY = 0

  canvas.addEventListener(
    'mousemove',
    function (evt) {
      if (!mouseDown) {
        return
      }
      evt.preventDefault()
      var deltaX = evt.clientX - mouseX,
        deltaY = evt.clientY - mouseY
      mouseX = evt.clientX
      mouseY = evt.clientY
      dragAction(deltaX, deltaY)
    },
    false
  )

  canvas.addEventListener(
    'mousedown',
    function (evt) {
      evt.preventDefault()
      mouseDown = true
      mouseX = evt.clientX
      mouseY = evt.clientY
    },
    false
  )

  canvas.addEventListener(
    'mouseup',
    function (evt) {
      evt.preventDefault()
      mouseDown = false
    },
    false
  )
}
