const mainBox = document.getElementById("main-box");
const description = document.getElementById("description");
const otherBoxes = document.querySelectorAll("#container .box");

const colors =  { "#60B5FF" : "Blue" , "#7C4585" : "Puple" , "#90C67C" : "Green" , "#F7374F" : "Red" }

otherBoxes.forEach((box) => {
    box.style.backgroundColor = box.dataset.color;
    box.addEventListener("click" , () => {
        mainBox.style.backgroundColor = box.style.backgroundColor;
        highLightSelect(box);
        description.innerHTML = `The color is ${colors[box.dataset.color]} : ${box.dataset.color}`;
    });
})

const highLightSelect = function (box) {
    otherBoxes.forEach((box) => {
        box.classList.remove("chosen");

    });
    box.classList.add("chosen");
    
    

}