
//вывод таблицы на страницу
let createTable = (data, idTable) => {

    let table = document.getElementById(idTable);
    
    let tr = document.createElement('tr');

    for(key in data[0]) {
        let th = document.createElement('th');
        th.innerHTML = key;
        tr.append(th);
    }
    table.append(tr);

    data.forEach((item, ind) => {
        let tr = document.createElement('tr');
        for (let key in item) {
            let th = document.createElement('td');
            th.innerHTML = item[key];
            tr.append(th);
        }
        table.append(tr);
    });
}

//очистка таблицы
let clearTable = (idTable) => {
    let table = document.getElementById(idTable);
    table.innerHTML = "";
}