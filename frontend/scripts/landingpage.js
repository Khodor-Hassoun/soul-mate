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
    })
    .catch(e=>{
        console.log(e);
    })
}