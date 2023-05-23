import "./style.css"

// Header
const headerSlideList = document.querySelector(
  ".header__slide-list"
) as HTMLElement
const headerSlideItemArray = Array.from(
  headerSlideList.getElementsByClassName("header__slide-item")
) as HTMLElement[]
const headerPaginateCurrent = document.querySelector(
  ".header__slide-paginate--current"
) as HTMLElement
const headerPaginateTotal = document.querySelector(
  ".header__slide-paginate--total"
) as HTMLElement

let headerCurrentSlideIndex = 0
let isDraggingHeader = false
let headerStartPositionX = 0
let headerEndPositionX = 0

function showSlideHandler(index: number) {
  headerSlideItemArray.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none"
  })
  headerPaginateCurrent.textContent = `0${index + 1}`
}

function goToPrevSlideHandler() {
  headerCurrentSlideIndex =
    (headerCurrentSlideIndex - 1 + headerSlideItemArray.length) %
    headerSlideItemArray.length
  showSlideHandler(headerCurrentSlideIndex)
}

function goToNextSlideHandler() {
  headerCurrentSlideIndex =
    (headerCurrentSlideIndex + 1) % headerSlideItemArray.length
  showSlideHandler(headerCurrentSlideIndex)
}

showSlideHandler(headerCurrentSlideIndex)
headerPaginateTotal.textContent = `0${headerSlideItemArray.length}`

headerSlideList.addEventListener("mousedown", startDraggingHandler)
headerSlideList.addEventListener("touchstart", startDraggingHandler)

headerSlideList.addEventListener("mouseup", stopDraggingHandler)
headerSlideList.addEventListener("touchend", stopDraggingHandler)

// headerSlideList.addEventListener("mousemove", dragSlide)
// headerSlideList.addEventListener("touchmove", dragSlide)

function startDraggingHandler(event: MouseEvent | TouchEvent) {
  if (event.type === "mousedown") {
    headerStartPositionX = (event as MouseEvent).clientX
  } else if (event.type === "touchstart") {
    headerStartPositionX = (event as TouchEvent).touches[0].clientX
  }
  isDraggingHeader = true
}

function stopDraggingHandler(event: MouseEvent | TouchEvent) {
  if (isDraggingHeader) {
    if (event.type === "mouseup") {
      headerEndPositionX = (event as MouseEvent).clientX
    } else if (event.type === "touchend") {
      headerEndPositionX = (event as TouchEvent).changedTouches[0].clientX
    }
    dragHandler()
    isDraggingHeader = false
  }
}

function dragHandler() {
  const threshold = 50
  const dragDistance = headerStartPositionX - headerEndPositionX

  if (dragDistance > threshold) {
    goToNextSlideHandler()
  } else if (dragDistance < -threshold) {
    goToPrevSlideHandler()
  }
}

headerSlideList.addEventListener("touchmove", (event) => {
  event.preventDefault()
})

// Apartment
const apartmentTabList = document.getElementsByClassName(
  "apartment-section__tab-item"
) as HTMLCollectionOf<HTMLElement>
const apartmentSlideList = document.getElementsByClassName(
  "apartment-section__slide-item"
) as HTMLCollectionOf<HTMLElement>
const apartmentPrevBtn = document.getElementById(
  "apartmentPrevBtn"
) as HTMLElement
const apartmentNextBtn = document.getElementById(
  "apartmentNextBtn"
) as HTMLElement
let apartmentCurrentTab = 0

function showApartmentTabHandler(index: number) {
  Array.from(apartmentTabList).forEach((tab) => tab.classList.remove("active"))
  Array.from(apartmentSlideList).forEach((slide) =>
    slide.classList.remove("active")
  )

  apartmentTabList[index].classList.add("active")
  apartmentSlideList[index].classList.add("active")
}

apartmentPrevBtn.addEventListener("click", function () {
  apartmentCurrentTab--
  if (apartmentCurrentTab < 0) {
    apartmentCurrentTab = apartmentTabList.length - 1
  }
  showApartmentTabHandler(apartmentCurrentTab)
})

apartmentNextBtn.addEventListener("click", function () {
  apartmentCurrentTab++
  if (apartmentCurrentTab >= apartmentTabList.length) {
    apartmentCurrentTab = 0
  }
  showApartmentTabHandler(apartmentCurrentTab)
})

Array.from(apartmentTabList).forEach((tab) => {
  tab.addEventListener("click", function (event) {
    const clickedTab = event.target as HTMLElement
    apartmentCurrentTab = Array.from(apartmentTabList).indexOf(clickedTab)
    showApartmentTabHandler(apartmentCurrentTab)
  })
})
