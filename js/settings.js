//Maps with ids of HTML elements
const selectListID = [
    "selectLeft",
    "selectRight",
    "selectDown",
    "selectInstantDrop", 
    "selectRotateClockwise",
    "selectRotateCounterclockwise",
    "selectHoldPiece",
]

const currentSettingsId = [
    "leftCurrent",
    "rightCurrent",
    "downCurrent",
    "instantDropCurrent",
    "rotateClockwiseCurrent",
    "rotateCounterclockwiseCurrent",
    "holdPieceCurrent",
    "volumeCurrent"
]

//Maps to convert names of keys and the string representation and vice-versa
const controlMap = new Map(
    [
        ["a", "KeyA"],
        ["b", "KeyB"],
        ["c", "KeyC"],
        ["d", "KeyD"],
        ["e", "KeyE"],
        ["f", "KeyF"],
        ["g", "KeyG"],
        ["h", "KeyH"],
        ["i", "KeyI"],
        ["j", "KeyJ"],
        ["k", "KeyK"],
        ["l", "KeyL"],
        ["m", "KeyM"],
        ["n", "KeyN"],
        ["o", "KeyO"],
        ["p", "KeyP"],
        ["q", "KeyQ"],
        ["r", "KeyR"],
        ["s", "KeyS"],
        ["t", "KeyT"],
        ["u", "KeyU"],
        ["v", "KeyV"],
        ["w", "KeyW"],
        ["x", "KeyX"],
        ["y", "KeyY"],
        ["z", "KeyZ"],
        ["left", "ArrowLeft"],
        ["right", "ArrowRight"],
        ["up", "ArrowUp"],
        ["down", "ArrowDown"],
        ["space", "Space"],
    ]
);

const reverseControlMap = new Map(
    [
        ["KeyA", "A"],
        ["KeyB", "B"],
        ["KeyC", "C"],
        ["KeyD", "D"],
        ["KeyE", "E"],
        ["KeyF", "F"],
        ["KeyG", "G"],
        ["KeyH", "H"],
        ["KeyI", "I"],
        ["KeyJ", "J"],
        ["KeyK", "K"],
        ["KeyL", "L"],
        ["KeyM", "M"],
        ["KeyN", "N"],
        ["KeyO", "O"],
        ["KeyP", "P"],
        ["KeyQ", "Q"],
        ["KeyR", "R"],
        ["KeyS", "S"],
        ["KeyT", "T"],
        ["KeyU", "U"],
        ["KeyV", "V"],
        ["KeyW", "W"],
        ["KeyX", "X"],
        ["KeyY", "Y"],
        ["KeyZ", "Z"],
        ["ArrowLeft", "LEFT"],
        ["ArrowRight", "RIGHT"],
        ["ArrowUp", "UP"],
        ["ArrowDown", "DOWN"],
        ["Space", "SPACE"],
    ]
);


const keys = ["left", "right", "down", "instantDrop", "rotateRight", "rotateLeft", "hold", "volume"];

const selectList = selectListID.map(id => document.getElementById(id));

const currentSettingsList = currentSettingsId.map(id => document.getElementById(id));

const volumeSelector = document.getElementById("volumeControl");

const backButton = document.getElementById("back");

const saveButton = document.getElementById("saveChanges");

var currentControls = retrieveControls();


window.onload = initialize;

/**
 * Initializes the settings page
 */
function initialize()
{
    let otherKeys = ["left", "right", "up", "down", "space"];
    for(let i = 0; i < selectList.length; i++){
        for(let j = 0; j < 26; j++){
            let curr = (String.fromCharCode(97 + j));
            let op = document.createElement("option");
            op.innerText = curr.toUpperCase();
            op.id = curr;
            selectList[i].appendChild(op);
        }
        for(let j = 0; j < otherKeys.length; j++){
            let curr = otherKeys[j];
            let op = document.createElement("option");
            op.innerText = curr.toUpperCase();
            op.id = curr;
            selectList[i].appendChild(op);
        }
    }

    displayControls();

    backButton.onclick = back;

    saveButton.onclick = save;
}
/**
 * Updates the current controls object
 * @param {Array<String>} controlsList the list of new control bindings
 */
function changeControls(controlsList)
{
    for(let i = 0; i < controlsList.length; i++){
        currentControls[keys[i]] = controlsList[i];
    }
    updateControls(currentControls);
}

/**
 * Displays the current settings
 */
function displayControls()
{   
    for(let i = 0; i < currentSettingsList.length; i++){
        let str = currentControls[keys[i]];
        if(i < currentSettingsList.length - 1){
            currentSettingsList[i].innerText = reverseControlMap.get(str);
            selectList[i].selectedIndex = controlMap.get(str);
            selectList[i].value = reverseControlMap.get(str);
        }
        else{
            currentSettingsList[i].innerText = str + "%";
            volumeSelector.value = str;
        } 
    }
}

/**
 * Saves the selected controls
 */
function save()
{   
    let duplicates = new Set();
    let controls = [];
    let valid = true;
    for(let i = 0; i < selectList.length; i++){
        let curr = selectList[i].options[selectList[i].selectedIndex].text.toLowerCase();
        if(duplicates.has(curr)) valid = false;
        duplicates.add(curr);
        controls.push(controlMap.get(curr));
    }
    controls.push(volumeSelector.value);

    if(valid){
        changeControls(controls);
        displayControls();
        alert("Saved");
    }
    else{
        alert("Controls must be different buttons!");
    }

}

/**
 * Returns to the main page
 */
function back()
{
    window.location.href = "index.html";
}

