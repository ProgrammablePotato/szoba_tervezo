const Side1in = document.getElementById("Side1")
const Side2in = document.getElementById("Side2")
const Heightin = document.getElementById("Height")
const CalcButton = document.getElementById("accept_button")
const DoorButton = document.getElementById("dooradd")
const WindowButton = document.getElementById("windowadd")
const RoomDrawing = document.getElementById("room-drawing")

var floor_area = 0
var wall_area = 0
var doors = 0
var windows = 0

CalcButton.addEventListener("click", () => {
    Calc();
})

DoorButton.addEventListener("click", () => {
    AddOpening(1)
})

WindowButton.addEventListener("click", () => {
    AddOpening(2)
})

function AutoResizeF() {
    let side1 = Number(Side1in.value)
    let side2 = Number(Side2in.value)
    SizeRoom(side1,side2)
}

function Calc() {
    
    var openings = doors+windows
    var openingarea = 0

    var side1 = Number(Side1in.value)
    var side2 = Number(Side2in.value)
    var height = Number(Heightin.value)
    SizeRoom(side1,side2)

    if (openings > 0) {
        for (let i = 1; i <= doors; i++) {
            var ThisInput = document.getElementById("door_height_"+String(i))
            var thisheight = Number(ThisInput.value)
            if (thisheight > height) {
                document.getElementById("wrong_input").style.display = "inline-block"
                document.getElementById("wrong_input").innerHTML = `Ajtó ${i} túl magas`
                return 0
            }
            ThisInput = document.getElementById("door_width_"+String(i))
            var thiswidth = Number(ThisInput.value)
            if (thiswidth > side1 && thiswidth > side2) {
                document.getElementById("wrong_input").style.display = "inline-block"
                document.getElementById("wrong_input").innerHTML = `Ajtó ${i} túl széles`
                return 0
            }
            openingarea += (thiswidth*thisheight)
        }
        for (let i = 1; i <= windows; i++) {
            var ThisInput = document.getElementById("window_height_"+String(i))
            var thisheight = Number(ThisInput.value)
            if (thisheight > height) {
                document.getElementById("wrong_input").style.display = "inline-block"
                document.getElementById("wrong_input").innerHTML = `Ablak ${i} túl magas`
                return 0
            }
            ThisInput = document.getElementById("window_height_"+String(i))
            var thiswidth = Number(ThisInput.value)
            if (thisheight > height) {
                document.getElementById("wrong_input").style.display = "inline-block"
                document.getElementById("wrong_input").innerHTML = `Ablak ${i} túl magas`
                return 0
            }
            openingarea += (thiswidth*thisheight)
        }
    }

    if (openingarea > wall_area) {
        document.getElementById("wrong_input").style.display = "inline-block"
        document.getElementById("wrong_input").innerHTML = "Nyílászárók területe túl nagy!"
        return 0;
    }
    
    floor_area = side1*side2
    wall_area = 2*(side1*height)+2*(side2*height)+floor_area-openingarea
    document.getElementById("floor_area").style.display = "inline-block"
    document.getElementById("floor_area").innerHTML = "A padló területe "+String(floor_area)+" m<sup>2</sup>"
    document.getElementById("wall_area").style.display = "inline-block"
    document.getElementById("wall_area").innerHTML = "A fal felülete "+String(wall_area)+" m<sup>2</sup>"
    document.getElementById("wrong_input").style.display = "none"
}

function AddOpening(type) {
    if (type == 1) {
        var name = "Ajtó"
        var name2 = "door"
        doors += 1
        var count = doors
    }
    else if (type == 2) {
        var name = "Ablak"
        var name2 = "window"
        windows += 1
        var count = windows
    }

    var NewOpening = 
    `
    <li>
        <div class="door-window">
            <label for="" class="labels opening_label">${name} ${count}:</label>
            <div class="input-field">
                <label for="" class="labels">Magasság:</label>
                <input type="number" class="inputs" id="${name2}_height_${count}" required>
            </div>
            <div class="input-field">
                <label for="" class="labels">Szélesség:</label>
                <input type="number" class="inputs" id="${name2}_width_${count}" required>
            </div>
        </div>
    </li>
    `
    document.getElementById("openings").innerHTML += NewOpening
}

function SizeRoom(side1,side2) {
    var ratio = (Math.min(side1,side2)/Math.max(side1,side2))
    var boxwidth = document.getElementById("room-drawing").clientWidth
    var boxheight = document.getElementById("room-drawing").clientHeight
    var topmargin = (boxheight/2)-10-((boxwidth*ratio*0.8)/2)
    if (topmargin < 0) {
        topmargin = 0
    }
    document.getElementById("room").style.height = String(boxwidth*ratio*0.8)+"px"
    document.getElementById("room").style.width = String(boxwidth*0.8)+"px"
    document.getElementById("room").style.marginTop = String(topmargin)+"px"
}

function DeleteOpening(type,num) {
    
}