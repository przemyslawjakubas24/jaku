document.addEventListener('DOMContentLoaded', function () {
	// Zapisz często używane elementy DOM jako stałe
	const header = document.querySelector('header')
	const hamburger = document.querySelector('.hamburger')
	const navMenu = document.querySelector('.nav-menu')
	const navLinks = document.querySelectorAll('.nav-links li a')
	const hero = document.querySelector('.hero')
	const scrollToTopButton = document.getElementById('scrollToTop')
	const logo = document.querySelector('.logo')
	const isMobile = window.innerWidth <= 768

	if (hamburger) {
		hamburger.addEventListener('click', () => {
			// Toggle menu
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

			// Create FormData object
			const formData = new FormData(this)
			const formDataObj = {}

			// Convert FormData to object
			for (let [key, value] of formData.entries()) {
				formDataObj[key] = value
			}

			// Walidacja danych
			let isValid = true
			const nameInput = this.querySelector('input[name="name"]')
			const emailInput = this.querySelector('input[name="email"]')
			const messageInput = this.querySelector('textarea[name="message"]')

			// Prosta walidacja email
			function validateEmail(email) {
				const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
				return re.test(String(email).toLowerCase())
			}

			if (nameInput.value.trim() === '') {
				isValid = false
				nameInput.classList.add('error')
			} else {
				nameInput.classList.remove('error')
			}

			if (!validateEmail(emailInput.value)) {
				isValid = false
				emailInput.classList.add('error')
			} else {
				emailInput.classList.remove('error')
			}

			if (messageInput.value.trim() === '') {
				isValid = false
				messageInput.classList.add('error')
			} else {
				messageInput.classList.remove('error')
			}

			if (!isValid) {
				// Pokaż komunikat o błędzie
				alert('Proszę wypełnić poprawnie wszystkie wymagane pola formularza.')
				return
			}

			// Tutaj byłoby wysłanie formularza - przykład z użyciem fetch
			// fetch('https://example.com/submit-form', {
			//   method: 'POST',
			//   headers: {
			//     'Content-Type': 'application/json',
			//   },
			//   body: JSON.stringify(formDataObj),
			// })
			// .then(response => response.json())
			// .then(data => {
			//   console.log('Success:', data);
			//   // Pokazanie komunikatu sukcesu
			//   this.reset();
			//   alert('Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.');
			// })
			// .catch((error) => {
			//   console.error('Error:', error);
			//   alert('Wystąpił błąd podczas wysyłania formularza. Prosimy spróbować później.');
			// });

			// Tymczasowo symulujemy sukces
			console.log('Form data:', formDataObj)
			this.reset()
			alert('Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.')
		})
	}

	// Obsługa przycisku Scroll to Top
	// Pokazuje przycisk, gdy użytkownik przewinie stronę w dół
	window.addEventListener('scroll', () => {
		if (window.pageYOffset > 300) {
			scrollToTopButton.classList.add('visible')
		} else {
			scrollToTopButton.classList.remove('visible')
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
		card.classList.add('fade-in')
		cardObserver.observe(card)
	})

	// Interactive portfolio gallery
	const portfolioItems = document.querySelectorAll('.portfolio-item')
	const portfolioData = []

	// Lightbox dla portfolio
	const lightbox = document.getElementById('portfolioLightbox')
	const lightboxImg = lightbox.querySelector('.lightbox-image')
	const lightboxTitle = lightbox.querySelector('.lightbox-title')
	const lightboxDesc = lightbox.querySelector('.lightbox-description')
	const lightboxClose = lightbox.querySelector('.lightbox-close')
	const lightboxNext = lightbox.querySelector('.lightbox-next')
	const lightboxPrev = lightbox.querySelector('.lightbox-prev')

	let currentIndex = 0

	// Zbierz dane o wszystkich elementach portfolio
	portfolioItems.forEach((item, index) => {
		const img = item.querySelector('img')
		const overlay = item.querySelector('.portfolio-overlay')
		const title = overlay.querySelector('h3')?.textContent || img.alt
		const description = overlay.querySelector('p')?.textContent || ''

		portfolioData.push({
			src: img.src,
			alt: img.alt,
			title: title,
			description: description,
			index: index,
		})

		// Dodaj obsługę kliknięcia
		item.addEventListener('click', function () {
			openLightbox(index)
		})
	})

	// Funkcja otwierająca lightbox
	function openLightbox(index) {
		if (index >= 0 && index < portfolioData.length) {
			currentIndex = index
			updateLightboxContent()
			lightbox.classList.add('active')
			document.body.classList.add('lightbox-open')
		}
	}

	// Funkcja aktualizująca zawartość lightboxa
	function updateLightboxContent() {
		const item = portfolioData[currentIndex]
		lightboxImg.src = item.src
		lightboxImg.alt = item.alt
		lightboxTitle.textContent = item.title
		lightboxDesc.textContent = item.description
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
		if (touchEndX < touchStartX - 50) {
			nextImage() // przesunięcie w lewo, pokaż następny
		}
		if (touchEndX > touchStartX + 50) {
			prevImage() // przesunięcie w prawo, pokaż poprzedni
		}
	}

	// Sticky header i zmiana rozmiaru logo podczas przewijania
	window.addEventListener('scroll', function () {
		if (window.scrollY > 100) {
			header.classList.add('sticky')
		} else {
			header.classList.remove('sticky')
		}
	})

	// Funkcja do tworzenia balonów, ograniczona na urządzeniach mobilnych
	function createBalloon() {
		if (!hero || isMobile) return

		// Limit liczby balonów
		const balloons = document.querySelectorAll('.hero-balloon')
		if (balloons.length >= 10) return

		const colors = ['#ff69b4', '#8a2be2', '#00bfff', '#ff6347', '#32cd32']
		const balloon = document.createElement('div')
		const size = Math.random() * 30 + 20
		const color = colors[Math.floor(Math.random() * colors.length)]
		const animationDuration = Math.random() * 10 + 15
		const floatDelay = Math.random() * 2

		balloon.classList.add('hero-balloon')
		balloon.style.position = 'absolute'
		balloon.style.bottom = '-50px'
		balloon.style.left = Math.random() * 90 + 5 + '%'
		balloon.style.width = size + 'px'
		balloon.style.height = size * 1.2 + 'px'
		balloon.style.borderRadius = '50% 50% 50% 50% / 40% 40% 60% 60%'
		balloon.style.background = color
		balloon.style.opacity = '0.7'
		balloon.style.zIndex = '10'

		// Add shadow for 3D effect
		balloon.style.boxShadow = `inset -2px -2px 4px rgba(0,0,0,0.2), inset 2px 2px 4px rgba(255,255,255,0.2)`

		// Add animation
		balloon.style.animation = `
            float-up ${animationDuration}s ease-in-out ${floatDelay}s forwards,
            sway-balloon ${3 + Math.random() * 2}s ease-in-out infinite alternate,
            wobble-balloon ${2 + Math.random() * 2}s ease-in-out infinite
        `

		// Create string
		const string = document.createElement('div')
		string.classList.add('balloon-string')
		string.style.position = 'absolute'
		string.style.width = '1px'
		string.style.height = size * 1.5 + 'px'
		string.style.background = 'rgba(255,255,255,0.7)'
		string.style.top = '100%'
		string.style.left = '50%'
		string.style.transformOrigin = 'top'
		string.style.animation = `string-wave ${2 + Math.random()}s ease-in-out infinite alternate`

		balloon.appendChild(string)
		hero.appendChild(balloon)

		// Remove balloon after animation completes
		setTimeout(() => {
			if (balloon.parentNode === hero) {
				hero.removeChild(balloon)
			}
		}, (animationDuration + floatDelay) * 1000)
	}

	// Create balloons at random intervals (tylko na desktopach)
	if (hero && !isMobile) {
		// Początkowe balony
		for (let i = 0; i < 3; i++) {
			setTimeout(createBalloon, i * 1500)
		}

		// Kontynuuj tworzenie balonów z rzadszym interwałem
		setInterval(createBalloon, 3000 + Math.random() * 2000)
	}
})
