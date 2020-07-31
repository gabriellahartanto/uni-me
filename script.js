// // TEMPLATE BUAT JAGA"
// function getFormInfo() {
//   let myForm = document.getElementById("form");
//   let eachElement = "";
//   for (let i = 0; i < myForm.length; i++) {
//     let eachElementForm = myForm.elements[i];
//     eachElement += eachElementForm.value + "<br>";
//   }
//   document.getElementById("test").innerHTML = eachElement;
// }

// function resetForm() {
//   document.getElementById("form").reset();
// }

let courses = [];

function getFormInfo() {
  let myForm = document.getElementById("form");
  let contents = formContents(myForm);
  if (courses.length === 0) {
    courses.push(contents);
  } else {
    let isDuplicate = false;
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].code === contents.code) {
        isDuplicate = true;
        document.getElementById("test").innerHTML = `You've added this course!`;
        break;
      }
    }
    if (isDuplicate === false) {
      courses.push(contents);
    }
  }
  document.getElementById("test").innerHTML = `You just added a new course!`;
  console.log(courses);
  return courses;
}

function formContents(data) {
  let output = {
    code: data.elements[0].value,
    data: {
      name: data.elements[1].value,
      term: data.elements[2].value,
      deliveryMethod: data.elements[3].value,
      uoc: data.elements[4].value,
      reqCourse: data.elements[5].value
    }
  };
  return output;
}

function checkDuplicate(data) {
  if (courses.length === 0) {
    courses.push(data);
  } else {
    let isDuplicate = false;
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].code === data.code) {
        isDuplicate = true;
        break;
      }
    }
    if (isDuplicate === false) {
      courses.push(data);
    }
  }
}

function resetForm() {
  document.getElementById("form").reset();
}

// ============================
// KEEP START DATA
let startData = [];

function keepStartData() {
  let preFormData = document.getElementById("pre-form");
  startData.push(preFormData.elements[0].value);
  startData.push(preFormData.elements[1].value);
  console.log(startData)
  return startData
}

// ============================
// HIDE SHOW BUTTON
function hideAddCourse() {
  var formContent = document.getElementById("form");
  if (formContent.style.display === "none") {
    formContent.style.display = "block";
  } else {
    formContent.style.display = "none";
  }
}

function hideShowSchedule() {
  var scheduleContent = document.getElementById("schedule");
  if (scheduleContent.style.display === "none") {
    scheduleContent.style.display = "block";
  } else {
    scheduleContent.style.display = "none";
  }
}

function showAdd() {
  var addContent = document.getElementById("add-course-again");
  if (addContent.style.display === "none") {
    addContent.style.display = "block";
  } else {
    addContent.style.display = "none";
  }
}

// ============================ 
// TABLE
function makeTable() {
  var table = document.getElementById("table-y1");
  var row = table.insertRow(-1); // keep as is
  var cell1 = row.insertCell(0);
  cell1.innerHTML = `test`;
}

// =============================
// THE SYSTEM
// 1. check yg gaada requirements aka 0
// 1. a. dari yg requirements 0, cari yg paling byk muncul codenya di the requirements other courses
//    >> yang paling byk AND yg ada term nanti masuk ke term start
// 1. b. max per term 3 course, if udah 3 stop loop, term +1
// 1. c. repeat again 

// let tampungan = [];
// let trash = [];
// let termCounter = 0; // total udah brp terms
// let courseCounter = 0;
// let yearCounter = 0;
// let count = 0;

