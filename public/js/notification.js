
// console.log('notification script is ready')
var notifTest = $('#notifTest')
console.log('loaded in coach')
socket.on('notification', (data) => {

    console.log(data)
    notifTest.append('<h1>' + data + '</h1>')

})