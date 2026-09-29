document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     CONFIG / STATE
  ========================= */

  const isLandingPage =
      document.body.dataset.page === "lander";

  const activeNav =
      document.body.dataset.activeNav;

  const navRight = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger');
  const navCenter = document.querySelector('#desktop-nav');

  const links = navCenter?.querySelectorAll('.nav-link') || [];
  const indicator = navCenter?.querySelector('.nav-indicator');

  const sections = document.querySelectorAll(
    '#features,#pricing,#demo,#download,#customers,#universe'
  );

  let isAutoScrolling = false;
  let scrollTimer = null;

  /* =========================
     LOGO ANIMATION
  ========================= */
  const logo = document.querySelector('.nav-logo');

  let currentTheme = "blue";

  const getLogoNormal = () => `img/logo_${currentTheme}.png`;
  const getLogoFlash = () => `img/logo_${currentTheme}2.png`;

  if (logo?.dataset.animate === "true") {

    logo.src = getLogoNormal();

    const flashLogo = () => {

      logo.src = getLogoFlash();

      setTimeout(() => {

        logo.src = getLogoNormal();

        const nextBlink = 3500 + Math.random() * 2500;

        setTimeout(flashLogo, nextBlink);

      }, 120);

    };

    setTimeout(flashLogo, 100);

  }

  /* =========================
     MOBILE MENU TOGGLE
  ========================= */
  const closeMenu = () => {
    navRight?.classList.remove('active');
  };

  hamburger?.addEventListener('click', (e) => {
    e.stopPropagation();
    navRight?.classList.toggle('active');
  });

  // ONE unified click handler (NO clone, NO duplicate listeners)
  navRight?.addEventListener('click', (e) => {

    const link = e.target.closest('.nav-link');

    if (!link) return;


    e.stopPropagation();


    closeMenu();


    if (isLandingPage) {

        e.preventDefault();

        scrollToCategory(link.dataset.section);

    }

  });

  document.addEventListener('click', (e) => {
    const insideMenu = navRight?.contains(e.target);
    const insideHamburger = hamburger?.contains(e.target);

    if (!insideMenu && !insideHamburger) {
      closeMenu();
    }
  });

  /* =========================
     INDICATOR (desktop only)
  ========================= */
  function moveIndicator(link) {
    if (!indicator || !link || !navCenter) return;

    indicator.style.left = `${link.offsetLeft}px`;
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.opacity = '1';
  }

  function setActiveLink(link) {
    links.forEach(l => l.classList.remove('active'));

    if (!link) {
      indicator.style.opacity = '0';
      return;
    }

    link.classList.add('active');
    moveIndicator(link);
  }

  function setMobileActive(id) {
    document.querySelectorAll('#mobile-menu .nav-link')
      .forEach(l => l.classList.remove('active'));

    if (!id) return;

    const active = document.querySelector(
      `#mobile-menu .nav-link[data-section="${id}"]`
    );

    active?.classList.add('active');
  }

  /* =========================
     SCROLL TO SECTION
  ========================= */
  window.scrollToCategory = function (id) {

    if (!isLandingPage) return false;

    const target = document.getElementById(id);

    if (!target) return false;

    const top = target.offsetTop - 30;

    const desktopLink = navCenter?.querySelector(
      `.nav-link[data-section="${id}"]`
    );

    isAutoScrolling = true;

    setActiveLink(desktopLink);
    setMobileActive(id);

    window.scrollTo({
      top,
      behavior: 'smooth'
    });

    // safety reset (avoid stuck state)
    setTimeout(() => {
      isAutoScrolling = false;
    }, 1200);
  };

  /* =========================
     ACTIVE SECTION TRACKING
  ========================= */
  function updateActiveSection() {
    if (isAutoScrolling) return;

    const navbar = document.querySelector('.navbar');
    const scrollTop = window.scrollY + navbar.offsetHeight + 20;

    const first = document.getElementById('features');
    if (!first) return;

    if (scrollTop < first.offsetTop) {
      setActiveLink(null);
      setMobileActive(null);
      return;
    }

    let closest = first.id;
    sections.forEach(sec => {
        if (scrollTop >= sec.offsetTop) {
            closest = sec.id;
        }
    });

    const desktopLink = navCenter?.querySelector(
      `.nav-link[data-section="${closest}"]`
    );

    setActiveLink(desktopLink);
    setMobileActive(closest);
  }

  if (isLandingPage) {
      window.addEventListener('scroll', () => {
        if (isAutoScrolling) return;

        if (scrollTimer) clearTimeout(scrollTimer);

        scrollTimer = setTimeout(() => {
          updateActiveSection();
        }, 80);
    });
}

    window.addEventListener('resize', () => {

    if (isLandingPage) {

        updateActiveSection();

    }


    if (activeNav) {

        const activeLink = navCenter?.querySelector(
            `.nav-link[data-section="${activeNav}"]`
        );

        if (activeLink) {

            moveIndicator(activeLink);

        }

    }

  });

  /* =========================
     RESIZE OBSERVER
  ========================= */
  if (navCenter) {
    new ResizeObserver(() => {
        const active = navCenter.querySelector('.nav-link.active');
        if (active) moveIndicator(active);
    }).observe(navCenter);
}

  /* =========================
   DASH DEFAULT ACTIVE
  ========================= */

  if (activeNav) {

      const activeLink = navCenter?.querySelector(
        `.nav-link[data-section="${activeNav}"]`
      );

      setActiveLink(activeLink);
      setMobileActive(activeNav);
}

  /* =========================
     LANGUAGE TOGGLE
  ========================= */
  const langWrapper = document.getElementById('lang-wrapper');
  const langToggle = document.getElementById('lang-toggle');

  langToggle?.addEventListener('click', e => {
    e.stopPropagation();
    langWrapper?.classList.toggle('force-show');
  });

  document.addEventListener('click', e => {
    if (!langWrapper?.contains(e.target)) {
      langWrapper?.classList.remove('force-show');
    }
  });

  });

