// Navbar buttons
const userProfileButton = document.getElementById('user-profile-pic')
const userChatButton = document.getElementById('user-chat-pic');
const userLogoutButton = document.getElementById('user-logout-pic')

// feed container 
const feedContainer = document.querySelector('.feed-container')
userLogoutButton.addEventListener('click',()=>{
    localStorage.removeItem('userID')
    localStorage.removeItem('token')
    window.location.replace('index.html')
})
const baseURL = 'http://localhost:8000/api'

// ${localStorage.getItem(userID)}
axios.get(`${baseURL}/feed/${localStorage.getItem('userID')}`)
.then(res=>{
    console.log(res.data.page_user)
    userProfileButton.src = res.data.page_user.profile_picture
    userProfileButton.addEventListener('click',()=>{
        localStorage.getItem('userID')
        localStorage.getItem('token')
        window.location.replace('profile.html')
    })
    // User cards
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

        // Calculate age
        const birthday = new Date(user.dob)
        let ageDifMs = Date.now() - birthday.getTime();
        let ageDate = new Date(ageDifMs); // miliseconds from epoch
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);


        p2.innerHTML = `<h2>,${age}</h2>`

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
        // Create guest user popup
        
        
        
        userCard.setAttribute('guestID', user.id)
        userCard.addEventListener('click', ()=>{
            console.log(`I'm ${userCard.getAttribute('guestID')}`)
            axios.get(`${baseURL}/view/${parseInt(userCard.getAttribute('guestID'))}`)
            .then(res=>{
                console.log(res.data.data)
                const guestUser = res.data.data
                const guestUserContainer = document.createElement('section')
                guestUserContainer.classList.add('guest-user-container', 'popup-container', 'show')
                
                const guestUserCard = document.createElement('div')
                guestUserCard.classList.add('guest-user-card')

                // guest-user-image    DIV 1
                const guestUserImage = document.createElement('div')
                guestUserImage.classList.add('guest-user-image')
                const guestImage = document.createElement('img')
                guestImage.src = `${guestUser.profile_picture}`
                guestUserImage.append(guestImage)

                // Guest user contents  DIV 2
                const guestUserContent = document.createElement('div')
                guestUserContent.classList.add('guest-user-content')

                // DIV 2 DIV 1
                const guestName = document.createElement('div')
                guestName.classList.add('guest-names')

                const guestBackBtn = document.createElement('div')
                guestBackBtn.classList.add('back-btn')
                const backImage = document.createElement('img')
                backImage.src = './assets/images/back-btn.png'
                backImage.addEventListener('click',()=>{
                    guestUserContainer.classList.remove('show')
                })
                guestBackBtn.append(backImage)
                guestName.append(guestBackBtn)

                // DIV 2 DIV 2
                const guestDetails = document.createElement('div')
                guestDetails.classList.add('guest-fullname')

                const guestFullName = document.createElement('h2')
                guestFullName.innerHTML = `<h2>${guestUser.first_name}  ${guestUser.surname}`
                guestDetails.append(guestFullName)
                guestName.append(guestFullName)


                const guestUsername = document.createElement('span')
                guestUsername.innerText = `@${guestUser.username}`
                guestName.append(guestUsername)

                const guestAge = document.createElement('p')
                const birthday = new Date(guestUser.dob)
                let ageDifMs = Date.now() - birthday.getTime();
                let ageDate = new Date(ageDifMs); // miliseconds from epoch
                const age = Math.abs(ageDate.getUTCFullYear() - 1970);
                guestAge.innerText = `${age}`
                guestName.append(guestAge)

                const guestL = document.createElement('p')
                guestL.innerText = `${guestUser.location}`
                guestName.append(guestL)

                const guestBio = document.createElement('div')
                guestBio.classList.add('guest-bio')
                const bioText = document.createElement('p')
                bioText.innerText = `${guestUser.bio}`
                guestBio.append(bioText)


                const guestButtons = document.createElement('div')
                guestButtons.classList.add('user-buttons')

                const likeBtn = document.createElement('button')
                likeBtn.textContent = 'Like'

                const blockBtn = document.createElement('button')
                blockBtn.textContent = 'Block'

                const messageBtn = document.createElement('button')
                messageBtn.textContent = 'Message'
                guestButtons.append(likeBtn)
                guestButtons.append(blockBtn)
                guestButtons.append(messageBtn)

                guestUserContent.append(guestName)
                guestUserContent.append(guestBio)
                guestUserContent.append(guestButtons)

                guestUserCard.append(guestUserImage)
                guestUserCard.append(guestUserContent)
                guestUserContainer.append(guestUserCard)
                feedContainer.append(guestUserContainer)

                likeBtn.addEventListener('click',()=>{
                    const form = new FormData()
                    console.log(parseInt(guestUser.id))
                    form.append('sender_id',localStorage.getItem('userID'))
                    form.append('receiver_id', parseInt(guestUser.id))
                    axios.post(`${baseURL}/like`,form)
                    .then(res=>{
                        if(res.data.status === 'success')
                            likeBtn.textContent = 'Liked!'
                            likeBtn.style.backgroundColor = '#2a9d8f'
                    })
                })

                blockBtn.addEventListener('click',()=>{
                    const form = new FormData()
                    form.append('sender_id',parseInt(localStorage.getItem('userID')))
                    form.append('receiver_id', parseInt(guestUser.id))
                    axios.post(`${baseURL}/block`,form)
                    .then(res=>{
                        if(res.data.status === 'success')
                            blockBtn.textContent = 'Blocked'
                            blockBtn.style.backgroundColor = '#e63946'
                    })
                })
                messageBtn.addEventListener('click',()=>{
                    console.log('hello message')
                })
            })
        })

    }
})

