document.addEventListener('DOMContentLoaded', function () {
   const header = document.querySelector('.header');
   const headerHeight = header.offsetHeight;
   const sections = document.querySelectorAll('section');
   const menuLinks = document.querySelectorAll('.main-menu a');
   const footerText = document.querySelector('header h2');

   /* Animation header */
   window.addEventListener('scroll', function () {
      const scroll = window.scrollY || document.documentElement.scrollTop;

      if (scroll > headerHeight) {
         header.classList.add('header-sticky');
         footerText.textContent = 'Header is sticky';
         footerText.style.color = '#0f0';
      } else {
         header.classList.remove('header-sticky');
         footerText.textContent = 'Header is not sticky';
         footerText.style.color = '#f00';
      }
   });

   /* Aktive link */
   function setActiveLink() {
      const scrollPosition =
         window.scrollY || document.documentElement.scrollTop;

      sections.forEach(section => {
         const sectionTop = section.offsetTop;
         const sectionHeight = section.offsetHeight;
         const isSectionInView =
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight;

         if (isSectionInView) {
            menuLinks.forEach(link => link.classList.remove('active-link'));

            const correspondingLink = document.querySelector(
               `.main-menu a[href="#${section.id}"]`
            );
            if (correspondingLink) {
               correspondingLink.classList.add('active-link');
            }
         }
      });
   }

   window.addEventListener('scroll', setActiveLink);
   setActiveLink();

   /* Scroll to section */
   function scrollToSection(event) {
      event.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
         const scrollTo = targetSection.offsetTop;

         window.scroll({
            top: scrollTo,
            behavior: 'smooth',
         });
      }
   }

   window.addEventListener('scroll', setActiveLink);
   setActiveLink();

   menuLinks.forEach(link => {
      link.addEventListener('click', scrollToSection);
   });
});
