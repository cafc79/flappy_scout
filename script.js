
import {
  inicializar_motor_grafico,
  cargar_pajaros_y_tuberias,
  cargar_cubil_scout,
  preparar_jugador,
  crear_puntaje,
  preparar_obstaculos,
  start_game,
  preparar_fondo_escena_principal,
  preparar_fondo_escena_gameover,
  mostrar_puntaje_final,
  mostrar_reiniciar_juego
} from './utileriasEscenaPrincipal.js'

inicializar_motor_grafico()

//
//cargar_pajaros_y_tuberias()
cargar_cubil_scout()

scene("principal", () => {
  preparar_fondo_escena_principal()
  const puntaje = crear_puntaje()
  const jugador = preparar_jugador(puntaje)
  preparar_obstaculos(jugador, puntaje)

})


scene("gameover", (puntaje) => {
  preparar_fondo_escena_gameover()
  mostrar_puntaje_final(puntaje)
  mostrar_reiniciar_juego()
})


start_game()
