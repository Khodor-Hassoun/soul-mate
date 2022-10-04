const editProfileButton = document.getElementById('user-profile-pic')
const profileImage = document.querySelector('.user-profile-image')
const profileInfo = document.querySelector('.user-profile-info')
const profilePreferences = document.querySelector('.user-profile-preferences')
const signupBackBtn = document.querySelector('.popup-back-btn');
const passwPop = document.querySelector('.popup-container');
const feedContainer = document.querySelector('.feed-container')
const baseURL = 'http://localhost:8000/api'
const firstName = document.getElementById('name')
const surname = document.getElementById('surname')
const email = document.getElementById('email')
const userName = document.getElementById('username')
const password = document.getElementById('password')
const dob = document.getElementById('dob')
const gender = document.getElementById('gender')
const preference = document.getElementById('preference')
const locationUser = document.getElementById('location')
const profilePic = document.getElementById('profile-image')
const bio = document.getElementById('bio')
const userImageDisplay = document.getElementById('user-image')
const ishidden = document.getElementById('hidden')
const hiddenDiv = document.querySelector('.hidden-div')
const profileEditBtn = document.getElementById('profile-edit')
let image64 = ''
let notHidden = 0
const userPofileCon = document.querySelector('.user-profile-container')


profilePic.addEventListener('change',()=>{
    const file = profilePic.files[0]
    const reader = new FileReader()

    reader.addEventListener('load',()=>{
        console.log(reader.result)
        userImageDisplay.src= `${reader.result}`
        image64 = reader.result
    })

    reader.readAsDataURL(file)
})




editProfileButton.addEventListener('click',()=>{
    profileImage.classList.add('show-edit')
    profileInfo.classList.add('show-edit')
    profilePreferences.classList.add('show-edit')
    passwPop.classList.add('show')
    userPofileCon.classList.remove('hide-edit')
})
signupBackBtn.addEventListener('click',()=>{
    passwPop.classList.remove('show')
})
axios.get(`${baseURL}/feed/${parseInt(localStorage.getItem('userID'))}`)
.then(res=>{
    const user = res.data.page_user
    firstName.value = user.first_name
    surname.value = user.surname
    email.value = user.email
    dob.value = user.dob
    userImageDisplay.src = user.profile_picture
    preference.value = user.preference
    gender.value = user.gender
    locationUser.value = user.location
    userName.value = user.username
    bio.value = user.bio
    ishidden.value = user.hidden
    if(ishidden.value == 0){
        ishidden.checked = false
    }else ishidden.checked = true
})

axios.get(`${baseURL}/profile/${parseInt(localStorage.getItem('userID'))}`)
.then(res=>{
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

        userCard.setAttribute('guestID', user.id)
        userCard.addEventListener('click', ()=>{
            console.log(`I'm ${userCard.getAttribute('guestID')}`)
        })

    }
})

hiddenDiv.addEventListener('click',()=>{
    if(parseInt(ishidden.value) === 1){
        ishidden.value = 0
        ishidden.checked = false
        notHidden = 0
    }else{
        ishidden.value = 1
        ishidden.checked = true
        notHidden = 1
    }
})
// Update user
function update(){
    const userID = parseInt(localStorage.getItem('userID'))
    const token = localStorage.getItem('token')
    const form = new FormData()
    form.append('first_name',firstName.value)
    form.append('surname',surname.value)
    form.append('email',email.value)
    form.append('username',userName.value)
    form.append('password',password.value)
    form.append('dob', dob.value)
    form.append('gender',parseInt(gender.value))
    form.append('preference',parseInt(preference.value))
    form.append('location',locationUser.value)
    form.append('profile_picture',image64)
    form.append('bio',bio.value)
    form.append('hidden',notHidden)
    axios.post(`${baseURL}/auth/update/${userID}`,form,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
    })
    .then(res=>{
        console.log(res)
    })
    .catch(e=>{
        console.log(e)
    })
}

profileEditBtn.addEventListener('click', ()=>{
    update()
    userPofileCon.classList.add('hide-edit')

})