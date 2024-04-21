input.onButtonPressed(Button.A, function () {
    if (balken_x > 0) {
        balken_x += -1
        led.unplot(balken_x + 2, 4)
        led.plot(balken_x, 4)
    }
})
input.onButtonPressed(Button.B, function () {
    if (status == 0) {
        richtung_y = -1
        richtung_x = 1
        x = 3
        y = 3
        led.plot(3, 3)
        status = 1
    }
    if (balken_x < 3) {
        balken_x += 1
        led.unplot(balken_x - 1, 4)
        led.plot(balken_x + 1, 4)
    }
})
let y = 0
let richtung_x = 0
let richtung_y = 0
let balken_x = 0
let status = 0
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    # # . . .
    # # . . .
    `)
basic.showLeds(`
    . . . . .
    . . . . .
    . # # . .
    . # # . .
    . . . . .
    `)
basic.showLeds(`
    . . . . .
    . # # . .
    . # # . .
    . . . . .
    . . . . .
    `)
basic.showLeds(`
    . . . . .
    . . # # .
    . . # # .
    . . . . .
    . . . . .
    `)
for (let index = 0; index < 2; index++) {
    basic.showLeds(`
        . . . # #
        . . . # #
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . # # .
        . . # # .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # # .
        . . # # .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . # # . .
        . # # . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        # # . . .
        # # . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . # # . .
        . # # . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . # # .
        . . # # .
        . . . . .
        . . . . .
        . . . . .
        `)
}
basic.clearScreen()
basic.showString("GO")
let Geschwindigkeit = 570
let x = 0
status = 0
basic.pause(1000)
basic.forever(function () {
    Geschwindigkeit += -30
    basic.pause(2000)
})
basic.forever(function () {
    if (Geschwindigkeit < 100) {
        basic.setLedColors(0xff0000, 0xff0000, 0xff0000)
    }
    if (Geschwindigkeit < 200) {
        if (Geschwindigkeit > 100) {
            basic.setLedColors(0xff0000, 0xff0000, 0xffffff)
        }
    }
    if (Geschwindigkeit > 500) {
        basic.setLedColors(0xff0000, 0xffffff, 0xffffff)
    }
})
basic.forever(function () {
    music.playMelody("E B C5 A B G A B ", 120)
})
basic.forever(function () {
    if (status == 1) {
        basic.pause(Geschwindigkeit)
        y += richtung_y
        x += richtung_x
        if (x < 0 || x > 4) {
            richtung_x = richtung_x * -1
            x += richtung_x
            x += richtung_x
        }
        if (y > 3) {
            if (x + richtung_x * -1 == balken_x || x + richtung_x * -1 == balken_x + 1) {
                music.play(music.createSoundExpression(WaveShape.Square, 400, 600, 255, 0, 100, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                richtung_y = richtung_y * -1
                y += richtung_y
                y += richtung_y
            } else {
                status = 3
            }
        } else if (y == -1) {
            richtung_y = richtung_y * -1
            y += richtung_y
            y += richtung_y
            if (x < 0 || x > 4) {
                richtung_x = richtung_x * -1
            }
        }
        basic.clearScreen()
        led.plot(x, y)
        led.plot(balken_x, 4)
        led.plot(balken_x + 1, 4)
    } else if (status == 2) {
        basic.showLeds(`
            . # . # .
            . . . . .
            . . . . .
            # . . . #
            . # # # .
            `)
    } else if (status == 3) {
        basic.showLeds(`
            . # . # .
            . . . . .
            . . . . .
            . # # # .
            # . . . #
            `)
        music.stopAllSounds()
        music.playMelody("C5 B A G F A F E ", 120)
        music.stopAllSounds()
    }
})