/* =========================
   BILLING TOGGLE
========================= */
document.addEventListener("DOMContentLoaded",()=>{

  function updateBilling(cycle, box){

    /* Monthly Price */
    box.querySelectorAll(".monthly").forEach(el=>{

      let value = el.dataset[cycle];

      if(!value){
        return;
      }

      if(value.includes(".")){

        let parts = value.split(".");

        el.innerHTML =
        parts[0] +
        "<span class=\"decimal\">." +
        parts[1] +
        "</span>";

      }else{

        el.innerHTML = value;

      }

    });

    /* Yearly Price */
    box.querySelectorAll(".yearly[data-monthly]").forEach(el=>{

      let value = el.dataset[cycle];

      if(!value){
        return;
      }

      if(value.includes(".")){

        let parts = value.split(".");

        el.innerHTML =
        parts[0] +
        "<span class=\"decimal\">." +
        parts[1] +
        "</span>";

      }else{

        el.innerHTML = value;

      }

    });

    /* Period */
    box.querySelectorAll(".period").forEach(el=>{

      let value = el.dataset[cycle];

      if(!value){
        return;
      }

      el.innerHTML = value;

    });

    /* Renews */
    box.querySelectorAll(".renews").forEach(el=>{

      let value = el.dataset[cycle];

      if(!value){
        return;
      }

      el.innerHTML = value;

    });


    /* Note */
    box.querySelectorAll(".note").forEach(el=>{

      let value = el.dataset[cycle];

      if(!value){
        return;
      }

      el.innerHTML = value;

    });


    /* Save */
    box.querySelectorAll(".save").forEach(el=>{

      let value = el.dataset[cycle];

      if(!value){
        return;
      }

      el.innerHTML = value;

    });

  }


  document.querySelectorAll(".pricing-box").forEach(box=>{

    let buttons = box.querySelectorAll(".billing-toggle button");

    buttons.forEach(btn=>{

      btn.onclick=function(){

        buttons.forEach(b=>{
          b.classList.remove("active");
        });

        this.classList.add("active");

        updateBilling(
          this.dataset.cycle,
          box
        );

      };

    });


    let activeButton =
    box.querySelector(".billing-toggle button.active");

    if(activeButton){

      updateBilling(
        activeButton.dataset.cycle,
        box
      );

    }

  });

});


/* =========================
   AVATAR MENU
========================= */

document.addEventListener('DOMContentLoaded', () => {

  const avatarButton = document.getElementById('avatar-button');
  const avatarMenu = document.getElementById('avatar-menu');

  if (!avatarButton || !avatarMenu) return;

  const availabilityRow =
    avatarMenu.querySelector('.availability-row');

  const availabilityButton =
    avatarMenu.querySelector('.availability-button');

  const availabilityMenu =
    avatarMenu.querySelector('.availability-menu');

  const profileStatus =
    avatarMenu.querySelector('.profile-status');

  const avatarStatus =
    document.querySelector('.avatar-status');

  /* Toggle menu */

  avatarButton.addEventListener('click', (e) => {
    e.stopPropagation();

    avatarMenu.classList.toggle('active');
    availabilityRow.classList.remove('open');

  });

  /* Close when clicking outside */

  document.addEventListener('click', (e) => {

    if (
      !availabilityMenu.contains(e.target) &&
      !availabilityButton.contains(e.target)
    ) {
      availabilityRow.classList.remove('open');
    }

    if (
      !avatarMenu.contains(e.target) &&
      !avatarButton.contains(e.target)
    ) {
      avatarMenu.classList.remove('active');
      availabilityRow.classList.remove('open');
    }

  });


  /* =========================
     AVAILABILITY
  ========================= */

  if (availabilityButton && availabilityMenu) {

    availabilityButton.addEventListener('click', (e) => {

      e.stopPropagation();

      availabilityRow.classList.toggle('open');

    });


    availabilityMenu
      .querySelectorAll('button')
      .forEach(button => {

        button.addEventListener('click', () => {

          const status =
            button.dataset.status;

          const text =
            button.textContent.trim();

          const indicator =
            button.querySelector('.availability-indicator');

          const currentIndicator =
            availabilityButton.querySelector(
              '.availability-indicator'
            );

          availabilityButton
            .querySelector('span:nth-child(2)')
            .textContent =
              text;

          currentIndicator.className =
            'availability-indicator ' +
            indicator.classList[1];

          profileStatus.className =
            'profile-status ' +
            indicator.classList[1];

          avatarStatus.className =
            'avatar-status ' +
            indicator.classList[1];

          availabilityRow.classList.remove('open');

        });

      });

  }


  /* =========================
     COPY EMAIL
  ========================= */

  const emailButton =
    avatarMenu.querySelector('.profile-email');

  if (emailButton) {

    emailButton.addEventListener('click', async () => {

      const email =
        emailButton.textContent.trim();

      try {

        await navigator.clipboard.writeText(email);

        const original =
          emailButton.textContent;

        emailButton.textContent =
          'Copied';

        setTimeout(() => {
          emailButton.textContent = original;
        }, 1200);

      } catch (error) {

        console.error(
          'Failed to copy email:',
          error
        );

      }

    });

  }

});