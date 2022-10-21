import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs"

function preparar_fondo_escena_gameover() {
  add([
    sprite("gameover_bg"),
    scale(width() / 3000, height() / 3000),
    origin("topleft")
  ])
}

function  mostrar_puntaje_final(puntaje) {
  add([
    text(`Score: ${puntaje}`, 30),
    pos(width() / 2, height() / 2 - 50),
    origin("center")
  ])
}

function mostrar_reiniciar_juego() {

  add([
    text("Press space to play again.", 20),
    pos(width() / 2, height() / 2),
    origin("center")
  ])

  keyPress("space", () => {
    go("principal")
  })
}

export {
    preparar_fondo_escena_gameover,
    mostrar_puntaje_final,
    mostrar_reiniciar_juego
}
