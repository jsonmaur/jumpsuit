var client = new WebSocket('ws://0.0.0.0:7000/', 'echo-protocol')

client.onerror = function () {
  console.log('HSR Connection Error!')
}

client.onopen = function () {
  console.log('Hot State Reload is ready!')
}

client.onclose = function () {
  // console.log('echo-protocol Client Closed')
}

client.onmessage = function (e) {
  console.log("Received: '" + e.data + "'")
}
