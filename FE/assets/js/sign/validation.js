function Validator(options) {

    function validate(inputElement, rule) {
        var errorMessage = rule.announce(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                        
        if ( errorMessage ) {
            errorElement.innerText = errorMessage;
            errorElement.classList.add('invalid');
            inputElement.classList.add('border-invalid');
        }
        else {
            errorElement.innerText = '';
            errorElement.classList.remove('invalid');
            inputElement.classList.remove('border-invalid');
        }
    }

    var formElement = document.querySelector(options.form); 

        if ( formElement ) {
            options.rules.forEach(function (rule){
                var inputElement = formElement.querySelector(rule.selector);
                var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                
                if ( inputElement ) {
                    inputElement.onblur = function() {
                        validate(inputElement, rule);        
                    }

                    inputElement.oninput = function() {
                        errorElement.innerText = '';
                        errorElement.classList.remove('invalid');
                        inputElement.classList.remove('border-invalid');
                    }
                }
            });     
            
        }   
}

function isRequired(selector, message) {
    return {
        selector : selector,
        announce: function(value) {
            return value.trim() ? undefined : message
        }   
    }
}

function pwMinLength(selector, min, message) {
    return {
        selector : selector,
        announce: function(value) {
            return value.length >=min ? undefined : message
        }
    }
}