function finalTable() {
  let startInfo = startData;
  let tampungan = [];
  let trash = [];
  let termCounter = 0; // total udah brp terms
  let courseCounter = 0;
  let yearCounter = 0;
  let count = 0;
  let addedCounter = countRequirements(courses);
  let tampunganSementara = [];
  // while (yearCounter < startData[1]) {
    for (let m = 0; m < courses.length; m++) {
      if (trash.length === 0) {
        tampunganSementara = addedCounter;
        console.log("kosong - tampunganSementara", count++, tampunganSementara, m)
      } else if (trash.length > 0) {
        tampunganSementara = [];
        let same = false;
        let count = 0;
        for (let n = 0; n < addedCounter.length; n++) {
          for (let p = 0; p < trash.length; p++) {
            if (addedCounter[n].code === trash[p].code) {
              same = true;
              break;
            } else {
              same = false;
            }
          }
          if (same === false) {
            tampunganSementara.push(addedCounter[n]);
          }
        }
        console.log("ga kosong - tampunganSementara", count++, tampunganSementara, m)
      }
      let coursesAccordingToTerm = checkTerm(tampunganSementara);
      let wadah = coursesAccordingToTerm;
      tampungan = [];
      for (let i = 0; i < wadah.length; i++) { // ini yg gaada req
        let eachCourse = wadah[i];
        if (eachCourse.data.reqCourse.length === 0) {
          tampungan.push(eachCourse);
        }
      }
      console.log("cek yg gada req - tampungan", count++, tampungan, m)
      let pembatasCounterReq = -Infinity;
      let catatIndex = 0;
      if (tampungan.length === 0 || tampungan === undefined) { // sisanya ada req semua, if gada req, ini di skip
        let canPush = false;
        for (let j = 0; j < wadah.length; j++) {
          let eachCourseYangAdaReq = wadah[j];
          let goodToGo = false;
          for (let r = 0; r < trash.length; r++) {
            let eachCodeFromTrash = trash[r].code;
            if (eachCourseYangAdaReq.reqCourse === eachCodeFromTrash) {
              goodToGo = true;
              break;
            } else {
              goodToGo = false;
            }
          }
          if (goodToGo === true) { // && eachCourseYangAdaReq.data.counterReq > pembatasCounterReq) {
            pembatasCounterReq = eachCourseYangAdaReq.data.counterReq;
            catatIndex = j;
            canPush = true;
          } 
        }
        if (canPush === true) {
          tampungan = [];
          tampungan.push(wadah[catatIndex]);
          console.log("ini yg ada req - tampungan", count++, tampungan, m)
        } else {
          termCounter = 3;
        }
      } else if (tampungan === undefined) {
        termCounter = 3;
      } else { // utk yg gaada req
        let temp = tampungan;
        // console.log("ini temp", temp)
        for (let k = 0; k < temp.length; k++) {
          let eachCourseYangGaAdaReq = temp[k];
          if (eachCourseYangGaAdaReq.data.counterReq > pembatasCounterReq) {
            pembatasCounterReq = eachCourseYangGaAdaReq.data.counterReq;
            catatIndex = k;
          }
        }
        tampungan = [];
        // console.log("mestinya tampungan kosong", tampungan, m)
        tampungan.push(temp[catatIndex]);
        console.log("ini yg GA ada req - tampungan", count++, tampungan, m) // FIX! cuman liat dri termnya sama atau engga 
      }

      let addToTable = false;
      if (tampungan.length === 0 || tampungan === undefined) {
        termCounter = 3;
        addToTable = false;
      } else {
        courseCounter++;
        addToTable = true;
      }

      if (addToTable === true || m === courses.length - 1) {
        let table1 = document.getElementById("table-y1");
        let addedToSched = addToSchedule(table1, tampungan[0]);
        trash.push(tampungan[0]);
      } else {
        if (startData[0] === '1') {
          startData.shift();
          startData.unshift('2')
        } else if (startData[0] === '2') {
          startData.shift();
          startData.unshift('3')
        } else if (startData[0] === '3') {
          startData.shift();
          startData.unshift('1')
        }
      }
      console.log(trash, "ini trash")
      // if (tampungan.length > 0 && tampungan !== undefined) {
      //   courseCounter++;
      //   // check the term and course
      //   let addToTable = false;
      //   if (courseCounter < 3) {
      //     addToTable = true;
      //   } else if (courseCounter === 3) {
      //     termCounter++;
      //     courseCounter = 0;
      //   } 
      //   if (addToTable === true) {
      //     if (termCounter < 3) {
      //       let table1 = document.getElementById("table-y1");
      //       let addedToSched = addToSchedule(table1, tampungan[0]);
      //     } else if (termCounter === 3) {
      //       // yearCounter++; 
      //       termCounter = 0;
      //       if (startInfo[0] === 1 || startInfo[0] === 2) {
      //         startInfo[0]++;
      //       } else if (startInfo[0] === 3) {
      //         startInfo[0] = 1;
      //       }
      //     }
      //     trash.push(tampungan[0]);
      //     console.log("this is trash", trash, m);
      //   }
      // } else {
      //   termCounter = 0;
      //   if (startInfo[0] === 1 || startInfo[0] === 2) {
      //     startInfo[0]++;
      //   } else if (startInfo[0] === 3) {
      //     startInfo[0] = 1;
      //   }
      // }
      console.log(`termCounter: ${termCounter}, courseCounter: ${courseCounter}, termOriEdit: ${startInfo[0]}`)
      
      // tampunganSementara = [];
      // for (let n = 0; n < courses.length; n++) {
      //   for (let p = 0; p < trash.length; p++) {
      //     if (courses[n] !== trash[p]) {
      //       tampunganSementara.push(addedCounter[n]);
      //     }
      //   }
      // }
    }
    // break;
    // if (years === 0) { // year 1
    // } else if (years === 1) { // year 2
    // } else if (years === 2) { // year 3
    // } else if (years === 3) { // year 4
    // }
  // }
}

