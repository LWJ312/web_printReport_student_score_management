/**
 * Created by lwj_312 on 17-7-25.
 */
function InfoCheckAndInput(information) {
    let student=[];
    if (information.studyNumber.value.charAt(0) != 'U' || parseFloat(information.mathGrade.value).toString() != information.mathGrade.value || parseFloat(information.chineseGrade.value).toString() != information.chineseGrade.value || parseFloat(information.englishGrade.value).toString() != information.englishGrade.value || parseFloat(information.programGrade.value).toString() != information.programGrade.value) {
        alert("请按正确的格式输入（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...）：");
        return false;
    }
    else {
        let average=calculatePer(information).average;
        let total=calculatePer(information).total;
        student.push(JSON.stringify({Name:information.Name.value,
            studyNumber:information.studyNumber.value,
            nation:information.nation.value,
            klass:information.klass.value,
            mathGrade:information.mathGrade.value,
            chineseGrade:information.chineseGrade.value,
            englishGrade:information.englishGrade.value,
            programGrade:information.programGrade.value,
            average:average,
            total:total
        }));
        localStorage.setItem(information.studyNumber.value,student);
        alert("录入成功!");
    }

}

function loadAllGrades(thisTable) {
    if(localStorage) {
        for (let key in localStorage){
            let x=thisTable.insertRow(0);
            x.insertCell(0).innerHTML = JSON.parse(localStorage.getItem(key)).Name;
            x.insertCell(1).innerHTML = JSON.parse(localStorage.getItem(key)).studyNumber;
            x.insertCell(2).innerHTML = JSON.parse(localStorage.getItem(key)).nation;
            x.insertCell(3).innerHTML = JSON.parse(localStorage.getItem(key)).klass;
            x.insertCell(4).innerHTML = JSON.parse(localStorage.getItem(key)).mathGrade;
            x.insertCell(5).innerHTML = JSON.parse(localStorage.getItem(key)).chineseGrade;
            x.insertCell(6).innerHTML = JSON.parse(localStorage.getItem(key)).englishGrade;
            x.insertCell(7).innerHTML = JSON.parse(localStorage.getItem(key)).programGrade;
            x.insertCell(8).innerHTML = JSON.parse(localStorage.getItem(key)).average;
            x.insertCell(9).innerHTML = JSON.parse(localStorage.getItem(key)).total;
        }
    }
}

function StudyNumberCheckAndOutput(studyNumberString,thisTable) {
    let studyNumbers=studyNumberString.split(",");
    let check=0;
    let yes=[];
    for(let sn of studyNumbers){
        for(let key in localStorage){
            if(sn==key) { check=1; yes.push(JSON.parse(localStorage.getItem(sn)).total);}
        }
        if(check==1){
            let x=thisTable.insertRow(0);
            x.insertCell(0).innerHTML = JSON.parse(localStorage.getItem(sn)).Name;
            x.insertCell(1).innerHTML = JSON.parse(localStorage.getItem(sn)).studyNumber;
            x.insertCell(2).innerHTML = JSON.parse(localStorage.getItem(sn)).nation;
            x.insertCell(3).innerHTML = JSON.parse(localStorage.getItem(sn)).klass;
            x.insertCell(4).innerHTML = JSON.parse(localStorage.getItem(sn)).mathGrade;
            x.insertCell(5).innerHTML = JSON.parse(localStorage.getItem(sn)).chineseGrade;
            x.insertCell(6).innerHTML = JSON.parse(localStorage.getItem(sn)).englishGrade;
            x.insertCell(7).innerHTML = JSON.parse(localStorage.getItem(sn)).programGrade;
            x.insertCell(8).innerHTML = JSON.parse(localStorage.getItem(sn)).average;
            x.insertCell(9).innerHTML = JSON.parse(localStorage.getItem(sn)).total;
            let y=document.createElement("td");
            y.innerHTML=`<input type="button" class="btn btn-primary" data-toggle="modal" data-target="#beforeCorrect" value="修改" onclick="presentOriginInfo('${sn}')">`;
            x.appendChild(y);
            let z=document.createElement("td");
            z.innerHTML=`<input type='button' class="btn btn-danger" value="删除" onclick="deleteInfo('${sn}')">`;
            x.appendChild(z);

        }
        else alert("输入了还没录入的学号或者格式有误!");
        check=0;
    }
     if(yes.length>0) {
         document.getElementById("ave").innerHTML = classCondition(yes).allAverage;
         document.getElementById("mid").innerHTML = classCondition(yes).mid;
     }
}

