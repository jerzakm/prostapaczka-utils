setListeners();

let packageArray = [];

function setListeners() {
    let btnAddNew = document.getElementById('btn-add-new');
    btnAddNew.addEventListener("click", addNew);

    var removeBtns = document.getElementsByClassName("btn-remove");
    Array.from(removeBtns).forEach(function(element) {
        element.addEventListener('click', remove);
      });
}

function addNew() {
    let qty = document.getElementById('new-qt').value;
    let w = document.getElementById('new-w').value;
    let x = document.getElementById('new-x').value;
    let y = document.getElementById('new-y').value;
    let z = document.getElementById('new-z').value;
    let nst = document.getElementById('new-nst').checked;

    let package = {
        uuid: uuid(),
        qty: parseInt(qty, 10),
        weight: parseInt(w, 10),
        x: parseInt(x, 10),
        y: parseInt(y, 10),
        z: parseInt(z, 10),
        nst: nst
    };

    if(package.qty>0&&package.weight>0&&package.x>0&&package.y>0&&package.z>0) {
        packageArray.push(package);
        renderResult();
    }
    else {
        alert('Ilosc, waga, szerokosc, wysokosc i dlugosc muszą być większe od 0');
    }
}

function remove(){
    let uuid = this.getAttribute('uuid');
    packageArray = packageArray.filter(function( obj ) {
        return obj['uuid'] !== uuid;
    });
    renderResult();
}

function renderResult() {
    let packageContainer = document.getElementById('package-container');
    packageContainer.innerHTML = '';
    for(package of packageArray) {
        let nstString = '';
        if(package.nst) {
            nstString = 'Tak';
        }
        let entry = `
        <tr>
            <td>${package.qty}</td>
            <td>${package.weight}</td>
            <td>${package.x}</td>
            <td>${package.y}</td>
            <td>${package.z}</td>
            <td>${nstString}</td>
            <td><button type="button" class="btn btn-danger btn-sm btn-remove" uuid="${package.uuid}">x</button></td>
          </tr>
        `;
        packageContainer.innerHTML+=entry;
    }

    let result = document.getElementById('result-container');
    result.innerHTML = ppStringCalc();
    setListeners();
}

function ppStringCalc() {
    let ppString = '';
    for (package of packageArray) {
        let nst = '';
        if(package.nst) {
            nst='N';
        }

        ppString+=`${package.qty}×${package.weight}:${package.x}x${package.y}x${package.z}:${nst};`;
    }
    return ppString;
}

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }