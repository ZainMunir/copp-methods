document.addEventListener('DOMContentLoaded', (event) => {
    // change this index to the index of your page to get yours to load first
    // loadPage("instruction-1");
    load_buttons();
    load_instructions();
    document.getElementById(`inst-4`).classList.add("selected");
    loadPage("inst-4")
});

// a function to load insert a html page into the #content-container and load
// the javascript file for that html page
function loadPage(pageName) {
    const element = document.querySelector("#page-container");
    fetch(`pages/${pageName}.html`)
        .then(response => response.text())
        .then(data => {
            element.innerHTML = data;
        });

    // const script = document.createElement("script");
    // script.src = `pages/${pageName}.js`;
    // element.appendChild(script);
}

// this function keeps checking if an element exists and returns that element
// if it does exist
async function isElementLoaded(element) {
    while (document.querySelector(element) === null) {
        await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(element);
};

function load_instructions() {
    let container = document.querySelector("#jasfile");
    for (let i = 0; i < jas.length; i++) {
        let instruction_div = document.createElement("div");
        instruction_div.classList.add("instruction")
        instruction_div.id = `inst-${i + 1}`;
        instruction_div.innerHTML = `<pre>${i + 1}     ${jas[i]}<pre>`
        container.appendChild(instruction_div);
    }
}

function load_buttons() {
    let curr_instruction = 0

    let container = document.querySelector("#buttons");
    let prev_button = document.createElement("button");
    prev_button.innerHTML = "Previous"
    prev_button.disabled = true;

    prev_button.addEventListener("click", () => {
        curr_instruction -= 1
        if (curr_instruction == 0) {
            prev_button.disabled = true;
        }
        next_button.disabled = false;
        loadPage(`inst-${order[curr_instruction]}`);
        highlight(curr_instruction);
    })

    let next_button = document.createElement("button");
    next_button.innerHTML = "Next"

    next_button.addEventListener("click", () => {
        curr_instruction += 1
        if (curr_instruction == order.length - 1) {
            next_button.disabled = true;
        }
        prev_button.disabled = false;
        loadPage(`inst-${order[curr_instruction]}`);
        highlight(curr_instruction);
    })

    container.appendChild(prev_button);
    container.appendChild(next_button);
}

function highlight(curr_instruction) {
    document.getElementsByClassName(`selected`)[0].classList.remove("selected");
    if (curr_instruction == 5 || curr_instruction == 24) {
        document.getElementById(`inst-${9}`).classList.add("selected");
    } else if (curr_instruction == 14 || curr_instruction == 22) {
        document.getElementById(`inst-${24}`).classList.add("selected");
    } else {
        document.getElementById(`inst-${order[curr_instruction]}`).classList.add("selected");
    }
}


var jas = [
    ".constant",
    "    objref  0xCAFE",
    ".end-constant",
    ".main",
    "    BIPUSH 0x00",
    "    LDC_W objref",
    "    BIPUSH 0x10",
    "    BIPUSH 0x20",
    "    INVOKEVIRTUAL add",
    "    OUT",
    "    HALT",
    ".end-main",
    ".method add(a, b)",
    ".var",
    "    c",
    ".end-var",
    "    BIPUSH 0x40",
    "    LDC_W objref",
    "    ILOAD a",
    "    ILOAD b",
    "    BIPUSH 0x30",
    "    ISTORE c",
    "    IADD",
    "    INVOKEVIRTUAL times_two",
    "    IRETURN",
    ".end-method",
    ".method times_two(x)",
    ".var",
    "    y",
    ".end-var",
    "    ILOAD x",
    "    DUP",
    "    DUP",
    "    ISTORE y",
    "    IADD",
    "    IRETURN",
    ".end-method"
]

var order = [4, 5, 6, 7, 8, "9a", 13, 17, 18, 19, 20, 21, 22, 23, "24a", 27, 31, 32, 33, 34, 35, 36, "24b", 25, "9b", 10, 11]