function presentOriginInfo(SN) {

    document.getElementById('changeForm').name=SN;
    document.getElementById('correctName').value=JSON.parse(localStorage.getItem(SN)).Name;
    document.getElementById('correctStudyNumber').value=JSON.parse(localStorage.getItem(SN)).studyNumber;
    document.getElementById('correctNation').value=JSON.parse(localStorage.getItem(SN)).nation;
    document.getElementById('correctKlass').value=JSON.parse(localStorage.getItem(SN)).klass;
    document.getElementById('correctMathGrade').value=JSON.parse(localStorage.getItem(SN)).mathGrade;
    document.getElementById('correctChineseGrade').value=JSON.parse(localStorage.getItem(SN)).chineseGrade;
    document.getElementById('correctEnglishGrade').value=JSON.parse(localStorage.getItem(SN)).englishGrade;
    document.getElementById('correctProgramGrade').value=JSON.parse(localStorage.getItem(SN)).programGrade;
}

function deleteInfo(SN) {
    alert("删除成功!");
    localStorage.removeItem(SN);
    self.location='main.html';
}

function saveCorrect(name) {
    let student=[];
    if (document.getElementById('correctStudyNumber').value.charAt(0) != 'U' || parseFloat(document.getElementById('correctMathGrade').value).toString() != document.getElementById('correctMathGrade').value || parseFloat(document.getElementById('correctChineseGrade').value).toString() != document.getElementById('correctChineseGrade').value || parseFloat(document.getElementById('correctEnglishGrade').value).toString() != document.getElementById('correctEnglishGrade').value || parseFloat(document.getElementById('correctProgramGrade').value).toString() != document.getElementById('correctProgramGrade').value) {
        alert("请按正确的格式输入（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...）：");
    }
    else {
        localStorage.removeItem(name);
        let total=parseFloat(document.getElementById('correctMathGrade').value)+parseFloat(document.getElementById('correctChineseGrade').value)+parseFloat(document.getElementById('correctEnglishGrade').value)+parseFloat(document.getElementById('correctProgramGrade').value);
        let average=total/4;
        student.push(JSON.stringify({Name: document.getElementById('correctName').value,
            studyNumber: document.getElementById('correctStudyNumber').value,
            nation:document.getElementById('correctNation').value,
            klass:document.getElementById('correctKlass').value,
            mathGrade:document.getElementById('correctMathGrade').value,
            chineseGrade:document.getElementById('correctChineseGrade').value,
            englishGrade:document.getElementById('correctEnglishGrade').value,
            programGrade:document.getElementById('correctProgramGrade').value,
            average:average,
            total:total
        }));
        localStorage.setItem(document.getElementById('correctStudyNumber').value,student);
        window.alert("修改成功!");
        $('#beforeCorrect').modal('hide');
        self.location='main.html';
    }
}

function calculatePer(information) {
    let total=parseInt(information.mathGrade.value)+parseInt(information.chineseGrade.value)+parseInt(information.englishGrade.value)+parseInt(information.programGrade.value);
    let average=total/4;
    return{
        average,
        total}
}

function classCondition(Achieve=[]) {
    let classtotal=0;
    let mid;
    let k;
    for(let a of Achieve){
        classtotal+=a;
    }
    let allAverage=classtotal/Achieve.length;

    //冒泡排序；
    for(let i=0;i<Achieve.length-1;i++){
        for(let j=i+1;j<Achieve.length;j++){
            if(Achieve[i]>Achieve[j])
            {k=Achieve[i];
                Achieve[i]=Achieve[j];
                Achieve[j]=k;}
        }
    }
    if(Achieve.length%2==1) mid=Achieve[(Achieve.length-1)/2];
    else mid=(Achieve[Achieve.length/2-1]+Achieve[Achieve.length/2])/2;

    return{
        allAverage,
        mid}
}
