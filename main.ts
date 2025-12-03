basic.forever(function () {
	
})
let np = neopixel.create(DigitalPin.P2, 12, NeoPixelMode.RGB)
np.setBrightness(30)
np.showRainbow(1, 360)
basic.pause(1000)
np.showColor(neopixel.colors(NeoPixelColors.White))
basic.pause(1000)
np.clear()
np.show()