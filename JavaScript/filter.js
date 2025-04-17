// устанавливаем соответствие между полями формы и столбцами таблицы
let correspond = {
    "Название": "structure",
    "Тип": "category",
    "Страна": "country",
    "Город": "city",
    "Год": ["yearFrom", "yearTo"],
    "Высота": ["heightFrom", "heightTo"]
}

let dataFilter = (dataForm) => {

    let dictFilter = {};

    for(let j = 0; j < dataForm.elements.length; j++) {

        let item = dataForm.elements[j];

        let valInput = item.value;

        if (item.type == "text") {
            valInput = valInput.toLowerCase().trim();
        } else if (item.type == "number") {
            valInput = Number(valInput);
        }

        if (valInput == '') {
            if (item.id.indexOf("From") != -1){
                valInput = -Infinity;
            } else if (item.id.indexOf("To") != -1){
                valInput = Infinity;
            }
        }
        dictFilter[item.id] = valInput;
    }
    return dictFilter;
}

// фильтр таблицы
let filterTable = (data, idTable, dataForm) =>{

    let datafilter = dataFilter(dataForm);

    let tableFilter = data.filter(item => {

        let result = true;

        for(let key in item) {

            let val = item[key];

            if (typeof val == 'string') {
                val = item[key].toLowerCase()
                result &&= val.indexOf(datafilter[correspond[key]]) !== -1
            } else if (typeof val == 'number'){
                let fr = datafilter[correspond[key][0]];
                let till = datafilter[correspond[key][1]];

                result &&= val >= fr && val <= till;
            }
        }
        return result;
    });
    clearTable(idTable);
    createTable(tableFilter, idTable);
}

//очистка фильтров
function clearFilter(dataForm) {
    for(let j = 0; j < dataForm.elements.length; j++) {
        let item = dataForm.elements[j];
        if (item.type == "button") continue;
        item.value = "";
    }
    clearSort(document.getElementById('sort'));
}