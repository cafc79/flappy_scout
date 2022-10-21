import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs"

function cargar_pajaros_y_tuberias() {
  loadRoot("./sprites/")
  loadSprite("jugador", "bird.png")
  loadSprite("background", "ocean.jpg")
  loadSprite("gameover_bg", "bird_bg.jpg")
  loadSprite("obstaculo", "pipe.png")
}

function cargar_cubil_scout() {
  loadRoot("./sprites/")
  loadSprite("jugador", "grupo6.png")
  loadSprite("background", "trees.jpg")
  loadSprite("gameover_bg", "devops.png")
  loadSprite("obstaculo", "pine.png")
}

function preparar_jugador(puntaje) {
  const fuerzaDeSalto = 300
  const jugador = add([
    sprite("jugador"),
    scale(0.08),
    pos(80, 80),
    area(),
    body(), // implements gravity on the object
  ])

  onKeyPress("space", () => {
    jugador.jump(fuerzaDeSalto)
  })

  onTouchStart(() => {
    jugador.jump(fuerzaDeSalto)
  })


  // si el jugador se sale de la pantalla
  jugador.action(() => {
    if (jugador.pos.y >= height()) {
      go("gameover", puntaje.value)
    }
  })

  // si el juegador choca con obstaculo
  jugador.collides("obstaculo", () => {
    go("gameover", puntaje.value)
  })

  return jugador
}

function crear_puntaje() {
  return add([
    pos(12, 12),
    text("0", 24),
    layer("ui"),
    {
      value: 0,
    },
  ])
}

function preparar_obstaculos(jugador, puntaje){
  const velocidadDeObstaculos = 500
  const distanciaEntreObstaculos = height() / 2

  // agregar nuevo obstaculo cada .5 seg
  loop(1, () => {

    const obstaculo_position = rand(0, height() - distanciaEntreObstaculos)

    add([
      sprite("obstaculo"),
      origin("bot"),
      pos(width() - 10, obstaculo_position),
      scale(height() / 400, 2.5),
      area(),
      solid(),
      "obstaculo" // "obstaculo" tag
    ])

    add([
      sprite("obstaculo"),
      pos(width() - 10, obstaculo_position + distanciaEntreObstaculos),
      scale(height() / 400, -2.5),
      origin("bot"),
      area(),
      solid(),
      "obstaculo",
      {
        passed: false,
      },
    ])

  })

  // mover los obstaculos de izq a der
  action("obstaculo", (obstaculo) => {
    obstaculo.move(-velocidadDeObstaculos, 0)

    // checa si el jugador pasa un obstaculo
    if (obstaculo.pos.x + obstaculo.width <= jugador.pos.x && !obstaculo.passed) {
      puntaje.value++
      puntaje.text = puntaje.value
      obstaculo.passed = true
    }

    // destruye el obstaculo cuando no esta en pantalla
    if (obstaculo.pos.x + obstaculo.width < 0) {
      destroy(obstaculo)
    }

  })
}

function preparar_fondo_escena_principal(){
  layers([
    "game",
    "ui",
  ], "game")

  add([
    sprite("background"),
    scale(width() / 1000, height() / 1000),
    origin("topleft")
  ])
}

function inicializar_motor_grafico() {
  // initialize Kaboom
  return kaboom({
    global: true, // import all functions into global namespace
    fullscreen: true, // render across entire browser window
  })
}
function start_game(){
// initiate game to the scene named "principal"
go("principal")
}


function preparar_fondo_escena_gameover() {
  add([
    sprite("gameover_bg"),
    scale(width() / 300, height() / 300),
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
    text("Press space to play again.", {size: 18}),
    pos(width() / 2, height() / 2),
    origin("center")
  ])

  keyPress("space", () => {
    go("principal")
  })
  onTouchEnd(() => {
    go("principal")
  })
}

export {
  inicializar_motor_grafico,
  start_game,
  cargar_pajaros_y_tuberias,
  cargar_cubil_scout,
  preparar_jugador,
  crear_puntaje,
  preparar_obstaculos,
  preparar_fondo_escena_principal,
  preparar_fondo_escena_gameover,
  mostrar_puntaje_final,
  mostrar_reiniciar_juego
}
