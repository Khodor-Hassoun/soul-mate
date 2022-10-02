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

axios.get(`${baseURL}/users`)
.then(res=>{
    console.log(res.data.data)
})