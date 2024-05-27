document.scrollingElement.scrollTop = 0;

let allParagraphs = document.querySelectorAll("main > section > p");

for (let p of allParagraphs) {
    p.innerHTML = p.textContent.split(/\s+/).map(l => `<span class="word">${l}</span>`).join(" ");
}

let words = document.querySelectorAll(".word");

document.addEventListener("mousemove", (event) => {
    for (let w of words) {
        let rect = w.getBoundingClientRect();

        let dx = (rect.x + rect.width / 2) - event.x;
        let dy = (rect.y + rect.height / 2) - event.y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        w.style.color = `rgb(${255 - distance}, ${(255 - distance) * 0.5}, 0)`;
    }
});

setInterval(() => {
    for (let w of words) {
        let r = Math.random() * 255;
        let g = Math.random() * 255;

        if (Math.random() < 0.2)
            w.style.background = `rgba(${r}, ${g}, 255, 0.15)`;
        else
            w.style.background = `rgba(255, 255, 255, 0.15)`
    }
}, 2000);

function getAllLetters(selector, className, elementName = "span") {
    let allHeadings = document.querySelectorAll(selector);

    for (let h of allHeadings) {
        h.innerHTML = h.textContent.split("").map(l => `<${elementName} class="${className}">${l}</${elementName}>`).join("");
    }

    return [...document.querySelectorAll(`.${className}`).values()];
}

let allHeadingLetters = getAllLetters("#kandinsky span", "letter");

let currentLetter = 0;
setInterval(() => {
    for (let i = 0; i < allHeadingLetters.length; i++) {
        let l = allHeadingLetters[i];

        switch (i % 12) {
            case currentLetter:
                l.style.background = `rgba(255, 255, 100, 0.9)`;
                break;

            case currentLetter - 1:
                l.style.background = `rgba(220, 255, 100, 0.5)`;
                break;

            case currentLetter - 2:
                l.style.background = `rgba(180, 255, 100, 0.3)`;
                break;

            case currentLetter - 3:
                l.style.background = `rgba(150, 255, 100, 0.1)`;
                break;

            default:
                l.style.background = `none`;
                break;
        }

    }
    currentLetter = (currentLetter + 1) % 12;
}, 100);

let allSynesthesiaLetters = getAllLetters("#synesthesia span", "synth-letter");

if (localStorage.getItem("synesthesia")) {
    let synesthesia = JSON.parse(localStorage.getItem("synesthesia"));

    for (let i = 0; i < synesthesia.length; i++) {
        let r = synesthesia[i].r;
        let g = synesthesia[i].g;
        let b = synesthesia[i].b;

        allSynesthesiaLetters[i].style.background = `rgba(${r}, ${g}, ${b}, 0.5)`;
    }
} else {
    let synesthesia = [];

    for (let i = 0; i < allSynesthesiaLetters.length; i++) {
        let r = Math.random() * 255;
        let g = Math.random() * 255;
        let b = Math.random() * 255;

        synesthesia.push({r, g, b});

        allSynesthesiaLetters[i].style.background = `rgba(${r}, ${g}, ${b}, 0.5)`;
    }

    localStorage.setItem("synesthesia", JSON.stringify(synesthesia));
}

let allLinkLetters = getAllLetters("#link span", "link-letter", "a");

let currentLinkLetter = 0;
setInterval(() => {
    for (let i = 0; i < allLinkLetters.length; i++) {
        let l = allLinkLetters[i];

        if (i === currentLinkLetter) {
            l.setAttribute("href", "https://www.wassilykandinsky.ru/");
        }
        else {
            l.removeAttribute("href");
        }

    }
    currentLinkLetter = (currentLinkLetter + 1) % allLinkLetters.length;
}, 100);

let sections = document.querySelectorAll("section");

document.addEventListener("scroll", (event) => {
    for (let s of sections) {
        let sectionY = s.getBoundingClientRect().top;
        let viewportY = visualViewport.offsetTop;

        s.style.translate = `${sectionY - viewportY - 200}px 0`;
    }
});