const developer = document.querySelector('#developer');
developer.addEventListener('click', (event) => {
    const company = document.querySelector('#div-company');
    const language = document.querySelector('#div-language');
    const platform = document.querySelector('#div-platform');
    company.classList.add("d-none");
    language.classList.add("d-block");
    platform.classList.add("d-block");

    // company.style.display = "none";
    // language.style.display = "block";
    // platform.style.display = "block";
});


//recruiter
const recruiter = document.querySelector('#recruiter');
recruiter.addEventListener('click', (event) => {
    const company = document.querySelector('#div-company');
    const language = document.querySelector('#div-language');
    const platform = document.querySelector('#div-platform');
    company.style.display = "block";
    language.style.display = "none";
    platform.style.display = "none";
});

