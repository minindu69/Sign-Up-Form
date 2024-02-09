document.addEventListener("DOMContentLoaded", ()=>{

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const btn = document.getElementById("btn");
    const emailTips = document.getElementById("emailTips");
    const passwordTips = document.getElementById("passwordTips");
    const iconDiv = document.getElementById("icon-div");
    const icon = document.getElementById("icon");

    //validate email
    const validateEmail = () => {
        let rtnEmail;

        // Clear existing email tips
        emailTips.innerHTML = "";

        //trimmed Email
        const trimmedEmail = email.value.trim();
        console.log(trimmedEmail + "-trimmedEmail");

        console.log("oninput email");
        console.log(trimmedEmail);

        const hasUpperCase = /[A-Z]/.test(trimmedEmail);

        // Regular expressions

        //john.doe@example.com
        const generalEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail);

        //jane_smith@example.co.uk
        const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail);

        //user123@example-domain.co
        const permissiveEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

        //ms@gmail.com
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(trimmedEmail);

        if (trimmedEmail.includes(" ")) {
            const spacesLi = document.createElement("li");

            console.log("Email cannot contain spaces");
            spacesLi.textContent = "* Email cannot contain spaces";
            emailTips.appendChild(spacesLi);
            
            //styles
            email.style.backgroundImage = "url('images/warning.png')";
            email.style.backgroundSize = "18px";

            rtnEmail = false;
        }

        else if (hasUpperCase) {
            const upperCaseLi = document.createElement("li");

            console.log("Email cannot contain uppercase letters");
            upperCaseLi.textContent = "* Email cannot contain uppercase letters";
            emailTips.appendChild(upperCaseLi);

            //styles
            email.style.backgroundImage = "url('images/warning.png')";
            email.style.backgroundSize = "18px";
            rtnEmail = false;
        }

        else if(trimmedEmail.length == 0){
            console.log("nothing in email");

            // remove the entire inline style attribute
            email.removeAttribute("style");

            return false;
        }

        else if (!gmailRegex && trimmedEmail.length>0) {

            const emailRegexLi = document.createElement("li");

            console.log("Invalid email format");
            emailRegexLi.textContent = "* Invalid email format";
            emailTips.appendChild(emailRegexLi);

            //styles
            email.style.backgroundImage = "url('images/warning.png')";
            email.style.backgroundSize = "18px";    
            rtnEmail = false;
        } else {
            const emailRegexLi = document.createElement("li");

            console.log("Email is valid.");
            emailRegexLi.textContent = "Looks good!";
            emailTips.appendChild(emailRegexLi);

            //styles
            email.style.backgroundImage = "url('images/success-final.png')";
            email.style.backgroundSize = "18px";
            emailRegexLi.style.color = "rgb(1, 151, 184)";

            rtnEmail = true;
        }

        return rtnEmail;
    }


    //toggle password
    const togglePassword = (iconClass)=>{

        console.log(iconClass);
        console.log("toggle pwd");

        if(password.type === "password"){
            password.type = "text";
            iconClass.style.backgroundImage = "url('images/show.png')";
        }else{
            password.type = "password";
            iconClass.style.backgroundImage = "url('images/hide.png')";
        }
    }

    //validate password
    const validatePassword = ()=>{
        let rtnPassword;

        // Clear existing password tips
        passwordTips.innerHTML = "";

        //trimmed Password
        const trimmedPassword = password.value.trim();
        console.log(trimmedPassword + " - trimmedPassword");

        //Add class styles
        icon.classList.add("icon");

        //check spaces
        if(trimmedPassword.includes(" ")){
            const spacePasswordLi = document.createElement("li");

            console.log("Password cannot contain spaces.");
            spacePasswordLi.textContent = "* Password cannot contain spaces.";
            passwordTips.appendChild(spacePasswordLi);

            rtnPassword = false;
        }
        else if(trimmedPassword.length == 0){
            console.log("nothing in psswd");

            // remove the entire inline style attribute
            icon.classList.remove("icon");

            return false;
        }
        else if(trimmedPassword.length < 8 && trimmedPassword.length > 0){
            const weakPasswordLi = document.createElement("li");

            console.log("Password must be more than 8 characters.");
            weakPasswordLi.textContent = "* Password must be more than 8 characters.";
            passwordTips.appendChild(weakPasswordLi);

            rtnPassword = false;
        }
        else{
            const strongPasswordLi = document.createElement("li");

            console.log("Password is valid.");
            strongPasswordLi.textContent = "Strong password";
            passwordTips.appendChild(strongPasswordLi);
            strongPasswordLi.style.color = "rgb(1, 151, 184)";

            rtnPassword = true;
        }

        return rtnPassword;

    }

    // button disable or enable
    const buttonStatus = ()=>{

        const rtnEmail = validateEmail();
        const rtnPassword = validatePassword();

        if (rtnEmail && rtnPassword) {
            // If both are valid, enable the button
            btn.disabled = false;
            btn.classList.add("enable-btn");
        }else{
            btn.disabled = true;
            btn.classList.remove("enable-btn");
        }

    }

    const submit = ()=>{
        console.log("submit button clicked!");

        // for last step
        email.value = "";
        password.value = "";
        validateEmail();
        validatePassword();

        //disable the button
        btn.disabled = true;
        btn.classList.remove("enable-btn");
    }

    // Initially, disable the button
    btn.disabled = true;

    // Event listener for email input
    email.addEventListener("input",()=>{
        setTimeout(()=>{
            buttonStatus();
        },1000);
    });

    // Event listener for password input
    password.addEventListener("input",buttonStatus);
    password.addEventListener("focus",()=>{
        iconDiv.style.border = "2px solid blue";
        iconDiv.style.borderLeft = "none";
        // iconDiv.classList.add("icon-div-border");
    });
    password.addEventListener("blur",()=>{
        iconDiv.style.border = "none";
    });

    //Add event for icon
    icon.addEventListener("click",()=>{
        togglePassword(icon); // pass icon div

        password.focus();
        iconDiv.style.border = "2px solid blue";
        iconDiv.style.borderLeft = "none";
    });
    iconDiv.addEventListener("click",()=>{
        password.focus();
    })

    // Event listener for submit button
    btn.addEventListener("click",submit);

    window.onload = ()=>{
        email.focus();
    }

});