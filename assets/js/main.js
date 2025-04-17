document.addEventListener('DOMContentLoaded', function () {
	// Hamburger menu
	const hamburger = document.querySelector('.hamburger')
	const navMenu = document.querySelector('.nav-menu')
	const navLinks = document.querySelectorAll('.nav-links li a')

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

	// Add this to your existing CSS to prevent scrolling when menu is open
	const menuStyle = document.createElement('style')
	menuStyle.innerHTML = `
		body.menu-open {
			overflow: hidden;
		}
	`
	document.head.appendChild(menuStyle)

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
	const scrollToTopButton = document.getElementById('scrollToTop')

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
	const hero = document.querySelector('.hero')
	console.log('Hero element found:', hero) // Diagnostic log

	function createBalloon() {
		if (!hero) {
			console.log('Hero element not found, cannot create balloons')
			return
		}

		console.log('Creating balloon...') // Diagnostic log

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

		console.log('Balloon created and added to hero:', balloon) // Diagnostic log

		// Remove the balloon after animation to avoid memory issues
		setTimeout(() => {
			if (hero.contains(balloon)) {
				hero.removeChild(balloon)
				console.log('Balloon removed')
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
	console.log('Balloon styles added to document head') // Diagnostic log

	// Create balloons at random intervals
	if (hero) {
		console.log('Starting balloon creation') // Diagnostic log

		// Create a few balloons immediately
		for (let i = 0; i < 3; i++) {
			setTimeout(() => createBalloon(), i * 700)
		}

		// Continue creating balloons at random intervals
		setInterval(createBalloon, 3000 + Math.random() * 2000)
	} else {
		console.error('Hero element not found, balloon animation disabled')
	}
})
