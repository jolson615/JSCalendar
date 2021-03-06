console.log("script running")

const wrapper = document.querySelector('.cardBody .row')
console.log(wrapper)

var preferences = {
  'location': [],
  'session': [],
  'course': []
}
var courses = []

fetch("https://raw.githubusercontent.com/jolson615/JSCalendar/master/schedule.json")
  .then(r => r.json())
  .then(data => {
    populatePage(data)
    courses = data
  }).catch(e => console.log("Error"))

function populatePage(courses) {
  courses.forEach(course => {
    addCard(course)
  })
}

function addCard(course) {
  let start = course["Start Date"].slice(6).replace("-","/")
  let end = course["End Date"].slice(6).replace("-","/")
  let imagesrc = getImage(course["Class Code"])
  let description = getDescription(course["Class Code"])
  let shortDescription = getShortDescription(course["Class Code"])
  if (course["Area"] == "N/A") {
    console.log("Course not yet ready")
  } else {
    wrapper.innerHTML += `
        <div class='col s12 m6 l4 coursecard ${course["Class Code"]}' data-session='${course["Session"]}' data-location='${course["Area"]}' data-course='${course["Class"]}' data-age='${course["Max Age"]}'>
          <div class="card sticky-action medium hoverable">
            <div class='${course["Class Code"]} card-image' style="height: 45%; overflow: hidden">
              <div></div>
              <img class="activator" src='${imagesrc}' style="height: 100px">
              <div></div>
            </div>
            <div class="card-content grey-text" style="height: 45%">
              <span class="card-title grey-text text-darken-1">${course["Class"]} <i class="material-icons right activator waves-effect waves-light">more_vert</i></span>
              <span class="row">${course["Area"]} @ ${course["Location"]} </span>
              <div class="row">
                <span class="courseDates">${start} - ${end}, Ages ${course["Min Age"]}-${course["Max Age"]}</span>
                <br>
              </div>

            </div>
            <div class="card-action">
              <a href="https://www.upperlinecode.com/classes" target="_blank">Learn More</a>
              <a href='${course["Link"]}' target="_blank">Register</a>
              <span class="cost right-align grey-text">$2100</span>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">${course["Class"]}<i class="material-icons right">close</i></span>
              <p class="">${description}</p>

            </div>
          </div>
        </div>
    `
  }
}

function getImage(courseName) {
  if (courseName == "ruby") {
    return("images/icon-ruby-white.svg")
  } else if (courseName == "swift") {
    return("images/icon-mobile-white.svg")
  } else if (courseName == "javascript") {
    return("images/icon-vr-white.svg")
  }
}

function getDescription(courseName) {
  if (courseName == "ruby") {
    return("Back-end languages like Ruby are used to write algorithms that power websites like Airbnb. By the end of this course, students will use core Ruby, HTML, and CSS to build a functional web app.")
  } else if (courseName == "swift") {
    return("It takes months to get an app on the AppStore, but in these two weeks, students build at least 5 basic apps using Swift frameworks and try the apps on their own iPhones.")
  } else if (courseName == "javascript") {
    return("JavaScript brings the web to life: animate webpages, interact with other sites, and create art, games, and virtual realities. In this course, students will build at least two JavaScript-powered web apps.")
  }
}

function getShortDescription(courseName) {
  if (courseName == "ruby") {
    return("Master full-stack programming with Ruby")
  } else if (courseName == "swift") {
    return("Build iPhone apps with Xcode and Swift")
  } else if (courseName == "javascript") {
    return("Engineering meets design with JavaScript")
  }
}
