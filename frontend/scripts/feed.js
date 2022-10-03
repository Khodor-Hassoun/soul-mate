// Navbar buttons
const userProfileButton = document.getElementById('user-profile-pic')
const userChatButton = document.getElementById('user-chat-pic');
const userLogoutButton = document.getElementById('user-logout-pic')

// feed container 
const feedContainer = document.querySelector('.feed-container')

const baseURL = 'http://localhost:8000/api'
// ${localStorage.getItem(userID)}

axios.get(`${baseURL}/feed/5`)
.then(res=>{
    // console.log(res.data)
    for(let user of res.data.data){
        console.log(user)
        const userCard = document.createElement('div')
        userCard.classList.add('user-card')

        const userImage = document.createElement('div')
        userImage.classList.add('user-image')

        const image = document.createElement('img')
        image.src = `${user.profile_picture}`

        userImage.append(image);

        // User content
        const userContent = document.createElement('div')
        userContent.classList.add('user-content')

        const userConNA = document.createElement('div')
        userConNA.classList.add('user-content-name-age')
        const p1 = document.createElement('p')
        p1.innerHTML = `<h2>${user.username}</h2>`
        
        const p2 = document.createElement('p')
        p2.innerHTML = `<h2>,${user.dob}</h2>`

        userConNA.append(p1)
        userConNA.append(p2)

        const userConL = document.createElement('div')
        userConL.classList.add('user-content-location')

        const pLocation = document.createElement('p')
        pLocation.innerText = `${user.location}`
        userConL.append(pLocation)

        userContent.append(userConNA)
        userContent.append(userConL)

        userCard.append(userImage)
        userCard.append(userContent)
        feedContainer.append(userCard)



    }
})