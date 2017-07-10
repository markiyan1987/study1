window.onload = function () {
    var ul = document.querySelector('#menu ul');
    var active = document.querySelector('#menu ul li.active');
    ul.onclick = function (event) {
        var target = event.target;
        if(target.tagName!=='LI') return;
        active = document.querySelector('#menu ul li.active');
        active.classList.remove('active');
        target.classList.add('active');

        LoadData(target);
    }

    LoadData(active);


};
function LoadData(li) {
    var path = null;
    if(li.innerHTML == 'View') path = '/data';
    else path = '/form';

    var xhr = new XMLHttpRequest();  //створення обєкту для запиту на сервер
    xhr.open('GET', path,true);  // налаштування параметрів
    xhr.send();  //відправка запиту
    xhr.onreadystatechange = function () {
        if(xhr.readyState !== 4) return;
        if(xhr.status == 200){
            if (li.innerHTML == 'View') {
                if (document.getElementById("form") != null) document.getElementById("form").remove();
                parseFile(xhr.responseText, content)
                return;
            }
            content.innerHTML = xhr.responseText;   // отримання відповіді з сервера
        }
    }
}


function parseFile(data, container){   // зробити функцію конвертації з json в таблицю
    var mas = JSON.parse(data);
    //console.log(document.getElementById("table"));
    //console.log(this);



    if (document.getElementById("table") != null) {
        document.getElementById("table").remove();
    }



    var table = document.createElement("table");
    table.id = "table";
    content.appendChild(table);

    for (var i = -1; i < mas.length; i++) {
        var tr = document.createElement("tr");
        table.appendChild(tr);

        if (i == -1) {
            for (var key in mas[0]) {
                var th = document.createElement("th");
                th.innerHTML = key;
                tr.appendChild(th);
            }            
        }
        else {
            for (var key in mas[i]) {
                var td = document.createElement("td");
                td.innerHTML = mas[i][key];
                tr.appendChild(td);
            }
           
            var button = document.createElement("button");
            button.innerHTML = "delete data";
            button.setAttribute("onclick", "deleteData()");
            tr.appendChild(button);
            
        }
    }
}

function sData() {
    var xhr = new XMLHttpRequest();
    var body = 'first='+encodeURIComponent(first.value)+'&lasr='+encodeURIComponent(last.value)+'&age='+encodeURIComponent(age.value)+'&salary='+encodeURIComponent(salary.value);
    xhr.open('POST','/senddata',true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(body);

    xhr.onreadystatechange = function () {
        if(xhr.readyState !== 4) return;
        if(xhr.status == 200) {
            alert(xhr.responseText);
        }
    }

}

function deleteData() {
    var target = event.target;
    

    var rowIndex = -1;
    var rows = document.getElementById("table").rows;
    for (var i = 0; i < rows.length; i++) {
        if (rows[i] == target.parentNode) {
            rowIndex = i;
            break;
        }
    }
    console.log(target.parentNode);
    console.log(rowIndex);

    var xhr = new XMLHttpRequest();
    var body = 'value=' + encodeURIComponent(rowIndex - 1);
    xhr.open('POST', '/deletedata', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status == 200) {
            alert(xhr.responseText);
            window.location.reload(true);
        }

    }
}