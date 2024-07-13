let errors = [];
const submitButton = document.getElementById('submitButton');

function checkValidityInput(input) {
    switch (input.name) {
        case "name":
            if(input.value.length < 2){
                return 'Your name should be more than 2 symbols'
            }
            if(input.value.length > 20){
                return 'Your name should be less than 20 symbols'
            }
            break;
        case "email":
            if(!input.value.includes('@')){
                return 'Your email should include @'
            }
            break;
        case "age":
            if(input.value <= 0){
                return 'Your age should be more than 0'
            }
            break;
    }
};

function checkAll() {
    errors = [];
    let inputs = document.querySelectorAll("input");
    let errorsInfo = document.querySelectorAll(".errorsInfo");


    for (let input of inputs) {
        let error = checkValidityInput(input);
        if (error) {
            errors.push(error)
        }
    }

    if (errors.length > 0) {
        errorsInfo[0].innerHTML = errors.join(' ./n')
    }
}


document.getElementById("myForm").addEventListener("submit", function (e) {
    e.preventDefault();
    checkAll();

    if (errors.length > 0) {
        return; 
    }

    const formData = new FormData(myForm);

    const data = {};

    formData.forEach(function (value, key) {
        data[key] = value;
        });
    
        const jsonData = JSON.stringify(data);

        localStorage.setItem("formData", jsonData);
        window.location.href = "resilt.html";
});

const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('passwordError');

const validateForm = () => {
    let isValid = true;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordPattern.test(passwordInput.value)) {
        passwordError.textContent = "Пароль должен быть не менее 8 символов длиной и содержать как минимум одну заглавную букву, одну строчную букву и одну цифру";
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    submitButton.disabled = !isValid;
}

passwordInput.addEventListener('input', validateForm);