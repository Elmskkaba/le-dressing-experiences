(function(){
  var sel='.u-card, .detail-grid, .edition-row, .c-card, .gallery .g-item, .gallery-4 .g-item, .ex-mosaic img, .f-grid, .intro-grid, .ex-grid > div, .map-ph, .cta-band, .editorial-intro > *, .section-line-head > *, .fashion-tile, .signature-panel > *, .founder-image-wrap, .founder-editorial-copy > *, .closing-editorial-inner > *, .uv4-statement > *, .uv4-chapter-head > *, .uv4-mode-main, .uv4-mode-copy, .uv4-mode-detail, .uv4-experience-copy, .uv4-event-landscape, .uv4-event-portrait, .uv4-image-head > *, .uv4-image-main, .uv4-image-secondary, .uv4-image-note, .uv4-hospitality-copy > *, .uv4-hospitality-visual, .uv4-manifesto-inner > *, .ex5-statement > *, .ex5-story-head > *, .ex5-scene, .ex5-details-head > *, .ex5-detail-strip figure, .ex5-community-copy > *, .ex5-community-main, .ex5-community-secondary, .ex5-archive-head > *, .ex5-edition, .ex5-next-inner > *, .fv6-manifesto-grid > *, .fv6-section-head > *, .fv6-time-row, .fv6-method-media, .fv6-method-copy > *, .fv6-pillars-head > *, .fv6-pillar, .fv6-profile-heading > *, .fv6-profile-info > *, .fv6-closing-inner > *, .cv7-intro-grid > *, .cv7-section-head > *, .cv7-service, .cv7-request-aside > *, .cv7-form, .cv7-note-inner > *';
  var targets=document.querySelectorAll(sel);
  targets.forEach(function(el){el.classList.add('reveal-init');});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target);}});},{threshold:.10,rootMargin:'0px 0px -32px 0px'});
    targets.forEach(function(el){io.observe(el);});
  }else{targets.forEach(function(el){el.classList.add('is-visible');});}

  var header=document.querySelector('header');
  function setHeader(){if(header)header.classList.toggle('scrolled',window.scrollY>24);}
  setHeader(); window.addEventListener('scroll',setHeader,{passive:true});

  var hamburger=document.querySelector('.hamburger');
  var mobileMenu=document.querySelector('.mobile-menu');
  var closeBtn=document.querySelector('.mobile-menu-close');
  var menuLastFocus=null;
  function toggleMenu(open){
    if(!mobileMenu)return;
    if(open)menuLastFocus=document.activeElement;
    mobileMenu.classList.toggle('open',open);
    mobileMenu.setAttribute('aria-hidden',open?'false':'true');
    if(hamburger)hamburger.setAttribute('aria-expanded',open?'true':'false');
    document.body.style.overflow=open?'hidden':'';
    if(open && closeBtn)window.setTimeout(function(){closeBtn.focus();},0);
    if(!open && menuLastFocus && typeof menuLastFocus.focus==='function')menuLastFocus.focus();
  }
  if(hamburger){hamburger.setAttribute('aria-expanded','false');hamburger.addEventListener('click',function(){toggleMenu(true);});}
  if(closeBtn){closeBtn.addEventListener('click',function(){toggleMenu(false);});}
  document.querySelectorAll('.mobile-menu a').forEach(function(a){a.addEventListener('click',function(){toggleMenu(false);});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')toggleMenu(false);});



  // Univers V4: highlight the current chapter in the sticky index.
  var universeLinks=document.querySelectorAll('[data-universe-link]');
  var universeSections=document.querySelectorAll('[data-universe-section]');
  if(universeLinks.length && universeSections.length && 'IntersectionObserver' in window){
    var sectionObserver=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var key=entry.target.getAttribute('data-universe-section');
          universeLinks.forEach(function(link){
            link.classList.toggle('is-active',link.getAttribute('data-universe-link')===key);
          });
        }
      });
    },{threshold:.25,rootMargin:'-20% 0px -55% 0px'});
    universeSections.forEach(function(section){sectionObserver.observe(section);});
  }

  var contactForm=document.getElementById('contact-form');
  var contactStatus=document.getElementById('contact-form-status');
  var serviceSelect=document.getElementById('rdv-service');
  var serviceButtons=document.querySelectorAll('[data-contact-service]');

  function setSelectedService(value){
    if(serviceSelect)serviceSelect.value=value;
    serviceButtons.forEach(function(btn){btn.classList.toggle('is-selected',btn.getAttribute('data-contact-service')===value);});
  }
  serviceButtons.forEach(function(btn){
    btn.addEventListener('click',function(){
      setSelectedService(btn.getAttribute('data-contact-service'));
      var target=document.getElementById('demande');
      if(target)target.scrollIntoView({behavior:'smooth',block:'start'});
      window.setTimeout(function(){if(serviceSelect)serviceSelect.focus({preventScroll:true});},500);
    });
  });
  if(serviceSelect){serviceSelect.addEventListener('change',function(){setSelectedService(serviceSelect.value);});}

  function prepareContactEmail(){
    if(!contactForm)return;
    var fields=contactForm.querySelectorAll('[required]');
    var valid=true;
    fields.forEach(function(field){
      var holder=field.closest('.cv7-field');
      var fieldValid=field.checkValidity();
      if(holder)holder.classList.toggle('is-invalid',!fieldValid);
      if(!fieldValid)valid=false;
    });
    if(!valid){
      if(contactStatus)contactStatus.textContent='Merci de compléter les champs obligatoires avant de préparer votre demande.';
      var firstInvalid=contactForm.querySelector(':invalid');
      if(firstInvalid)firstInvalid.focus();
      return;
    }
    var nom=document.getElementById('rdv-nom').value.trim();
    var email=document.getElementById('rdv-email').value.trim();
    var service=document.getElementById('rdv-service').value.trim();
    var sujet=document.getElementById('rdv-sujet').value.trim() || ('Demande — '+service);
    var message=document.getElementById('rdv-message').value.trim();
    var body='Bonjour Le Dressing Expériences,\n\nNom : '+nom+'\nEmail : '+email+'\nUnivers : '+service+'\n\n'+message+'\n\nBien cordialement,\n'+nom;
    if(contactStatus)contactStatus.textContent='Votre application email va s’ouvrir avec la demande préremplie.';
    window.location.href='mailto:ledressinggcky@gmail.com?subject='+encodeURIComponent(sujet)+'&body='+encodeURIComponent(body);
  }
  if(contactForm){
    contactForm.addEventListener('submit',function(e){e.preventDefault();prepareContactEmail();});
    contactForm.addEventListener('input',function(e){
      var holder=e.target.closest('.cv7-field');
      if(holder)holder.classList.remove('is-invalid');
      if(contactStatus)contactStatus.textContent='';
    });
  }
  window.envoyerDemande=prepareContactEmail;
})();