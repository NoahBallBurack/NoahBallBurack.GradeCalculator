function calculateCurrentGrade() {
    var grade=0;
    var totalWeight=calculateTotalWeight();
    var r=true;
    var q=false;
    for(var i=0;i<rowCount;i++){
        var identification="first"+i;
        var element=document.getElementById(identification).value;
        var array=convertArrayStringToNumber(element);
        for(var n=0;n<array.length;n++) {
            if (array[n] > 100) {
                r = confirm("You entered a score over 100 in one of your categories. If this was intentional, press 'OK' to continue.");
            }
            if(array[n]<0){
                q=true;
            }
        }
        var average=averageArray(array);
        var weight=document.getElementById("2-"+i).value;
        var total=average*weight/totalWeight/100;
        grade+=total;
    }
    var roundedGrade=(Math.round(grade*100))/100;
    if(r==true) {
        document.getElementById("currentGrade").innerHTML = roundedGrade + "%";
    }else{
        document.getElementById("currentGrade").innerHTML = "";
    }
    var error=isNaN(grade);
    if(error==true||q==true){
        document.getElementById("currentGrade").innerHTML = "Data must only include positive numbers separated by commas. All fields must include a value.";
    }
    return grade;
}

var rowCount=1;

function addRow() {
    if(rowCount!=7) {
        var table = document.getElementById("primary");
        var category = document.getElementById("category").value;
        var tableRow1 = document.createElement("tr");
        var tableData1 = document.createElement("td");
        var tableData2 = document.createElement("td");
        tableData1.setAttribute("class", "tableStuff");
        tableData2.setAttribute("class", "tableStuff");
        tableData1.innerHTML = category + " Scores";
        tableData2.innerHTML = category + " Weight";
        table.appendChild(tableRow1);
        tableRow1.appendChild(tableData1);
        tableRow1.appendChild(tableData2);
        var tableRow2 = document.createElement("tr");
        var tableData3 = document.createElement("td");
        var tableData4 = document.createElement("td");
        var scores = document.createElement("input");
        var weight = document.createElement("input");
        var scoresRow="first" + rowCount;
        var text="determineColor('"+scoresRow+"')";
        scores.setAttribute("type", "text");
        scores.setAttribute("onchange", text);
        scores.setAttribute("id", scoresRow);
        scores.setAttribute("class", "textBox");
        weight.setAttribute("type", "text");
        weight.setAttribute("id", "2-" + rowCount);
        weight.setAttribute("class", "textBox");
        table.appendChild(tableRow2);
        tableRow2.appendChild(tableData3);
        tableRow2.appendChild(tableData4);
        tableData3.appendChild(scores);
        tableData4.appendChild(weight);
        tableData3.setAttribute("class", "tableStuff");
        tableData4.setAttribute("class", "tableStuff");
        rowCount += 1;
    }
}

function convertArrayStringToNumber(string) {
    var array = string.split(",");
    for(i=0; i<array.length; i++){
        array[i]= parseInt(array[i]);
    }
    return array;
}

function calculateSum(array){
    var sum=0;
    for(i=0;i<array.length;i++){
        sum+=array[i];
    }
    return sum;
}

function averageArray(array) {
    var sum=calculateSum(array);
    var average=sum/array.length;
    return average;
}

function calculateTotalWeight(){
    var totalWeight=0;
    for(var j=0;j<rowCount;j++){
        var weight=document.getElementById("2-"+j).value/100;
        totalWeight+=weight;
    }
    return totalWeight;
}

function calculateGradeNeeded(){
    var currentGrade=calculateCurrentGrade();
    var finalWeight=document.getElementById("finalWeight").value;
    var gradeDesired=document.getElementById("gradeDesired").value;
    var gradeNeeded=(gradeDesired-(currentGrade*(1-(finalWeight/100))))/finalWeight*100;
    var nonFinalWeight=calculateTotalWeight();
    var totalWeight=Math.round((nonFinalWeight+(finalWeight/100))*1000)/1000;
    var roundedGradeNeeded=Math.round(gradeNeeded*100)/100;
    if(totalWeight!=1){
        document.getElementById("gradeNeeded").innerHTML="Weights do not add up to 100%!";
    }else{
        document.getElementById("gradeNeeded").innerHTML=roundedGradeNeeded+"%";
    }
    var error=isNaN(gradeNeeded);
    if(error==true){
        document.getElementById("gradeNeeded").innerHTML = "Data must only include positive numbers separated by commas. All fields must include a value.";
    }
}

function determineColor(identifier){
    var element=document.getElementById(identifier);
    var string=element.value;
    var array=convertArrayStringToNumber(string);
    var average=averageArray(array);
    if(identifier!="gradeDesired") {
        var number = identifier[identifier.length - 1];
        var integer = parseInt(number);
        var secondElement = document.getElementById("2-" + integer);
    }else{
        var secondElement = document.getElementById("finalWeight");
    }
    var constants=[0, "lightcoral", 70, "yellow", 80, "plum", 90, "greenyellow"];
    for(var i=0;i<constants.length;i+=2){
        if(average>=constants[i]){
            element.setAttribute("style","background:"+constants[i+1]);
            secondElement.setAttribute("style","background:"+constants[i+1]);
        }
    }
}