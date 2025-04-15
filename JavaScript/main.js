document.addEventListener("DOMContentLoaded", function() {
    createTable(buildings, 'list');

    let searchButton = document.getElementById("filterButton");
    searchButton.addEventListener("click", function() {filterTable(buildings, 'list', searchButton.form)})

    let sortForm = document.getElementById('sort');
    setSortSelects(buildings, sortForm);

    // При изменении первого поля сортировки обновляет второе
    let selects = sortForm.getElementsByTagName('select');
    selects[0].addEventListener("change", function(){changeNextSelect(selects[1].id, selects[0])});
})


//option для селекта
let createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

//Заполняет select вариантами сортировки
let setSortSelect = (arr, sortSelect) => {
    sortSelect.append(createOption('Нет', 0));
    for (let i in arr) {
        sortSelect.append(createOption(arr[i], Number(i) + 1));
    }
}

// Заполняет все select в форме сортировки
let setSortSelects = (data, dataForm) => {
    let head = Object.keys(data[0]); 
    let allSelect = dataForm.getElementsByTagName('select');

    for(let j = 0; j < allSelect.length; j++) {
        //формируем очередной slect
        setSortSelect(head, allSelect[j]);

        if (j>0) allSelect[j].disabled = true; //откл второй селект
    }
}

// настраиваем поле для следующего уровня сортировки
let changeNextSelect = (nextSelectId, curSelect) => {
    
    let nextSelect = document.getElementById(nextSelectId);
    
    nextSelect.disabled = false;
    
    // в следующем SELECT выводим те же option, что и в текущем
    nextSelect.innerHTML = curSelect.innerHTML;
    
    // удаляем в следующем SELECT уже выбранную в текущем опцию
    // если это не первая опция - отсутствие сортировки
    if (curSelect.value != 0) {
       nextSelect.remove(curSelect.value);
    } else {
        nextSelect.disabled = true;
    }
}