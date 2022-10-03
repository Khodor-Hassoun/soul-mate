const editProfileButton = document.getElementById('user-profile-pic')
const profileImage = document.querySelector('.user-profile-image')
const profileInfo = document.querySelector('.user-profile-info')
const profilePreferences = document.querySelector('.user-profile-preferences')
const signupBackBtn = document.querySelector('.popup-back-btn');
const passwPop = document.querySelector('.popup-container');

editProfileButton.addEventListener('click',()=>{
    profileImage.classList.add('show-edit')
    profileInfo.classList.add('show-edit')
    profilePreferences.classList.add('show-edit')
    passwPop.classList.add('show')
})
signupBackBtn.addEventListener('click',()=>{
    passwPop.classList.remove('show')
})