console.log("Working.");
//developer
const developer = document.querySelector('#developer');
developer.addEventListener('change', (event) => {
    const company = document.querySelector('#div-company');
    const language = document.querySelector('#div-language');
    const platform = document.querySelector('#div-platform');
    company.style.display = "none";
    language.style.display = "block";
    platform.style.display = "block";
});


//recruiter
const recruiter = document.querySelector('#recruiter');
recruiter.addEventListener('change', (event) => {
    const company = document.querySelector('#div-company');
    const language = document.querySelector('#div-language');
    const platform = document.querySelector('#div-platform');
    company.style.display = "block";
    language.style.display = "none";
    platform.style.display = "none";
});

