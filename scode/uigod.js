// UiGod Version 1.0
function getStackTrace() {
    var stack = new Error().stack;
    // Remove the first line from the stack trace
    return stack.split('\n').slice(2).join('\n');
} 

const printHTML = 'printHTML';
const addBefore = 'addBefore';
const errorMotd = 'errorMotd';
const conStyle = 'conStyle';
const addAfter = 'addAfter';
const getValue = 'getValue';
const replace = 'replace';
const deleter = 'delete';
const select = 'select';
const getURL = 'getURL';
const setURL = 'setURL';
const patch = 'patch';
const check = 'check';
const print = 'print';
const info = 'info';
const root = 'root';
const ajax = 'ajax';
const post = 'post';
const good = 'good';
const pick = 'pick';
const put = 'put';
const all = 'all';
const bad = 'bad';
const get = 'get';

io = {
    create : function (parent, element, attributes) {
        const parentSelector = typeof parent === 'string' ? document.querySelector(parent) : parent;
        const newElement = document.createElement(element);
        if (typeof attributes === 'object') {
            for (let key in attributes) {
                newElement.setAttribute(key, attributes[key]);
            }
        } else {
            console.error('Attribute Error: The attributes must be written in form of an object');
        }
        if (parentSelector) {
            parentSelector.appendChild(newElement);
        } else {
            console.error('Parent Error: The Parent element does not exist within the html.');
        }
    },
    in : function (action, element, param3, param4, param5) {
        switch(action){
            case 'select' :
                const sElement = document.querySelector(element);
                if (sElement) {
                    if (typeof param3 === 'function') {
                        param3.call(sElement);
                    }
                    return sElement;
                } else {
                    io.out('bad', 'Element Error: The element does not exist within the html.');
                }
            break;
            
            case 'pick':
                const pElement = document.querySelectorAll(element);
                if (!pElement) {
                    io.out('bad', 'Element Error: The element does not exist within the html.');
                }
                else if (typeof param3 === 'number' && typeof param4 === 'function' && pElement.length > param3) {
                    const selectedElement = pElement[param3 - 1];
                    param4.call(selectedElement);
                    return selectedElement;
                }
                else if(!param4){
                    return pElement[param3 - 1];
                }
            break;

            case 'all' :
                const aElement = document.querySelectorAll(element);
                if (!aElement) {
                    io.out('bad', 'Element Error: The element does not exist within the html.');
                }
                else if (typeof param3 === 'function' && aElement.length > 0) {
                    aElement.forEach(function(param2) {
                        param3.call(param2);
                    });
                    return aElement;
                }
            break;

            case "getValue" :
                const myElement = document.querySelector(element);
                if(!myElement){
                    io.out('bad', 'Element Error: The element does not exist within the html.');
                    return;
                }
                if(myElement.tagName.toLowerCase() === "input"){
                    return myElement.value;
                }else{
                    return myElement.textContent;
                }

            case "getURL" :
                const currentUrl = window.location.href;
            
                if (currentUrl.includes(element) && typeof param3 === "function") {
                    param3.call();
                } else {
                    io.out("bad", "String Mismatch : Your String is not in the URL, please debug your Links and try again.");
                }
            break;

            case "setURL":
                const url = new URL(element);
                const params = new URLSearchParams(url.search);

                for (const key in param3) {
                    params.set(key, param3[key]);
                }
                url.search = params.toString();
                window.location.href = url.toString();

                // Check if the file exists
                fetch(url.toString())
                .then(response => {
                    if (!response.ok) {
                        io.out('bad', 'File Error: The file does not exist within the server.');
                    } else {
                        window.location.href = url.toString();
                    }
                })
                .catch(e => {
                    console.error('There was a problem with the fetch operation: ' + e.message);
                });
            break;

            case 'conStyle':
                if (element === 'root') {
                    io.in(ajax, get, 'scode/config.json', function(data){
                        for (const key in data) {
                            if (data.hasOwnProperty(key)) {
                                document.documentElement.style.setProperty(`--${key}`, data[key]);
                            }
                        }
                    });
                }
            break;

            case 'ajax':
            let method = element.toUpperCase();
            let file = param3;
            let data = param4;
            let callback = param5;

            if (typeof param4 === 'function') {
                callback = param4;
                data = null;
            }

            let options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };

            if (method !== 'GET' && method !== 'HEAD') {
                options.body = JSON.stringify(data);
            }

            fetch(file, options)
                .then(response => response.json())
                .then(responseData => {
                    if (typeof callback === 'function') {
                        callback.call(this, responseData);
                    }
                })
                .catch(error => {
                    io.out(errorMotd, bad, 'Request Error', error.message);
                    console.error('There was a problem with the fetch operation: ' + error.message);
                });
            break;

        }
    },
    out : function (action, element, param3, param4) {
        switch(action){
            case 'bad':
                console.log('%c' + element, 'color: #f9caca; background-color: #d9534f79; font-weight:600; padding: 5pt 10pt; border-radius: 50pt;');
                console.error(getStackTrace());
            break;

            case 'good':
                console.log('%c' + element, 'color: #9dfcc1; background-color: #0e924179; font-weight:600; padding: 5pt 10pt; border-radius: 50pt;');
                console.error(getStackTrace());
            break;

            case 'check':
                console.log('%c' + element, 'color: #e5e5e5; background-color: #ffc40079; font-weight:600; padding: 5pt 10pt; border-radius: 50pt;');
                console.error(getStackTrace());
            break;

            case 'print':
                const prElement = document.querySelector(element);
                if (prElement) {
                    prElement.textContent = param3;
                } else {
                    io.out('bad', 'Element Error: The element does not exist within the html.');
                }
            break;

            case 'printHTML' :
                const aElement = document.querySelector(element);
                if (aElement) {
                    aElement.innerHTML += param3;
                } else {
                    io.out('bad', 'Element Error: The element does not exist within the html.');
                }
            break;

            case 'replace':
                const rElement = document.querySelector(element);
                if (rElement) {
                    if (param4 !== undefined) {
                        // If param4 is defined, replace the param3 string with param4
                        rElement.innerHTML = rElement.innerHTML.replace(new RegExp(param3, 'g'), param4);
                    } else {
                        // If param4 is not defined, replace the entire HTML with param3
                        rElement.innerHTML = param3;
                    }
                } else {
                    io.out('bad', 'Element Error: The element does not exist within the html.');
                }
            break;

            case 'addBefore':
                const bElement = document.querySelector(element);
                if (bElement) {
                    if (bElement.innerHTML.includes(param3)) {
                        bElement.innerHTML = bElement.innerHTML.replace(param3, param4 + param3);
                    } else {
                        io.out('bad', 'Search Error: The search string does not exist within the html element.');
                    }
                } else {
                    io.out('bad', 'Element Error: The element does not exist within the html.');
                }
            break;

            case 'addAfter':
            const pElement = document.querySelector(element);
            if (pElement) {
                if (pElement.innerHTML.includes(param3)) {
                    pElement.innerHTML = pElement.innerHTML.replace(param3, param3 + param4);
                } else {
                    io.out('bad', 'Search Error: The search string does not exist within the html element.');
                }
            } else {
                io.out('bad', 'Element Error: The element does not exist within the html.');
            }
        break;

        case 'errorMotd':
            io.create('body', 'div', {class: 'error-motd'});
            const createError = document.querySelector('.error-motd');
            createError.style.display = 'none'; // Start with display none
            createError.style.opacity = '0'; // Start with opacity 0
            createError.style.position = 'fixed';
            createError.style.left = '50%';
            createError.style.transform = 'translateX(-62%)';
            createError.style.transition = 'opacity 0.5s, top 0.5s'; // Add transition for opacity and top

            switch (element) {
                case 'bad':
                    createError.className = 'bad-motd';
                    createError.innerHTML = '<b> ' + param3 + '</b> <p> ' + param4 + ' </p>';
                    break;
                case 'check':
                    createError.className = 'check-motd';
                    createError.innerHTML = '<b>' + param3 + '</b> <p> ' + param4 + ' </p>';
                    break;
                case 'good':
                    createError.className = 'good-motd';
                    createError.innerHTML = '<b>' + param3 + '</b> <p> ' + param4 + ' </p>';
                    break;
                case 'info':
                    createError.className = 'info-motd';
                    createError.innerHTML = '<b>' + param3 + '</b> <p> ' + param4 + ' </p>';
                    break;
            }

            document.body.appendChild(createError);

            // Display the error message with a delay
            setTimeout(() => {
                createError.style.display = 'block';
                createError.style.top = '0';
                setTimeout(() => {
                    createError.style.opacity = '1';
                    createError.style.top = '2rem';
                }, 50); // Delay for half a second
            }, 0);

            // Hide the error message after 10 seconds
            setTimeout(() => {
                createError.style.opacity = '0';
                createError.style.top = '0';
                setTimeout(() => {
                    createError.style.display = 'none';
                    document.body.removeChild(createError);
                }, 500); // Wait for the transition to complete
            }, 10500); // 10 seconds + 0.5 second delay for initial display
            break;
            }
    }
};

const passwordContainers = document.querySelectorAll('.input');
passwordContainers.forEach(container => {
    const passwordInput = container.querySelector('input[type="password"]');
    if (passwordInput) {
        io.create(container, 'icon', {class: 'pswd-toggle'});
    }
});

const pswdToggles = document.querySelectorAll('.pswd-toggle');
pswdToggles.forEach(toggle => {
    toggle.textContent = 'visibility';
    toggle.addEventListener('click', () => {
        const input = toggle.closest('.input').querySelector('input[type="password"], input[type="text"]');
        if (input.type === 'password') {
            input.type = 'text';
            toggle.textContent = 'visibility_off';
        } else {
            input.type = 'password';
            toggle.textContent = 'visibility';
        }
    });
});


io.in(conStyle, root, 'config.json');

