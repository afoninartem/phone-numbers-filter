const fullList = [];
const exceptList = [];
let resultList = [];

document.getElementById('full-list').onchange = function () {
  let file = this.files[0];
  let reader = new FileReader();
  reader.onload = function (progressEvent) {
    let nums = this.result.split('\n');
    let uniqNums = [...new Set(nums)];
    console.log(`uniqNums.length = ${uniqNums.length}`);
    for (let i = 0; i < uniqNums.length; i += 1) {
      let phoneNumber = uniqNums[i];
      if (phoneNumber !== '') fullList.push(phoneNumber);
    }
    document.querySelector('.full-list-length').innerHTML += `Загружено ${fullList.length} номеров`;
  }
  reader.readAsText(file);
}

document.getElementById('exception-list').onchange = function () {
  let file = this.files[0];
  let reader = new FileReader();
  reader.onload = function (progressEvent) {
    let nums = this.result.split('\n');
    let uniqNums = [...new Set(nums)];
    for (let i = 0; i < uniqNums.length; i += 1) {
      let phoneNumber = uniqNums[i];
      if (phoneNumber !== '') exceptList.push(phoneNumber);
    }
    document.querySelector('.exception-list-length').innerHTML += `Загружено ${exceptList.length} номеров`;
  }
  reader.readAsText(file);
}


document.getElementById('result').onclick = function () {
  for (let i = 0; i < fullList.length; i += 1) {
    let phone = fullList[i];
    if (!exceptList.includes(phone)) resultList.push(phone);
  }
  resultList = [...new Set(resultList)];
  // alert(`Сформирован список из ${resultList.length} номеров`)
  var csv = 'Phone number\n';
  resultList.forEach(function(phone) {
          csv += phone;
          csv += "\n";
  });

  console.log(csv);
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'phones.csv';
  hiddenElement.click();
}


