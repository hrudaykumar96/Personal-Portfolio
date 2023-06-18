//<----- ripple effect ------>


$("home").ripples({
    resolution: 512,
    dropRadius: 20,
    interactive: true,
    perturbance: 0.04,
});

//<----- ripple effect end --->

// <!-- tilt js effect starts -->

VanillaTilt.init(document.querySelectorAll("#tilt"), {
    max: 25,
});

// <!-- tilt js effect ends -->

// <!-- typed js effect starts -->

var typed = new Typed(".typing-text", {
    strings: ["Python Developer", "Frontend Developer", "Django Developer"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

// <!-- typed js effect ends -->

// <!-- scroll reveal animation -->


const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('home', { delay: 200 });
srtop.reveal('.image', { delay: 300 });

/* SCROLL ABOUT */
srtop.reveal('about', { delay: 200 });
srtop.reveal('#image', { delay: 300 });


/* SCROLL SKILLS */
srtop.reveal('skills', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('journey', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('projects', { interval: 200 });


/* SCROLL CONTACT */
srtop.reveal('contact', { delay: 400 });

/* SCROLL HEADER */
srtop.reveal('header', { delay: 200 });

/* SCROLL FOOTER */
srtop.reveal('footer', { delay: 200 });

// <!-- scroll reveal animation ends -->

//<-- scroll up button --->

const toTop = document.getElementById("scroll-top");
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
})

// <!-- menu bar -------------------->


function menubar() {
    let menu = document.getElementById("options");
    menu.classList.toggle("show")
}

//<!-- menu bar end --------------->

//<---- name colour ---------------->

setInterval(nameeffect, 1000);
function nameeffect() {
    var x = document.getElementById("name");
    if (x.style.color == "black") {
        x.style.color = "violet";
    }
    else if (x.style.color == "violet") {
        x.style.color = "indigo";
    }
    else if (x.style.color == "indigo") {
        x.style.color = "blue";
    }
    else if (x.style.color == "blue") {
        x.style.color = "green";
    }
    else if (x.style.color == "green") {
        x.style.color = "yellow";
    }
    else if (x.style.color == "yellow") {
        x.style.color = "orange";
    }
    else if (x.style.color == "orange") {
        x.style.color = "red";
    }
    else x.style.color = "black";
}

//<---- name colour end ---------------->

//<----- contact section validation ------------------->

function validate() {
    let selfname = document.getElementById("self-name");
    let email = document.getElementById("email");
    let mobile = document.getElementById("mobile");
    let message = document.getElementById("message");
    if (selfname.value.trim() == "") {
        selfname.style.border = "solid 3px red";
    }
    else {
        selfname.style.border = "solid 3px green";
    }
    if (email.value.trim() == "") {
        email.style.border = "solid 3px red";
    }
    else {
        email.style.border = "solid 3px green";
    }
    if (mobile.value.trim() == "") {
        mobile.style.border = "solid 3px red";
    }
    else {
        mobile.style.border = "solid 3px green";
    }
    if (message.value.trim() == "") {
        message.style.border = "solid 3px red";
    }
    else {
        message.style.border = "solid 3px green";
    }
    window.alert("Form Submission Failed! Try Again Later")
}

//<--- contact section validation end ------->