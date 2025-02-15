document.addEventListener("DOMContentLoaded", function () {
    const trainingTable = document.getElementById("trainingTable");
    const updateBtn = document.getElementById("updateBtn");
    const screenshotBtn = document.getElementById("screenshotBtn");

    function updateTable() {
        const trainingMode = document.getElementById("trainingMode").value;
        const trainingFrequency = document.getElementById("trainingFrequency").value;
        const exercisesPerDay = document.getElementById("exercisesPerDay").value;

        trainingTable.innerHTML = ""; 

        if (trainingMode === "4weeks") {
            for (let week = 1; week <= 4; week++) {
                for (let day = 1; day <= trainingFrequency; day++) {
                    let row = `
                        <tr>
                            <td>Неделя ${week}, День ${day}</td>
                            <td><input type="text" placeholder="Введите упражнение"></td>
                            <td><input type="text" placeholder="Пример: 3x8"></td>
                            <td><input type="number" placeholder="Вес"></td>
                            <td><input type="number" disabled placeholder="Сумма"></td>
                        </tr>`;
                    trainingTable.innerHTML += row;
                }
            }
        } else {
            for (let day = 1; day <= 3; day++) {
                for (let exercise = 1; exercise <= exercisesPerDay; exercise++) {
                    let row = `
                        <tr>
                            <td>День ${day}</td>
                            <td><input type="text" placeholder="Введите упражнение"></td>
                            <td><input type="text" placeholder="Пример: 3x8"></td>
                            <td><input type="number" placeholder="Вес"></td>
                            <td><input type="number" disabled placeholder="Сумма"></td>
                        </tr>`;
                    trainingTable.innerHTML += row;
                }
            }
        }
    }

    function calculateReps(event) {
        if (event.target.type === "text") {
            let inputText = event.target.value;
            let reps = 0;
            let matches = inputText.match(/\d+x\d+/g);

            if (matches) {
                reps = matches.reduce((sum, match) => {
                    let [sets, reps] = match.split("x").map(Number);
                    return sum + sets * reps;
                }, 0);
            }

            let row = event.target.closest("tr");
            let totalRepsInput = row.querySelector("td:nth-child(5) input");
            totalRepsInput.value = reps;
        }
    }

    function captureScreenshot() {
        const tableContainer = document.getElementById("table-container");

        html2canvas(tableContainer).then(canvas => {
            let link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "тренировочный_план.png";
            link.click();
        });
    }

    updateBtn.addEventListener("click", updateTable);
    trainingTable.addEventListener("input", calculateReps);
    screenshotBtn.addEventListener("click", captureScreenshot);

    updateTable();
});