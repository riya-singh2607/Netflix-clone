let accordian = document.getElementsByClassName("FAQ__title");

for (let i = 0; i < accordian.length; i++) {
  accordian[i].addEventListener("click", function () {
    if (this.childNodes[1].classList.contains("fa-plus")) {
      this.childNodes[1].classList.remove("fa-plus");
      this.childNodes[1].classList.add("fa-times");
    } else {
      this.childNodes[1].classList.remove("fa-times");
      this.childNodes[1].classList.add("fa-plus");
    }

    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

// Enhanced Sign In Modal Functions
function openSignInModal() {
    const modal = document.getElementById('signInModal');
    modal.style.display = 'block';
    // Force reflow
    modal.offsetHeight;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Reset form state
    const form = modal.querySelector('form');
    form.reset();
    clearFormStates(form);
}

function closeSignInModal() {
    const modal = document.getElementById('signInModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        clearFormStates(modal.querySelector('form'));
    }, 400);
}

function clearFormStates(form) {
    form.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error', 'success');
    });
    const button = form.querySelector('.signin-button');
    button.classList.remove('loading');
    button.disabled = false;
    button.textContent = 'Sign In';
}

function validateInput(input) {
    const group = input.parentElement;
    
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(input.value)) {
            group.classList.remove('error');
            group.classList.add('success');
            return true;
        } else {
            group.classList.remove('success');
            group.classList.add('error');
            return false;
        }
    }
    
    if (input.type === 'password') {
        if (input.value.length >= 6) {
            group.classList.remove('error');
            group.classList.add('success');
            return true;
        } else {
            group.classList.remove('success');
            group.classList.add('error');
            return false;
        }
    }
}

function handleSignIn(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]');
    const password = form.querySelector('input[type="password"]');
    const button = form.querySelector('.signin-button');
    
    const isEmailValid = validateInput(email);
    const isPasswordValid = validateInput(password);
    
    if (!isEmailValid || !isPasswordValid) {
        return;
    }
    
    // Simulate sign-in process
    button.classList.add('loading');
    button.disabled = true;
    button.textContent = 'Signing in';
    
    setTimeout(() => {
        button.classList.remove('loading');
        button.disabled = false;
        button.textContent = 'Success!';
        
        // Show success state
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.add('success');
        });
        
        // Close modal after success
        setTimeout(() => {
            closeSignInModal();
        }, 1500);
    }, 2000);
}

// Input validation on typing
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('input', () => {
        validateInput(input);
    });
    
    // Add focus animation handling
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
        validateInput(input);
    });
});

// Remember me checkbox animation
const rememberCheckbox = document.querySelector('#remember');
if (rememberCheckbox) {
    rememberCheckbox.addEventListener('change', function() {
        if (this.checked) {
            this.parentElement.classList.add('checked');
        } else {
            this.parentElement.classList.remove('checked');
        }
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('signInModal');
    if (event.target === modal) {
        closeSignInModal();
    }
}

// Get Started Email Validation and Animation
function setupEmailForms() {
    document.querySelectorAll('.email__form__container').forEach(container => {
        const input = container.querySelector('.email__input');
        const formContainer = container.querySelector('.form__container');
        const button = container.querySelector('.primary__button');
        
        // Add validation message element
        const validationMessage = document.createElement('div');
        validationMessage.className = 'email__validation__message';
        validationMessage.textContent = 'Please enter a valid email address';
        formContainer.appendChild(validationMessage);

        input.addEventListener('focus', () => {
            formContainer.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            formContainer.classList.remove('focused');
            if (!input.value) {
                formContainer.classList.remove('success', 'error');
            } else {
                validateEmailInput(input);
            }
        });

        input.addEventListener('input', () => {
            if (input.value) {
                validateEmailInput(input);
            } else {
                formContainer.classList.remove('success', 'error');
            }
        });

        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (!input.value) {
                formContainer.classList.add('error');
                input.focus();
                return;
            }

            if (validateEmailInput(input)) {
                handleGetStarted(container, input.value);
            }
        });
    });
}

function validateEmailInput(input) {
    const formContainer = input.parentElement;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(input.value)) {
        formContainer.classList.remove('error');
        formContainer.classList.add('success');
        return true;
    } else {
        formContainer.classList.remove('success');
        formContainer.classList.add('error');
        return false;
    }
}

function handleGetStarted(container, email) {
    const button = container.querySelector('.primary__button');
    const icon = button.querySelector('i');
    
    // Save original icon class
    const originalIconClass = icon.className;
    
    // Add loading state
    button.classList.add('loading');
    icon.className = 'fas fa-spinner';
    button.disabled = true;

    // Simulate processing
    setTimeout(() => {
        // Success state
        container.classList.add('success');
        icon.className = 'fas fa-check';
        
        // Reset after animation
        setTimeout(() => {
            // Store email in session storage
            sessionStorage.setItem('netflix_email', email);
            
            // Redirect to sign up page or show sign up modal
            button.classList.remove('loading');
            icon.className = originalIconClass;
            button.disabled = false;
            
            // You can either redirect to a signup page or show a modal
            openSignInModal();
        }, 1500);
    }, 1000);
}

// Initialize email form functionality
document.addEventListener('DOMContentLoaded', setupEmailForms);
