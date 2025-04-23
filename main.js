document.addEventListener("DOMContentLoaded", () => {
    function setupBaseSelector(sectionId) {
        const buttons = document.querySelectorAll(`#${sectionId} .base-btn`);
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                buttons.forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
            });
        });
    }

    function getSelectedBase(sectionId) {
        const selected = document.querySelector(`#${sectionId} .selected`);
        return selected ? parseInt(selected.getAttribute("data-base")) : null;
    }

    function convertNumber(inputStr, fromBase, toBase) {
        const decimal = parseInt(inputStr, fromBase);
        if (isNaN(decimal)) return null;
        return decimal.toString(toBase).toUpperCase();
    }

    function formatBase(base) {
        return {
            2: "₂",
            8: "₈",
            10: "₁₀",
            16: "₁₆"
        }[base] || "";
    }

    setupBaseSelector("from");
    setupBaseSelector("to");

    const convertBtn = document.getElementById("convert");
    const input = document.getElementById("number");
    const resultP = document.getElementById("result");

    convertBtn.addEventListener("click", () => {
        const inputValue = input.value.trim();
        const fromBase = getSelectedBase("from");
        const toBase = getSelectedBase("to");

        input.value = ""; // Clear input always

        if (!inputValue || !fromBase || !toBase) {
            alert("Please fill all fields and select both bases.");
            return;
        }

        const result = convertNumber(inputValue, fromBase, toBase);
        if (result === null) {
            alert("Invalid number for the selected base.");
            return;
        }

        const resultText = `<b>Result:</b> ${inputValue}${formatBase(fromBase)} = ${result}${formatBase(toBase)}`;
        resultP.innerHTML = resultText;
    });
});

