document.addEventListener('DOMContentLoaded', function () {
	// Hamburger menu
	const hamburger = document.querySelector('.hamburger')
	const navLinks = document.querySelector('.nav-links')

	hamburger?.addEventListener('click', () => {
		hamburger.classList.toggle('active')
		navLinks.classList.toggle('active')
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

	// Scroll to top button
	const scrollBtn = document.createElement('button')
	scrollBtn.innerHTML = '↑'
	scrollBtn.className = 'scroll-top'
	document.body.appendChild(scrollBtn)

	window.addEventListener('scroll', () => {
		if (window.pageYOffset > 100) {
			scrollBtn.classList.add('visible')
		} else {
			scrollBtn.classList.remove('visible')
		}
	})

	scrollBtn.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	})

	// Funkcja dla przycisku Scroll to Top
	const scrollBtnNew = document.getElementById('scrollToTop')

	// Pokaż/ukryj przycisk w zależności od pozycji przewijania
	window.addEventListener('scroll', function () {
		if (window.pageYOffset > 300) {
			scrollBtnNew.classList.add('show')
		} else {
			scrollBtnNew.classList.remove('show')
		}
	})

	// Przewiń do góry po kliknięciu przycisku
	scrollBtnNew.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	})

	// Sticky header
	const header = document.querySelector('header')
	const hero = document.querySelector('.hero')

	window.addEventListener('scroll', function () {
		if (window.scrollY > 50) {
			header.style.padding = '10px 5%'
			header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)'
		} else {
			header.style.padding = '20px 5%'
			header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)'
		}
	})

	// Animation for service cards
	const serviceCards = document.querySelectorAll('.service-card')

	const cardObserverOptions = {
		threshold: 0.5,
		rootMargin: '0px',
	}

	const cardObserver = new IntersectionObserver(function (entries, observer) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = 1
				entry.target.style.transform = 'translateY(0)'
			}
		})
	}, cardObserverOptions)

	serviceCards.forEach(card => {
		card.style.opacity = 0
		card.style.transform = 'translateY(20px)'
		card.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
		cardObserver.observe(card)
	})

	// Interactive portfolio gallery - łączymy obie implementacje
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
		const colors = ['#ff69b4', '#8a2be2', '#00bfff', '#ff6347', '#32cd32']
		const balloon = document.createElement('div')
		const size = Math.random() * 30 + 20
		const color = colors[Math.floor(Math.random() * colors.length)]

		balloon.style.position = 'absolute'
		balloon.style.bottom = '-50px'
		balloon.style.left = Math.random() * 100 + '%'
		balloon.style.width = size + 'px'
		balloon.style.height = size * 1.2 + 'px'
		balloon.style.borderRadius = '50% 50% 50% 50% / 40% 40% 60% 60%'
		balloon.style.background = color
		balloon.style.opacity = '0.7'
		balloon.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`

		const string = document.createElement('div')
		string.style.position = 'absolute'
		string.style.width = '1px'
		string.style.height = '40px'
		string.style.background = '#fff'
		string.style.top = '100%'
		string.style.left = '50%'

		balloon.appendChild(string)
		hero.appendChild(balloon)

		// Remove the balloon after animation to avoid memory issues
		setTimeout(() => {
			hero.removeChild(balloon)
		}, 20000)
	}

	// Create a style for the balloon animation
	const style = document.createElement('style')
	style.innerHTML = `
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100vh) rotate(20deg);
                opacity: 0;
            }
        }
    `
	document.head.appendChild(style)

	// Create balloons at random intervals
	setInterval(createBalloon, 2000)
})