function addToSchedule(table, satuDataOnly) {
  var row = table.insertRow(-1); // keep as is
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  cell1.innerHTML = satuDataOnly.code;
  cell2.innerHTML = satuDataOnly.data.name;
  cell3.innerHTML = satuDataOnly.data.term;
  cell4.innerHTML = satuDataOnly.data.deliveryMethod;
  cell5.innerHTML = satuDataOnly.data.uoc;
  cell6.innerHTML = satuDataOnly.data.reqCourse;
  table.style.display = "block";
}

function countRequirements(data) {
  for (let i = 0; i < data.length; i++) {
    let eachCourse = data[i];
    for (let j = 0; j < data.length; j++) {
      if (eachCourse.code === data[j].data.reqCourse) {
        if (eachCourse.data.counterReq === undefined) {
          eachCourse.data.counterReq = 0;
        }
        eachCourse.data.counterReq++;
      }
    }
  }
  return data;
}

function checkTerm(data) {
  let tampungan = [];
  for (let i = 0; i < data.length; i++) {
    let eachCourse = data[i];
    if (eachCourse.data.term === startData[0]) {
      tampungan.push(eachCourse);
    }
  }
  return tampungan;
  // if (startData[0] === 1 || startData[0] === 2) {
  //   startData[0]++;
  // } else if (startData[0] === 3) {
  //   startData[0] = 1;
  // }
}

// function finalTable() {
//   for (let i = 0; i < courses.length; i++) {
//     let eachCourse = courses[i];
//     for (let j = 0; j < courses.length; j++) {
//       if (eachCourse.code === courses[j].data.reqCourse) {
//         if (eachCourse.data.counterReq === undefined) {
//           eachCourse.data.counterReq = 0;
//         }
//         eachCourse.data.counterReq++;
//       }
//     }
//   }
//   let term1 = [];
//   let term2 = [];
//   let term3 = [];
//   for (let k = 0; k < courses.length; k++) {
//     let eachCourse = courses[k];
//     if (eachCourse.data.term === 1) {
//       term1.push(eachCourse);
//     } else if (eachCourse.data.term === 2) {
//       term2.push(eachCourse);
//     } else {
//       term3.push(eachCourse);
//     }
//   }
//   let dibagiPerTerm = [];
//   if (startData[0] === 1) {
//     dibagiPerTerm.push(term1);
//     dibagiPerTerm.push(term2);
//     dibagiPerTerm.push(term3);
//   } else if (startData[0] === 2) {
//     dibagiPerTerm.push(term2);
//     dibagiPerTerm.push(term3);
//     dibagiPerTerm.push(term1);
//   } else if (startData[0] === 3) {
//     dibagiPerTerm.push(term3);
//     dibagiPerTerm.push(term1);
//     dibagiPerTerm.push(term2);
//   }
  
