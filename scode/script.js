const inputs = document.querySelectorAll('form input');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        let inputId = input.id;
        if (inputId) {
            const label = document.querySelector(`label[for=${inputId}]`);
            if (label) {
                if (input.value.trim() !== "") {
                    label.style.color = 'var(--tertiary)';
                    label.style.fontSize = '0.8rem';
                    label.style.top = '-1.4rem';
                }
            }
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Select the form element
    const form = document.querySelector('form'); // or document.getElementById('myForm');

    // Create an empty object to hold the form data
    if(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting the traditional way
            let data = {};
                
            // Create a FormData object from the form
            const formData = new FormData(form);
    
            // Loop through the FormData entries and add to the data object
            formData.forEach((value, key) => {
                data[key] = value.trim(); // Add each key-value pair to the data object, trimming whitespace
            });
    
            const btn = event.submitter.name; // Determine which button was clicked
            data['action'] = btn;
    
            switch (btn) {
                case 'signup':
                    io.in(ajax, post, 'scode/function.php', data, function(res) { // Assuming 'data' is correct format
                        if (res.errormsg.success) {
                            io.out(errorMotd, good, res.errormsg.head, res.errormsg.message);
                            setTimeout(function() {
                                window.location.href = "index.php"; // Redirect after 3 seconds
                            }, 3000);
                        } else {
                            io.out(errorMotd, bad, res.errormsg.head, res.errormsg.message);
                        }
                        console.log(res);
                    });
                    break;
    
                case 'login':
                    console.log('Login button was clicked');
                    // Add your login AJAX code here
                    break;
    
                case 'reset':
                    console.log('Reset button was clicked');
                    // Add your reset logic here
                    break;
    
            }
        });
    }
    
    const logout = document.querySelector('#logout');
    if(logout){
        logout.addEventListener('click', function() {
            io.in(ajax, post, 'scode/function.php', {action: 'logout'}, function(res) {
                if (res.errormsg.success) {
                    io.out(errorMotd, good, res.errormsg.head, res.errormsg.message);
                    setTimeout(function() {
                        window.location.href = "index.php"; // Redirect after 3 seconds
                    }, 3000);
                } else {
                    io.out(errorMotd, bad, res.errormsg.head, res.errormsg.message);
                }
            });
        });
    }
});


