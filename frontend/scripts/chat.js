const postMessage = document.getElementById('message')
const sendBtn = document.getElementById('send-btn')
const chatContent = document.querySelector('.chat-content')
const baseURL = 'http://localhost:8000/api'

const form = new FormData()
form.append('receiver_id',10)
axios.post(`${baseURL}/message/7`, form)
.then(res=>{
    console.log(res.data.data);
    chats = res.data.data

    for(chat of chats){
        const messageContainer = document.createElement('div')
        messageContainer.classList.add('message-container')

        const messageBox = document.createElement('div')
        messageBox.classList.add('message-box')

        const message =document.createElement('p')
        message.innerText = `${chat.message}`
        if(chat.sender_id === 7){
            messageBox.classList.add('user-message')
            messageContainer.classList.add('user-message')
        }
        messageBox.append(message)
        messageContainer.append(messageBox)
        chatContent.append(messageContainer)
    }
})


sendBtn.addEventListener('click',()=>{
    const postM = new FormData()
    postM.append('message', postMessage.value)
    postM.append('sender_id',7) //LOCALSTORAGE
    postM.append('receiver_id',10)
    axios.post(`${baseURL}/message`,postM)
    .then(res=>{
        window.location.reload()
        
    })

})