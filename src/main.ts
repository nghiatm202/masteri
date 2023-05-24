import apartmentImage from "./assets/images/apartment.png"

import "./style.css"

// Header
interface HeaderSlide {
  imageSrc: string
  title: string
  content: string
}

const headerSlideData: HeaderSlide[] = [
  {
    imageSrc: "./public/header1.png",
    title: "Find a home that suits your lifestyle",
    content:
      "Built on centuries of tradition and dedicated to innovating the luxury real estate industry, Masteri Centre Point offers transformative experiences through a global network of exceptional and outstanding agents.",
  },
  {
    imageSrc: "./public/header1.png",
    title: "Find a job that suits your lifestyle",
    content:
      "Built on centuries of tradition and dedicated to innovating the luxury real estate industry, Masteri Centre Point offers transformative experiences through a global network of exceptional and outstanding agents.",
  },
  {
    imageSrc: "./public/header1.png",
    title: "Find a money that suits your lifestyle",
    content:
      "Built on centuries of tradition and dedicated to innovating the luxury real estate industry, Masteri Centre Point offers transformative experiences through a global network of exceptional and outstanding agents.",
  },
  {
    imageSrc: "./src/assets/images/header1.png",
    title: "Find a girl that suits your lifestyle",
    content:
      "Built on centuries of tradition and dedicated to innovating the luxury real estate industry, Masteri Centre Point offers transformative experiences through a global network of exceptional and outstanding agents.",
  },
]

const headerSlideList = document.querySelector(
  ".header__slide-list"
) as HTMLElement
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

function showSlideHandler(index: number): void {
  const currentSlide: HeaderSlide = headerSlideData[index]

  headerSlideList.innerHTML = `
    <div class="header__slide-item">
      <div class="header__slide-content">
        <img src="${currentSlide.imageSrc}" alt="Banner" />

        <div class="header__slide-main-content">
          <div class="container">
            <h1 class="header__title">
              ${currentSlide.title}
            </h1>
            <div class="header__text">
              <span class="header__text--sm bold-text">SUPERIOR</span>
              <p class="header__text--base">
                ${currentSlide.content}
              </p>
            </div>
            <span class="header__slide-current">0${index + 1}</span>
          </div>
        </div>
      </div>

      <button class="header__slide-button">Discover Design</button>
    </div>
  `

  headerPaginateCurrent.textContent = `0${index + 1}`
}

function goToPrevSlideHandler(): void {
  headerCurrentSlideIndex =
    (headerCurrentSlideIndex - 1 + headerSlideData.length) %
    headerSlideData.length
  showSlideHandler(headerCurrentSlideIndex)
}

function goToNextSlideHandler(): void {
  headerCurrentSlideIndex =
    (headerCurrentSlideIndex + 1) % headerSlideData.length
  showSlideHandler(headerCurrentSlideIndex)
}

showSlideHandler(headerCurrentSlideIndex)
headerPaginateTotal.textContent = `0${headerSlideData.length}`

headerSlideList.addEventListener("mousedown", startDraggingHandler)
headerSlideList.addEventListener("touchstart", startDraggingHandler)

headerSlideList.addEventListener("mouseup", stopDraggingHandler)
headerSlideList.addEventListener("touchend", stopDraggingHandler)

function startDraggingHandler(event: MouseEvent | TouchEvent): void {
  if (event.type === "mousedown") {
    headerStartPositionX = (event as MouseEvent).clientX
  } else if (event.type === "touchstart") {
    headerStartPositionX = (event as TouchEvent).touches[0].clientX
  }
  isDraggingHeader = true
}

function stopDraggingHandler(event: MouseEvent | TouchEvent): void {
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

function dragHandler(): void {
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
interface ApartmentSlide {
  imageSrcSet: string
  alt: string
  title: string
  description: string
}

const apartmentSlides: ApartmentSlide[] = [
  {
    imageSrcSet: `${apartmentImage} 2x`,
    alt: "Apartment",
    title: "Superior Apartment 3 BR / Kitchen View",
    description:
      "The spectacular 15 into 13 room corner residence is perfectly positioned on Fifth Avenue to enjoy the absolutely dazzling views of Central Park",
  },
  {
    imageSrcSet: `${apartmentImage} 2x`,
    alt: "Apartment",
    title: "Deluxe Apartment 2 BR",
    description:
      "Experience luxurious living in our deluxe 2-bedroom apartments with stunning views and modern amenities",
  },
  {
    imageSrcSet: `${apartmentImage} 2x`,
    alt: "Apartment",
    title: "Top Apartment 1 BR",
    description:
      "Discover the elegance and comfort of our top 1-bedroom apartments, designed for the discerning individuals",
  },
]

const apartmentTabItems = document.querySelectorAll(
  ".apartment-section__tab-item"
)
const apartmentSlideList = document.querySelector(
  ".apartment-section__slide-list.slides"
) as HTMLElement
const apartmentPrevBtn = document.getElementById(
  "apartmentPrevBtn"
) as HTMLElement
const apartmentNextBtn = document.getElementById(
  "apartmentNextBtn"
) as HTMLElement
let apartmentCurrentSlideIndex = 0

function showApartmentSlideHandler(index: number): void {
  apartmentSlideList.innerHTML = `
    <div class="apartment-section__slide-item slide active">
      <div class="apartment-section__slide-content">
        <img srcset="${apartmentSlides[index].imageSrcSet}" alt="${
    apartmentSlides[index].alt
  }" class="apartment-section__slide-image" />
        <div class="apartment-section__slide-main-content">
          <div class="apartment-section__slide-content--left">
            <span class="apartment-section__text bold-text">Gallery</span>
            <span class="apartment-section__selected">Selected Images</span>
          </div>
          <div class="apartment-section__slide-content--center">
            <span class="apartment-section__title bold-text">${
              apartmentSlides[index].title
            }</span>
            <p class="apartment-section__total">
              <span class="apartment-section__current">0${
                index + 1
              }</span> / 0${apartmentSlides.length}
            </p>
            <p class="apartment-section__desc">${
              apartmentSlides[index].description
            }</p>
          </div>
        </div>
        <button class="apartment-section__button">Discover gallery</button>
      </div>
    </div>
  `

  updateApartmentActiveTabHandler(index)
}

function goToPrevApartmentSlideHandler(): void {
  apartmentCurrentSlideIndex =
    (apartmentCurrentSlideIndex - 1 + apartmentSlides.length) %
    apartmentSlides.length
  showApartmentSlideHandler(apartmentCurrentSlideIndex)
}

function goToNextApartmentSlideHandler(): void {
  apartmentCurrentSlideIndex =
    (apartmentCurrentSlideIndex + 1) % apartmentSlides.length
  showApartmentSlideHandler(apartmentCurrentSlideIndex)
}

function updateApartmentActiveTabHandler(index: number): void {
  apartmentTabItems.forEach((tabItem) => {
    tabItem.classList.remove("active")
  })

  apartmentTabItems[index].classList.add("active")
}

function selectApartmentTab(tabIndex: number): void {
  updateApartmentActiveTabHandler(tabIndex)
  apartmentCurrentSlideIndex = tabIndex
  showApartmentSlideHandler(apartmentCurrentSlideIndex)
}

apartmentTabItems.forEach((tabItem, index) => {
  tabItem.addEventListener("click", () => {
    selectApartmentTab(index)
  })
})

apartmentPrevBtn.addEventListener("click", goToPrevApartmentSlideHandler)
apartmentNextBtn.addEventListener("click", goToNextApartmentSlideHandler)

showApartmentSlideHandler(apartmentCurrentSlideIndex)
