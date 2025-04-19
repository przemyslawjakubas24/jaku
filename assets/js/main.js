document.addEventListener('DOMContentLoaded', function () {
	// Zapisz często używane elementy DOM jako stałe
	const header = document.querySelector('header')
	const hamburger = document.querySelector('.hamburger')
	const navMenu = document.querySelector('.nav-menu')
	const navLinks = document.querySelectorAll('.nav-links li a')
	const hero = document.querySelector('.hero')
	const scrollToTopButton = document.getElementById('scrollToTop')
	const logo = document.querySelector('.logo')

	if (hamburger) {
		hamburger.addEventListener('click', () => {
			hamburger.classList.toggle('active')
			navMenu.classList.toggle('active')
			// Prevent body scrolling when menu is open
			document.body.classList.toggle('menu-open')
		})
	}

	// Close menu when a link is clicked
	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			hamburger.classList.remove('active')
			navMenu.classList.remove('active')
			document.body.classList.remove('menu-open')
		})
	})

	// Close menu when clicking outside
	document.addEventListener('click', e => {
		// Check if menu is active and the click is outside the menu and hamburger
		if (
			navMenu &&
			navMenu.classList.contains('active') &&
			!navMenu.contains(e.target) &&
			!hamburger.contains(e.target)
		) {
			hamburger.classList.remove('active')
			navMenu.classList.remove('active')
			document.body.classList.remove('menu-open')
		}
	})

	// Smooth scrolling for anchor links
	const links = document.querySelectorAll('a[href^="#"]')

	for (const link of links) {
		link.addEventListener('click', smoothScroll)
	}

	function smoothScroll(e) {
		e.preventDefault()

		const targetId = this.getAttribute('href')
		if (targetId === '#') return

		const targetElement = document.querySelector(targetId)
		const headerOffset = 80
		const elementPosition = targetElement.getBoundingClientRect().top
		const offsetPosition = elementPosition + window.pageYOffset - headerOffset

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth',
		})
	}

	// Intersection Observer for fade-in animations
	const fadeObserverOptions = {
		threshold: 0.2,
	}

	const fadeObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible')
			}
		})
	}, fadeObserverOptions)

	// Observe all sections
	document.querySelectorAll('section').forEach(section => {
		section.classList.add('fade-in')
		fadeObserver.observe(section)
	})

	// Form submission handling
	const contactForm = document.querySelector('.contact-form form')

	if (contactForm) {
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault()

			// Get form data
			const formData = new FormData(this)
			const formDataObj = {}

			formData.forEach((value, key) => {
				formDataObj[key] = value
			})

			// Simulate form submission
			this.innerHTML =
				'<div style="text-align: center; padding: 30px;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 20px;"></i><p>Wysyłanie wiadomości...</p></div>'

			setTimeout(() => {
				this.innerHTML =
					'<div style="text-align: center; padding: 30px;"><i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 20px;"></i><h3>Dziękujemy za wiadomość!</h3><p>Odezwiemy się najszybciej jak to możliwe.</p></div>'
			}, 2000)

			// In a real application, you would send the data to a server here
			console.log('Form submitted with data:', formDataObj)
		})
	}

	// Obsługa przycisku Scroll to Top
	// Pokazuje przycisk, gdy użytkownik przewinie stronę w dół
	window.addEventListener('scroll', () => {
		if (window.pageYOffset > 300) {
			// Pokazuj przycisk po przewinięciu 300px
			scrollToTopButton.classList.add('show')
			scrollToTopButton.style.display = 'block'
		} else {
			scrollToTopButton.classList.remove('show')
			scrollToTopButton.style.display = 'none'
		}
	})

	// Przewija do góry po kliknięciu przycisku
	scrollToTopButton.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	})

	// Animate service cards
	const serviceCards = document.querySelectorAll('.service-card')
	const cardObserverOptions = {
		threshold: 0.2,
		rootMargin: '0px',
	}

	const cardObserver = new IntersectionObserver(function (entries, observer) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible')
			}
		})
	}, cardObserverOptions)

	serviceCards.forEach(card => {
		card.classList.add('fade-in') // Dodaj klasę fade-in zamiast stylów inline
		cardObserver.observe(card)
	})

	// Interactive portfolio gallery
	const portfolioItems = document.querySelectorAll('.portfolio-item')

	portfolioItems.forEach(item => {
		// Implementacja efektu hover
		item.addEventListener('mouseover', () => {
			item.style.transform = 'scale(1.05)'
		})

		item.addEventListener('mouseout', () => {
			item.style.transform = 'scale(1)'
		})

		// Implementacja kliknięcia
		item.addEventListener('click', function () {
			// In a real application, you might want to implement a lightbox here
			console.log('Portfolio item clicked:', this.querySelector('h3')?.textContent)
		})
	})

	// Add balloon animation to the hero section (just for fun)

	function createBalloon() {
		if (!hero) {
			return
		}

		const colors = ['#ff69b4', '#8a2be2', '#00bfff', '#ff6347', '#32cd32']
		const balloon = document.createElement('div')
		const size = Math.random() * 30 + 20
		const color = colors[Math.floor(Math.random() * colors.length)]
		const animationDuration = Math.random() * 10 + 15
		const floatDelay = Math.random() * 2

		balloon.classList.add('hero-balloon') // Add class for easier debugging
		balloon.style.position = 'absolute'
		balloon.style.bottom = '-50px'
		balloon.style.left = Math.random() * 90 + 5 + '%'
		balloon.style.width = size + 'px'
		balloon.style.height = size * 1.2 + 'px'
		balloon.style.borderRadius = '50% 50% 50% 50% / 40% 40% 60% 60%'
		balloon.style.background = color
		balloon.style.opacity = '0.7'
		balloon.style.zIndex = '10' // Ensure balloons are visible above other content

		// Add shadow for 3D effect
		balloon.style.boxShadow = `inset -2px -2px 4px rgba(0,0,0,0.2), inset 2px 2px 4px rgba(255,255,255,0.2)`

		// Add each animation separately to avoid issues
		balloon.style.animation = `
			float-up ${animationDuration}s ease-in-out ${floatDelay}s forwards,
			sway-balloon ${3 + Math.random() * 2}s ease-in-out infinite alternate,
			wobble-balloon ${2 + Math.random() * 2}s ease-in-out infinite
		`

		// Create string
		const string = document.createElement('div')
		string.classList.add('balloon-string') // Add class for easier debugging
		string.style.position = 'absolute'
		string.style.width = '1px'
		string.style.height = size * 1.5 + 'px'
		string.style.background = 'rgba(255,255,255,0.7)'
		string.style.top = '100%'
		string.style.left = '50%'
		string.style.transformOrigin = 'top'
		string.style.animation = `string-wave ${2 + Math.random()}s ease-in-out infinite alternate`

		// Create knot at the bottom of the balloon
		const knot = document.createElement('div')
		knot.classList.add('balloon-knot') // Add class for easier debugging
		knot.style.position = 'absolute'
		knot.style.width = size * 0.15 + 'px'
		knot.style.height = size * 0.15 + 'px'
		knot.style.borderRadius = '50%'
		knot.style.background = color
		knot.style.bottom = '-2px'
		knot.style.left = '50%'
		knot.style.transform = 'translateX(-50%)'

		balloon.appendChild(knot)
		balloon.appendChild(string)
		hero.appendChild(balloon)

		// Remove the balloon after animation to avoid memory issues
		setTimeout(() => {
			if (hero.contains(balloon)) {
				hero.removeChild(balloon)
			}
		}, (animationDuration + floatDelay) * 1000)
	}

	// Create a style for the balloon animation with unique names to avoid conflicts
	const balloonStyle = document.createElement('style')
	balloonStyle.textContent = `
		/* Balloon animation keyframes */
		@keyframes float-up {
			0% {
				bottom: -50px;
				opacity: 0;
			}
			10% {
				opacity: 0.7;
			}
			90% {
				opacity: 0.7;
			}
			100% {
				bottom: 120vh;
				opacity: 0;
			}
		}
		
		@keyframes sway-balloon {
			0% {
				transform: translateX(-15px);
			}
			100% {
				transform: translateX(15px);
			}
		}
		
		@keyframes wobble-balloon {
			0%, 100% {
				transform: rotate(-2deg);
			}
			50% {
				transform: rotate(2deg);
			}
		}
		
		@keyframes string-wave {
			0% {
				transform: rotate(-3deg);
			}
			100% {
				transform: rotate(3deg);
			}
		}
		
		/* Ensure hero has proper positioning for absolute elements */
		.hero {
			position: relative;
			overflow: visible !important;
		}
	`
	document.head.appendChild(balloonStyle)

	// Create balloons at random intervals
	if (hero) {
		// Create a few balloons immediately
		for (let i = 0; i < 3; i++) {
			setTimeout(() => createBalloon(), i * 700)
		}

		// Continue creating balloons at random intervals
		function scheduleNextBalloon() {
			const delay = 3000 + Math.random() * 2000
			setTimeout(() => {
				createBalloon()
				scheduleNextBalloon()
			}, delay)
		}
		scheduleNextBalloon()
	} else {
		console.error('Hero element not found, balloon animation disabled')
	}

	// Lightbox dla portfolio
	const lightbox = document.getElementById('portfolioLightbox')
	const lightboxImg = lightbox.querySelector('.lightbox-image')
	const lightboxTitle = lightbox.querySelector('.lightbox-title')
	const lightboxDesc = lightbox.querySelector('.lightbox-description')
	const lightboxClose = lightbox.querySelector('.lightbox-close')
	const lightboxNext = lightbox.querySelector('.lightbox-next')
	const lightboxPrev = lightbox.querySelector('.lightbox-prev')

	let currentIndex = 0
	const portfolioData = []

	// Zbierz dane o wszystkich elementach portfolio
	portfolioItems.forEach((item, index) => {
		const img = item.querySelector('img')
		const overlay = item.querySelector('.portfolio-overlay')
		const title = overlay.querySelector('h3')?.textContent || ''
		const description = overlay.querySelector('p')?.textContent || ''

		portfolioData.push({
			src: img.src,
			alt: img.alt,
			title: title,
			description: description,
		})

		// Usuń stare event listenery
		item.removeEventListener('click', function () {})
		item.removeEventListener('mouseover', () => {})
		item.removeEventListener('mouseout', () => {})

		// Dodaj nowy event listener dla otwierania lightboxa
		item.addEventListener('click', function () {
			openLightbox(index)
		})
	})

	// Funkcja otwierająca lightbox
	function openLightbox(index) {
		currentIndex = index
		updateLightboxContent()
		lightbox.classList.add('active')
		document.body.classList.add('lightbox-open')
	}

	// Funkcja aktualizująca zawartość lightboxa
	function updateLightboxContent() {
		const item = portfolioData[currentIndex]

		// Dodajemy animację dla płynnej zmiany obrazu
		lightboxImg.style.opacity = '0'

		setTimeout(() => {
			lightboxImg.src = item.src
			lightboxImg.alt = item.alt
			lightboxTitle.textContent = item.title
			lightboxDesc.textContent = item.description
			lightboxImg.style.opacity = '1'
		}, 300)
	}

	// Zamykanie lightboxa
	lightboxClose.addEventListener('click', closeLightbox)
	lightbox.addEventListener('click', function (e) {
		if (e.target === lightbox) {
			closeLightbox()
		}
	})

	// Obsługa klawiatury
	document.addEventListener('keydown', function (e) {
		if (!lightbox.classList.contains('active')) return

		if (e.key === 'Escape') {
			closeLightbox()
		} else if (e.key === 'ArrowRight') {
			nextImage()
		} else if (e.key === 'ArrowLeft') {
			prevImage()
		}
	})

	function closeLightbox() {
		lightbox.classList.remove('active')
		document.body.classList.remove('lightbox-open')
	}

	// Nawigacja do następnego obrazu
	lightboxNext.addEventListener('click', nextImage)

	function nextImage() {
		currentIndex = (currentIndex + 1) % portfolioData.length
		updateLightboxContent()
	}

	// Nawigacja do poprzedniego obrazu
	lightboxPrev.addEventListener('click', prevImage)

	function prevImage() {
		currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length
		updateLightboxContent()
	}

	// Dodaj obsługę gestów dotykowych dla urządzeń mobilnych
	let touchStartX = 0
	let touchEndX = 0

	lightbox.addEventListener('touchstart', function (e) {
		touchStartX = e.changedTouches[0].screenX
	})

	lightbox.addEventListener('touchend', function (e) {
		touchEndX = e.changedTouches[0].screenX
		handleSwipe()
	})

	function handleSwipe() {
		const swipeThreshold = 50
		if (touchEndX < touchStartX - swipeThreshold) {
			// Przesunięcie w lewo - następne zdjęcie
			nextImage()
		} else if (touchEndX > touchStartX + swipeThreshold) {
			// Przesunięcie w prawo - poprzednie zdjęcie
			prevImage()
		}
	}

	// Sticky header i zmiana rozmiaru logo podczas przewijania
	window.addEventListener('scroll', function () {
		// Dodaj klasę sticky przy przewijaniu
		header.classList.toggle('sticky', window.scrollY > 0)
	})

	// Testimonials Carousel
	function initTestimonialsCarousel() {
		const track = document.querySelector('.testimonials-track')
		const items = document.querySelectorAll('.testimonial-item')
		const prevBtn = document.querySelector('.carousel-prev')
		const nextBtn = document.querySelector('.carousel-next')
		const dotsContainer = document.querySelector('.carousel-dots')

		if (!track || items.length === 0) return

		let itemWidth = 0
		let itemsPerScreen = 3
		let currentIndex = 0
		const totalItems = items.length

		// Create dots
		const totalSlides = Math.max(1, Math.ceil((totalItems - itemsPerScreen + 1) / 1))
		for (let i = 0; i < totalSlides; i++) {
			const dot = document.createElement('div')
			dot.classList.add('dot')
			if (i === 0) dot.classList.add('active')
			dot.addEventListener('click', () => {
				currentIndex = i
				updateCarousel()
			})
			dotsContainer.appendChild(dot)
		}

		// Function to calculate dimensions
		function calculateDimensions() {
			const carousel = track.parentElement
			let containerWidth

			// Use fixed width on large screens, percentage on smaller screens
			if (window.innerWidth >= 1300) {
				containerWidth = 1200 // Fixed width as specified
			} else if (window.innerWidth >= 992) {
				containerWidth = carousel.offsetWidth
			} else {
				containerWidth = carousel.offsetWidth
			}

			// Determine items per screen based on screen width
			if (window.innerWidth >= 992) {
				itemsPerScreen = 3
			} else if (window.innerWidth >= 768) {
				itemsPerScreen = 2
			} else {
				itemsPerScreen = 1
			}

			// Calculate item width - accounting for margins
			itemWidth = containerWidth / itemsPerScreen

			// Set width for each item (subtract margins)
			const actualItemWidth = itemWidth - 30 // 15px margin on each side
			items.forEach(item => {
				item.style.flex = `0 0 ${actualItemWidth}px`
				item.style.maxWidth = `${actualItemWidth}px`
			})

			// Update dots based on new itemsPerScreen
			updateDots()

			// Update carousel position
			updateCarousel(true)
		}

		// Function to update dots based on current items per screen
		function updateDots() {
			// Clear existing dots
			dotsContainer.innerHTML = ''

			// Calculate new number of slides
			const maxIndex = Math.max(0, totalItems - itemsPerScreen)
			const totalSlides = maxIndex + 1

			// Create new dots
			for (let i = 0; i < totalSlides; i++) {
				const dot = document.createElement('div')
				dot.classList.add('dot')
				if (i === Math.min(currentIndex, maxIndex)) dot.classList.add('active')
				dot.addEventListener('click', () => {
					currentIndex = i
					updateCarousel()
				})
				dotsContainer.appendChild(dot)
			}
		}

		// Function to update carousel position
		function updateCarousel(skipAnimation) {
			const maxIndex = Math.max(0, totalItems - itemsPerScreen)

			// Keep currentIndex within bounds
			if (currentIndex < 0) {
				currentIndex = 0
			} else if (currentIndex > maxIndex) {
				currentIndex = maxIndex
			}

			const translateX = -currentIndex * itemWidth

			if (skipAnimation) {
				track.style.transition = 'none'
			} else {
				track.style.transition = 'transform 0.5s ease'
			}

			track.style.transform = `translateX(${translateX}px)`

			// Reset transition after transform is complete
			if (skipAnimation) {
				setTimeout(() => {
					track.style.transition = 'transform 0.5s ease'
				}, 10)
			}

			// Update active dot
			document.querySelectorAll('.dot').forEach((dot, i) => {
				dot.classList.toggle('active', i === currentIndex)
			})

			// Update button states
			prevBtn.disabled = currentIndex === 0
			prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1'
			nextBtn.disabled = currentIndex === maxIndex
			nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1'
		}

		// Event listeners for buttons
		prevBtn.addEventListener('click', () => {
			currentIndex--
			updateCarousel()
		})

		nextBtn.addEventListener('click', () => {
			currentIndex++
			updateCarousel()
		})

		// Mouse wheel scrolling
		track.parentElement.addEventListener(
			'wheel',
			e => {
				e.preventDefault()
				if (e.deltaY > 0) {
					// Scroll down = next
					if (currentIndex < totalItems - itemsPerScreen) {
						currentIndex++
						updateCarousel()
					}
				} else {
					// Scroll up = previous
					if (currentIndex > 0) {
						currentIndex--
						updateCarousel()
					}
				}
			},
			{ passive: false }
		)

		// Touch events for mobile
		let touchStartX = 0
		let touchEndX = 0

		track.parentElement.addEventListener('touchstart', e => {
			touchStartX = e.changedTouches[0].screenX
		})

		track.parentElement.addEventListener('touchend', e => {
			touchEndX = e.changedTouches[0].screenX
			handleSwipe()
		})

		function handleSwipe() {
			const swipeThreshold = 50
			if (touchEndX < touchStartX - swipeThreshold) {
				// Swipe left = next
				if (currentIndex < totalItems - itemsPerScreen) {
					currentIndex++
					updateCarousel()
				}
			} else if (touchEndX > touchStartX + swipeThreshold) {
				// Swipe right = previous
				if (currentIndex > 0) {
					currentIndex--
					updateCarousel()
				}
			}
		}

		// Initialize and update on resize
		calculateDimensions()
		window.addEventListener('resize', () => {
			calculateDimensions()
		})
	}

	// Initialize testimonials carousel
	initTestimonialsCarousel()
})
