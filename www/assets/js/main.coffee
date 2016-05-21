cheet = require 'cheet.js'

cheet 's p a c e', ->
  seinfeldContainer = document.getElementById('seinfeld-container')
  seinfeld = document.getElementById('seinfeld')
  seinfeldContainer.style.display = 'block'
  seinfeld.setAttribute('src', 'https://www.youtube.com/embed/V3Vm_ksWreM?autoplay=1')
