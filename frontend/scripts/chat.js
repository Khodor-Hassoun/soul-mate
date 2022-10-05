const postMessage = document.getElementById('message')
const sendBtn = document.getElementById('send-btn')
const chatContent = document.querySelector('.chat-content')
const chatSidebar = document.querySelector('.chat-sidebar')
const chatBodyCon = document.querySelector('.chat-body-container')
const chatCon = document.querySelector('.chat-container')
const baseURL = 'http://localhost:8000/api'


axios.get(`${baseURL}/chat/${parseInt(localStorage.getItem('userID'))}`)
.then(res =>{
    const guests = res.data.users
    for(let guest of guests){
        const guestTab = document.createElement('div')
        guestTab.classList.add('guest-tab')
        guestTab.setAttribute('guestID', guest.id)
        const guestName = document.createElement('h3')
        guestName.innerText = `${guest.first_name} ${guest.surname}`
        guestTab.append(guestName)
        chatSidebar.append(guestTab)
        guestTab.addEventListener('click',()=>{
            const guestID = parseInt(guestTab.getAttribute('guestID'))
            localStorage.setItem('guestID', guestID)
            const userID = parseInt(localStorage.getItem('userID'))
            chatContent.innerHTML  = ''
            getMessage(userID, guestID)
        })
    }
})




const getMessage = (userID, guestID)=>{
    const form = new FormData()
    form.append('receiver_id', guestID)
    axios.post(`${baseURL}/message/${userID}`, form)
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
            if(chat.sender_id === parseInt(localStorage.getItem('userID'))){
                messageBox.classList.add('user-message')
                messageContainer.classList.add('user-message')
            }
            messageBox.append(message)
            messageContainer.append(messageBox)
            chatContent.append(messageContainer)
        }
    })
}



sendBtn.addEventListener('click',()=>{
    const postM = new FormData()
    postM.append('message', postMessage.value)
    postM.append('sender_id', localStorage.getItem('userID')) //LOCALSTORAGE
    postM.append('receiver_id', localStorage.getItem('guestID'))
    axios.post(`${baseURL}/message`,postM)
    .then(res=>{
        window.location.reload()
        
    })

})