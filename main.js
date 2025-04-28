// Wait until all DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {

    // Sets up the click behavior for base selection buttons
    function setupBaseSelector(sectionId) {
        const buttons = document.querySelectorAll(`#${sectionId} .base-btn`);
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                buttons.forEach(b => b.classList.remove("selected")); // Unselect all
                btn.classList.add("selected"); // Select the clicked button
            });
        });
    }

    // Gets the base value (2, 8, 10, 16) from the selected button in a section
    function getSelectedBase(sectionId) {
        const selected = document.querySelector(`#${sectionId} .selected`);
        return selected ? parseInt(selected.getAttribute("data-base")) : null;
    }

    // Converts the input number string from one base to another
    function convertNumber(inputStr, fromBase, toBase) {
        const decimal = parseInt(inputStr, fromBase); // First, convert to decimal
        if (isNaN(decimal)) return null; // Handle invalid input
        return decimal.toString(toBase).toUpperCase(); // Then convert to desired base
    }

    // Returns a base-specific symbol for pretty formatting
    function formatBase(base) {
        return {
            2: "₂",
            8: "₈",
            10: "₁₀",
            16: "₁₆"
        }[base] || "";
    }

    // Initialize base button behavior for both sections
    setupBaseSelector("from");
    setupBaseSelector("to");

    // Get important DOM elements
    const convertBtn = document.getElementById("convert");
    const input = document.getElementById("number");
    const resultP = document.getElementById("result");

    // Handle the convert button click
    convertBtn.addEventListener("click", () => {
        const inputValue = input.value.trim(); // Get and clean input value
        const fromBase = getSelectedBase("from"); // Get selected FROM base
        const toBase = getSelectedBase("to"); // Get selected TO base

        input.value = ""; // Always clear input field

        if (!inputValue || !fromBase || !toBase) {
            alert("Please fill all fields and select both bases."); // Validate input
            return;
        }

        const result = convertNumber(inputValue, fromBase, toBase); // Do the conversion
        if (result === null) {
            alert("Invalid number for the selected base."); // Error for invalid input
            return;
        }

        // Display the result nicely formatted
        const resultText = `<b>Result:</b> ${inputValue}${formatBase(fromBase)} = ${result}${formatBase(toBase)}`;
        resultP.innerHTML = resultText;
    });
});