//   for (let i = 0; i < dibagiPerTerm.length; i++) {
//     let perTerm = dibagiPerTerm[i];
//     for (let j = 0; j < perTerm.length; j++) {
//       let eachData = perTerm[j];
//       if (eachData.data.reqCourse.length === 0) {

//       }
//     }
//   }
// }

// function finalTable() {
//   let listRequirements = {}; // list code" yg diminta as required
//   for (let i = 0; i < courses.length; i++) {
//     let eachCourse = courses[i];
//     for (let j = 0; j < courses.length; j++) {
//       if (eachCourse.code === courses[j].data.reqCourse) {
//         if (eachCourse.data.counterReq === undefined) {
//           eachCourse.data.counterReq = 0;
//         }
//         eachCourse.data.counterReq++;
//       }
//     }
//   }
//   for (let i = 0; i < startData[1]; i++) {
//     let tampungan = [];
//     let tampunganNanti = [];
//     let trash = [];
//     for (let n = 0; n < courses.length; n++) {
//       for (let j = 0; j < courses.length; j++) {
//         let eachCourse = courses[j];
//         if (eachCourse.data.reqCourse.length === 0 && eachCourse.data.term === startData[0]) {
//           tampungan.push(eachCourse);
//         } else { // ada requirements
//           tampunganNanti.push(eachCourse);
//           // do bubble sort!
//         }
//       }
//     }
//       // buat yg gada req
//       let angkaBatas = -Infinity;
//       let catatIndex = 0;
//       let tampunganDuluan = [];
//       let baskom = tampungan;
//       for (let m = 0; m < tampungan.length; m++) {
//         for (let i = 0; i < baskom.length; i++) {
//           if (tampungan[m].data.counterReq > angkaBatas) {
//             angkaBatas = tampungan[m].data.counterReq;
//             catatIndex = m;
//           }
//         }
//       }
//   }
//     let input = [];
//     for (let p = 0; p < tampunganDuluan.length; p++) {
//       input.push(tampunganDuluan[p]);
//     }
//     for (let q = 0; q < tampunganNanti.length; q++) {
//       input.push(tampunganNanti[q]);
//     }
//       // masukkin data ke table
//       if (i === 0) { // year 1
//         var table1 = document.getElementById("table-y1");
//         var row = table1.insertRow(-1); // keep as is
//         var cell1 = row.insertCell(0);
//         var cell2 = row.insertCell(1);
//         var cell3 = row.insertCell(2);
//         var cell4 = row.insertCell(3);
//         var cell5 = row.insertCell(4);
//         var cell6 = row.insertCell(5);
//         cell1.innerHTML = tampungan[catatIndex].code;
//         cell2.innerHTML = tampungan[catatIndex].data.name;
//         cell3.innerHTML = tampungan[catatIndex].data.term;
//         cell4.innerHTML = tampungan[catatIndex].data.deliveryMethod;
//         cell5.innerHTML = tampungan[catatIndex].data.uoc;
//         cell6.innerHTML = tampungan[catatIndex].data.reqCourse;
//         table1.style.display = "block";
//       } else if (i === 1) { // year 2
  
//       } else if (i === 2) { // year 3
  
//       } else if (i === 3) { // year 4
  
//       }
//       for (let o = 0; o < courses.length; o++) {
//         let eachCourse = courses[o];
//         if (eachCourse.code === tampungan[catatIndex].code) {
//           trash.push(eachCourse);
//         } else { // ada requirements
//           tampungan.push(eachCourse);
//         }
//       }
//     }

// function fillTable() {
//   var table = document.getElementById("table-y1");
//   var row = table.insertRow(-1); // keep as is
//   var cell1 = row.insertCell(0);
//   cell1.innerHTML = `test`;
// }