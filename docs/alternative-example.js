document.addEventListener('DOMContentLoaded', (event) => {
    load_buttons();
    load_instructions();
    load_binary();
    add_selected(`inst-4`);
    loadPage("inst-4")
});

// a function to load insert a html page into the #content-container
function loadPage(pageName) {
    const element = document.querySelector("#page-container");
    fetch(`pages2/${pageName}.html`)
        .then(response => response.text())
        .then(data => {
            element.innerHTML = data;
        });
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
        instruction_div.classList.add("instruction");
        if (i == 16 || i == 32) {
            instruction_div.classList.add(`inst-${i + 1}a`);
            instruction_div.classList.add(`inst-${i + 1}b`);
        } else {
            instruction_div.classList.add(`inst-${i + 1}`);
        }
        instruction_div.innerHTML = `<pre>${i + 1}     ${jas[i]}<pre>`;
        container.appendChild(instruction_div);
    }

}
function load_binary() {
    let container = document.querySelector("#binary");
    for (part of bin_parts) {
        let abbr = document.createElement("abbr");
        abbr.innerHTML = part.hex
        abbr.title = part.abbr
        abbr.classList = part.classes
        container.appendChild(abbr);
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
    next_button.innerHTML = "Next";

    next_button.addEventListener("click", () => {
        curr_instruction += 1
        if (curr_instruction == order.length - 1) {
            next_button.disabled = true;
        }
        prev_button.disabled = false;
        loadPage(`inst-${order[curr_instruction]}`);
        highlight(curr_instruction);
    })

    let reset_button = document.createElement("button");
    reset_button.innerHTML = "Reset";
    reset_button.addEventListener("click", () => {
        curr_instruction = 0
        prev_button.disabled = true;
        next_button.disabled = false;
        loadPage(`inst-${4}`);
        highlight(0);
    })

    let alternative_button = document.createElement("button");
    alternative_button.innerHTML = "Alternative";
    alternative_button.addEventListener("click", () => {
        window.location.href = 'index.html';
    })

    container.appendChild(prev_button);
    container.appendChild(next_button);
    container.appendChild(reset_button);
    container.appendChild(alternative_button);
}

function highlight(curr_instruction) {
    const elements = Array.from(document.getElementsByClassName("selected"));
    for (const elem of elements) {
        elem.classList.remove("selected");
    }
    add_selected(`inst-${order[curr_instruction]}`)
    document.getElementById("pc").innerHTML = pc[curr_instruction];
}


function add_selected(className) {
    const elements = Array.from(document.getElementsByClassName(className));
    for (elem of elements) {
        elem.classList.add("selected");
    }
}

var order = [4, 11, 12, 13, 14, 15, 16, "17a", 22, 26, 27, 28, 29, 30, 31, 32, "33a", 36, 40, 41, 42, 43, 44, 45, "33b", 34, "17b", 18, 19, 20]
var pc = [0, 0, 2, 3, 5, 8, 10, 12, 22, 22, 24, 27, 29, 31, 33, 35, 36, 44, 44, 46, 47, 48, 50, 51, 36, 39, 12, 15, 16, 17]

var jas = [
    ".constant",
    "    objref  0xCAFE",
    ".end-constant",
    ".main",
    ".var",
    "    random",
    "    zain",
    "    jack",
    "    atze",
    ".end-var",
    "    BIPUSH 0x70",
    "    DUP",
    "    ISTORE jack",
    "    LDC_W objref",
    "    BIPUSH 0x10",
    "    BIPUSH 0x20",
    "    INVOKEVIRTUAL add",
    "    ISUB",
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

var bin_parts = [{
    hex: "1dea dfad ",
    abbr: "Magic Number",
    classes: "magic"
}, {
    hex: "0001 0000 ",
    abbr: "Constant Pool Origin",
    classes: "constant"
}, {
    hex: "0000 000c ",
    abbr: "Constant Pool Size (12)",
    classes: "constant"
}, {
    hex: "0000 cafe ",
    abbr: "objref - used in INVOKEVIRTUAL",
    classes: "constant inst-14 inst-27"
}, {
    hex: "0000 0012 ",
    abbr: "Location of add(...) method (offset bytes into program text)",
    classes: "constant inst-17a"
}, {
    hex: "0000 0028 ",
    abbr: "Location of times_two(...) method (offset bytes into program text",
    classes: "constant inst-33a"
}, {
    hex: "0000 0000 ",
    abbr: "Text Origin",
    classes: "text"
}, {
    hex: "0000 0034 ",
    abbr: "Text Size",
    classes: "text"
}, {
    hex: "1070 ",
    abbr: "BIPUSH 0x70",
    classes: "text inst-11"
}, {
    hex: "59",
    abbr: "DUP",
    classes: "text inst-12"
}, {
    hex: "36 02",
    abbr: "ISTORE jack",
    classes: "text inst-13"
}, {
    hex: "13 0000 ",
    abbr: "LDC_W objref (Loading a value for INVOKEVIRTUAL)",
    classes: "text inst-14"
}, {
    hex: "1010<br>",
    abbr: "BIPUSH 0x10",
    classes: "text inst-15"
}, {
    hex: "1020 ",
    abbr: "BIPUSH 20",
    classes: "text inst-16"
}, {
    hex: "b600 01",
    abbr: "INVOKEVIRTUAL (0001 is index of constant)",
    classes: "text inst-17a"
}, {
    hex: "64 ",
    abbr: "ISUB",
    classes: "text inst-18"
}, {
    hex: "fd",
    abbr: "OUT",
    classes: "text inst-19"
}, {
    hex: "ff ",
    abbr: "HALT",
    classes: "text inst-20"
}, {
    hex: "0003 ",
    abbr: "Number of Args for add(...)",
    classes: "text inst-17a"
}, {
    hex: "0001 ",
    abbr: "Area size / Local Vars for add(...)",
    classes: "text inst-17a"
}, {
    hex: "1040 ",
    abbr: "BIPUSH 40",
    classes: "text inst-26"
}, {
    hex: "1300 00",
    abbr: "LDC_W objref (Loading a value for INVOKEVIRTUAL)",
    classes: "text inst-27"
}, {
    hex: "15 01",
    abbr: "ILOAD a",
    classes: "text inst-28"
}, {
    hex: "15 02",
    abbr: "ILOAD b",
    classes: "text inst-29"
}, {
    hex: "10 30",
    abbr: "BIPUSH 30",
    classes: "text inst-30"
}, {
    hex: "36 03",
    abbr: "ISTORE c",
    classes: "text inst-31"
}, {
    hex: "60 ",
    abbr: "IADD",
    classes: "text inst-32"
}, {
    hex: "b600 02",
    abbr: "INVOKEVIRTUAL (0002 is index of constant)",
    classes: "text inst-33a"
}, {
    hex: "ac ",
    abbr: "IRETURN",
    classes: "text inst-34"
}, {
    hex: "0002 ",
    abbr: "Number of Args for add(...)",
    classes: "text inst-33a"
}, {
    hex: "0001 ",
    abbr: "Area size / Local Vars for add(...)",
    classes: "text inst-33a"
}, {
    hex: "1501 ",
    abbr: "ILOAD x",
    classes: "text inst-40"
}, {
    hex: "59",
    abbr: "DUP",
    classes: "text inst-41"
}, {
    hex: "59 ",
    abbr: "DUP",
    classes: "text inst-42"
}, {
    hex: "3602 ",
    abbr: "ISTORE y",
    classes: "text inst-43"
}, {
    hex: "60",
    abbr: "IADD",
    classes: "text inst-44"
}, {
    hex: "ac",
    abbr: "IRETURN",
    classes: "text inst-45"
},
]