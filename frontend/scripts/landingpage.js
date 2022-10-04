// Variables for popup 1
const signupPrompt = document.getElementById('signup-prompt-click');
const signupBackBtn = document.querySelector('.popup-back-btn');
const signUpContainer = document.querySelector('.popup-container');
const signUpForm = document.getElementById('signup-form');

// Varaibles for popup 2
const bioPicContainer = document.querySelector('.signup-container-two').parentElement;
const bioPicPrompt = document.getElementById('popup-two-prompt');
const bioPicBackBtn = document.querySelector('#biopicx')

const baseURL = 'http://localhost:8000/api'
// Variables for sign in
const signInEmail = document.getElementById('signin-email');
const signInPassword = document.getElementById('signin-password')
const signInBtn = document.getElementById('signin-button')

// Variables for sign up
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
const bioPicForm = document.getElementById('bioPicForm')
const profilePicDiv = document.querySelector('.pop-pp')
let image64 = ''

profilePic.addEventListener('change',()=>{
    const file = profilePic.files[0]
    const reader = new FileReader()

    reader.addEventListener('load',()=>{
        console.log(reader.result)
        profilePicDiv.src= `${reader.result}`
        image64 = reader.result
    })

    reader.readAsDataURL(file)
})


signUpForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    signup();
})

signupPrompt.addEventListener('click',()=>{
    signUpContainer.classList.add('show')
});
signupBackBtn.addEventListener('click',()=>{
    signUpContainer.classList.remove('show')
})
bioPicPrompt.addEventListener('click',()=>{
    signUpContainer.classList.remove('show') 
    bioPicContainer.classList.add('show')
})
bioPicBackBtn.addEventListener('click',()=>{
    bioPicContainer.classList.remove('show')
})

// Login http://localhost:8000/api/auth/login Post request
signInBtn.addEventListener('click',login);
bioPicForm.addEventListener('submit', e=>{
    e.preventDefault()
    update()
})

function login(){
    const form = new FormData()
    form.append('email', signInEmail.value)
    form.append('password',signInPassword.value)
    axios.post(`${baseURL}/auth/login`,form)
    .then(res=>{
        console.log(res)
        console.log(res.data)
        const authorisation = res.data.authorisation
        const user = res.data.user
        localStorage.setItem('userID', parseInt(user.id))
        localStorage.setItem('token', authorisation.token)
        window.location.replace('feed.html')

    })
    .catch(e=>{
        console.log(e);
    })
}

function signup(){
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

    axios.post(`${baseURL}/auth/register`,form)
    .then(res=>{
        console.log(res)
        const authorisation = res.data.authorisation
        const user = res.data.user
        localStorage.setItem('userID', parseInt(user.id))
        localStorage.setItem('token', authorisation.token)
    })
    .catch(e=>[
        console.log(e)
    ])
}

// second onclick update image and bio
function update(){
    const userID = localStorage.getItem('userID')
    const token = localStorage.getItem('token')
    const form = new FormData()
    form.append('profile_picture',image64)
    form.append('bio',bio.value)
    form.append('hidden',0)
    form.append('password',null)

    axios.post(`${baseURL}/auth/update/${userID}`,form,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
    })
    .then(res=>{
        console.log(res.data)
        window.location.replace('feed.html')
    })
    .catch(e=>{
        console.log(e)
    })
}