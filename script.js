// set up map of pages and current page div
let pageMap = [
    [null, null, null, null, null],
    [null, "about-me-div", "title-page-div", "education-div", null],
    [null, null, "soft-blocked-div", null, null],
    [null, null, "steganography-div", null, null],
    [null, null, "spotify-div", null, null],
    [null, null, null, null, null]
]
let currentIndex = [2, 1]
let currentPage = document.getElementById(pageMap[currentIndex[1]][currentIndex[0]])
let nextPage = document.getElementById(pageMap[currentIndex[1]][currentIndex[0]])
let transitioning = false 
transitionFromTo(currentPage, 0, 0, 0, 0, true)

//instant move 
function transitionFromTo(element, sTop, sLeft, eTop, eLeft, end) { 
    element.style.transition = "none" 
    element.style.top = sTop 
    element.style.left = sLeft 
    setTimeout(() => {
        element.style.transition = "all 0.2s ease-in-out"
        element.addEventListener("transitionend", () => {
            if (end === true) { 
                transitioning = false 
            }
        })
        element.style.top = eTop
        element.style.left = eLeft
        currentPage = element
    }, 0)
}

// event listener for inputs 
window.addEventListener("keydown", checkInput, false)

// if input event -> check if an arrow key -> trigger transition
function checkInput(event) { 
    let direction = null
    // get if input is a direction
    if (event.keyCode == "38" || event.keyCode == "87") {
        direction = "up"
    }
    else if (event.keyCode == "40" || event.keyCode == "83") {
        direction = "down" 
    }
    else if (event.keyCode == "37" || event.keyCode == "65") {
        direction = "left"  
    }
    else if (event.keyCode == "39" || event.keyCode == "68") {
        direction = "right"     
    }
    // if input is a direction 
    if (direction != null) { 
        beginTransition(direction)
    }
}

// trigger transition between pages 
function beginTransition(direction) { 
    if (transitioning === false) {
        if (direction === "up" && pageMap[currentIndex[1] - 1][currentIndex[0]] != null) {
            transitioning = true
            transitionFromTo(currentPage, 0, 0, "100vh", 0, false)
            currentIndex[1] -= 1
            nextPage = document.getElementById(pageMap[currentIndex[1]][currentIndex[0]])
            transitionFromTo(nextPage, "-100vh", 0, 0, 0, true)
        }
        else if (direction == "down" && pageMap[currentIndex[1] + 1][currentIndex[0]] != null) {
            transitioning = true
            transitionFromTo(currentPage, 0, 0, "-100vh", 0, false)
            currentIndex[1] += 1
            nextPage = document.getElementById(pageMap[currentIndex[1]][currentIndex[0]])
            transitionFromTo(nextPage, "100vh", 0, 0, 0, true)
        }
        else if (direction == "left" && pageMap[currentIndex[1]][currentIndex[0] - 1] != null) {
            transitioning = true
            transitionFromTo(currentPage, 0, 0, 0, "100vw", false)
            currentIndex[0] -= 1 
            nextPage = document.getElementById(pageMap[currentIndex[1]][currentIndex[0]])
            transitionFromTo(nextPage, 0, "-100vw", 0, 0, true)
        }
        else if (direction == "right" && pageMap[currentIndex[1]][currentIndex[0] + 1] != null) { 
            transitioning = true
            transitionFromTo(currentPage, 0, 0, 0, "-100vw", false)
            currentIndex[0] += 1 
            nextPage = document.getElementById(pageMap[currentIndex[1]][currentIndex[0]])
            transitionFromTo(nextPage, 0, "100vw", 0, 0, true)
        }
    }
}

