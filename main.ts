let felicidade = 6
let agua = 0

// Inicializa neopixels com segurança
let np = neopixel.create(DigitalPin.P2, 12, NeoPixelMode.RGB)
np.setBrightness(40)

music.setVolume(150)

// Função segura para atualizar neopixels
function corNeopixel(cor: number) {
    np.showColor(cor)
}

// Carinho — toque no P0
input.onPinPressed(TouchPin.P0, function () {
    felicidade += 2
    if (felicidade > 10) felicidade = 10

    corNeopixel(neopixel.colors(NeoPixelColors.Purple))
    music.playTone(523, music.beat(BeatFraction.Quarter))
    basic.pause(200)
})

// Loop Principal
basic.forever(function () {
    // Lê água com suavização
    agua = pins.analogReadPin(AnalogPin.P1)
    basic.pause(50)

    // Normaliza valores estranhos
    if (agua < 0) agua = 0
    if (agua > 1023) agua = 1023

    // Se água baixa (< 350)
    if (agua < 350) {
        felicidade -= 1
        if (felicidade < 0) felicidade = 0

        basic.showIcon(IconNames.Asleep)
        corNeopixel(neopixel.colors(NeoPixelColors.Blue))
    } else {
        // Água boa → inclui aumento suave
        felicidade += 1
        if (felicidade > 10) felicidade = 10
    }

    // CONTROLADOR DE HUMOR
    if (felicidade > 7) {
        // Feliz
        basic.showIcon(IconNames.Happy)
        corNeopixel(neopixel.colors(NeoPixelColors.Green))
    } else if (felicidade > 3) {
        // Normal
        basic.showIcon(IconNames.SmallDiamond)
        corNeopixel(neopixel.colors(NeoPixelColors.Blue))
    } else {
        // Triste
        basic.showIcon(IconNames.Sad)
        corNeopixel(neopixel.colors(NeoPixelColors.Red))
        music.playTone(165, music.beat(BeatFraction.Eighth))
    }

    // Descanso
    basic.pause(1200)

    // Decaimento suave do humor
    felicidade -= 1
    if (felicidade < 0) felicidade = 0
})
