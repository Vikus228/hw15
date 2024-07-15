document.addEventListener('DOMContentLoaded', function() {
    const form = document.forms.myForm;
    const userNameInput = form.elements.name;
    const emailInput = form.elements.email;
    const ageInput = form.elements.age;
    const genderInput = form.elements.gender;
    const agreeTermsCheckbox = form.elements.consent;
    const passwordInput = form.elements.password;
    const select = form.elements.select;
    const submitButton = document.getElementById('submitBtn');
    const userNameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const ageError = document.getElementById('ageError');
    const genderError = document.getElementById('genderError');
    const termsError = document.getElementById('consentError');
    const passwordError = document.getElementById('passwordError');

    function validateForm() {
        const nameValid = validateName();
        const emailValid = validateEmail();
        const ageValid = validateAge();
        const genderValid = validateGender();
        const consentValid = validateConsent();
        const passwordValid = validatePassword();

        return nameValid && emailValid && ageValid && genderValid && consentValid && passwordValid;
    }

    function updateSubmitButton() {
        submitButton.disabled = !validateForm();
    }

    form.addEventListener('input', updateSubmitButton);
    form.addEventListener('change', updateSubmitButton);

    form.addEventListener('submit', function(evt) {
        evt.preventDefault();
        if (validateForm()) {
            console.log('Name:', userNameInput.value);
            console.log('Email:', emailInput.value);
            console.log('Age:', ageInput.value);
            console.log('Gender:', getSelectedGender());
            console.log('Job:', select.value);
            console.log('Password:', passwordInput.value);
            form.reset();
        }
    });

    userNameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    ageInput.addEventListener('blur', validateAge);
    genderInput.forEach(input => input.addEventListener('blur', validateGender));
    agreeTermsCheckbox.addEventListener('blur', validateConsent);
    passwordInput.addEventListener('blur', validatePassword);

    userNameInput.addEventListener('focus', () => userNameError.style.display = 'none');
    emailInput.addEventListener('focus', () => emailError.style.display = 'none');
    ageInput.addEventListener('focus', () => ageError.style.display = 'none');
    genderInput.forEach(input => input.addEventListener('focus', () => genderError.style.display = 'none'));
    agreeTermsCheckbox.addEventListener('focus', () => termsError.style.display = 'none');
    passwordInput.addEventListener('focus', () => passwordError.style.display = 'none');

    function validateName() {
        if (!userNameInput.value.trim()) {
            userNameError.textContent = 'Введите имя пользователя.';
            userNameError.style.display = 'block';
            return false;
        } else if (userNameInput.value.length < 2) {
            userNameError.textContent = 'Имя пользователя должно быть не менее 2 символов.';
            userNameError.style.display = 'block';
            return false;
        } else if (userNameInput.value.length > 20) {
            userNameError.textContent = 'Имя пользователя должно быть не более 20 символов.';
            userNameError.style.display = 'block';
            return false;
        }
        userNameError.style.display = 'none';
        return true;
    }

    function validateEmail() {
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Введите email.';
            emailError.style.display = 'block';
            return false;
        } else if (!validateEmailFormat(emailInput.value)) {
            emailError.textContent = 'Введите корректный email.';
            emailError.style.display = 'block';
            return false;
        }
        emailError.style.display = 'none';
        return true;
    }

    function validateAge() {
        if (!ageInput.value.trim()) {
            ageError.textContent = 'Введите возраст.';
            ageError.style.display = 'block';
            return false;
        } else if (ageInput.value <= 0) {
            ageError.textContent = 'Введите корректный возраст.';
            ageError.style.display = 'block';
            return false;
        }
        ageError.style.display = 'none';
        return true;
    }

    function validateGender() {
        const selectedGender = getSelectedGender();
        if (!selectedGender) {
            genderError.textContent = 'Выберите пол.';
            genderError.style.display = 'block';
            return false;
        }
        genderError.style.display = 'none';
        return true;
    }

    function validateConsent() {
        if (!agreeTermsCheckbox.checked) {
            termsError.textContent = 'Необходимо согласие с условиями.';
            termsError.style.display = 'block';
            return false;
        }
        termsError.style.display = 'none';
        return true;
    }

    function validatePassword() {
        if (!passwordInput.value.trim()) {
            passwordError.textContent = 'Введите пароль.';
            passwordError.style.display = 'block';
            return false;
        } else if (!validatePasswordFormat(passwordInput.value)) {
            passwordError.textContent = 'Пароль должен быть не менее 8 символов длиной и содержать как минимум одну заглавную букву, одну строчную букву и одну цифру';
            passwordError.style.display = 'block';
            return false;
        }
        passwordError.style.display = 'none';
        return true;
    }

    function getSelectedGender() {
        for (let i = 0; i < genderInput.length; i++) {
            if (genderInput[i].checked) {
                return genderInput[i].value;
            }
        }
        return null;
    }

    function validateEmailFormat(email) {
        let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    }

    function validatePasswordFormat(password) {
        let regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regexPass.test(password);
    }
});