let createSortArr = (data) => {
    let sortArr = [];
    let sortSelects = data.getElementsByTagName('select');

    for (let i = 0; i < sortSelects.length; i++) {
        let keySort = sortSelects[i].value;
        if (keySort == 0) {
            break;
        }
        let desc = document.getElementById(sortSelects[i].id + 'Desc').checked;
        sortArr.push(
            {column: keySort - 1,
                order: desc} // t по убыванию f по возрастанию
        );
    }
    return sortArr;
};

// Сортирует таблу
function sortTable(idTable, data) {
    let sortArr = createSortArr(data);
    if (sortArr.length === 0) return;

    let table = document.getElementById(idTable);
    let rowData = Array.from(table.rows);
    let header = rowData.shift();

    rowData.sort((first, second) => {
        for(let i in sortArr) {
            let key = sortArr[i].column;
            
            // Преобразуем содержимое ячеек в числа, если это возможно
            let aText = first.cells[key].innerHTML;
            let bText = second.cells[key].innerHTML;
            let a = parseFloat(aText) || aText.toLowerCase();
            let b = parseFloat(bText) || bText.toLowerCase();

            // Если оба значения - числа, сравниваем как числа
            if (typeof a === 'number' && typeof b === 'number') {
                if (a > b) return sortArr[i].order ? -1 : 1;
                if (a < b) return sortArr[i].order ? 1 : -1;
            } 
            // Иначе сравниваем как строки
            else {
                if (a > b) return sortArr[i].order ? -1 : 1;
                if (a < b) return sortArr[i].order ? 1 : -1;
            }
        }
        return 0;
    });

    clearTable(idTable);
    rowData.unshift(header);
    rowData.forEach(row => table.append(row));
}

//сброс сорта
function clearSort(dataForm) {
    let selects = dataForm.getElementsByTagName('select');

    for (let i = 0; i < selects.length; i++) {
        selects[i].selectedIndex = 0;

        let checkBox = document.getElementById(selects[i].id+'Desc');
        checkBox.checked = false;

        if (i > 0) selects[i].disabled = true;
    }
    //возвращает таблицу
    clearTable('list');
    createTable(buildings, 'list');
    filterTable(buildings, 'list', document.getElementById('filter'));
}