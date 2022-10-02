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
const location = document.getElementById('location')
const profilePic = document.getElementById('profile-image')
const bio = document.getElementById('bio')
const bioPicForm = document.getElementById('bioPicForm')


signUpForm.addEventListener('submit',(e)=>{
    e.preventDefault()
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
    })
    .catch(e=>{
        console.log(e);
    })
}

function signup(){

}