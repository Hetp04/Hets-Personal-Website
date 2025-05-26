const initTerminal = () => {
  const preloader = document.getElementById('preloader');
  const terminalMenu = document.querySelector('.terminal-menu');
  const terminalInput = document.querySelector('.terminal-input');
  const closeButton = document.querySelector('.terminal-button.red');
  
  setTimeout(showMenu, 1300);
  
  closeButton.addEventListener('click', () => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
      window.location.hash = '#home';
    }, 300);
  });
  
  terminalInput.addEventListener('keypress', handleCommand);
  
  terminalInput.addEventListener('blur', () => {
    setTimeout(() => terminalInput.focus(), 10);
  });
  
  function showMenu() {
    terminalMenu.classList.remove('hidden');
    setTimeout(() => {
      terminalMenu.classList.add('show');
      terminalInput.focus();
    }, 100);
  }
  
  function handleCommand(e) {
    if (e.key !== 'Enter') return;
    
    const command = terminalInput.value.trim();
    terminalInput.value = '';
    
    writeToTerminal(command, 'command');
        processCommand(command);
  }
  
  function processCommand(command) {
    const actions = {
      '1': () => goToSection('home'),
      '2': () => goToSection('portfolio'),
      '3': () => goToSection('resume'),
      '4': () => goToSection('contact'),
      
    };
    
    const action = actions[command];
    if (action) {
      action();
    } else {
      writeToTerminal('Invalid option. Please select 1-4.', 'response');
    }
  }
  
  function goToSection(section) {
    writeToTerminal(`Navigating to ${section}...`, 'response');
    
    let fadeDelay = setTimeout(fadeAndNavigate, 800);
    
    function fadeAndNavigate() {
      preloader.classList.add('fade-out');
      
      setTimeout(() => {
        preloader.style.display = 'none';
        window.location.hash = '#' + section;
      }, 300);
    }
  }
  
  function writeToTerminal(text, type) {
    let newLine = document.createElement('p');
    
    if (type === 'command') {
      newLine.className = 'terminal-line command dynamic';
    } else {
      newLine.className = 'terminal-line response dynamic';
    }
    
    newLine.textContent = text;
    
    let inputArea = terminalInput.parentElement;
    inputArea.parentElement.insertBefore(newLine, inputArea);
    newLine.scrollIntoView();
    terminalInput.focus();
  }
};

document.addEventListener('DOMContentLoaded', initTerminal);

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.navbar-link');
  const articles = document.querySelectorAll('article');
  const pathText = document.querySelector('.path-text');
  const prevBtn = document.querySelector('.nav-btn:first-child');
  const nextBtn = document.querySelector('.nav-btn:last-child');

  const pages = ['home', 'resume', 'portfolio', 'contact'];
  let currentPage = 'home';

  prevBtn.addEventListener('click', () => {
    const currentIndex = pages.indexOf(currentPage);
    
    if (currentIndex > 0) {
      const prevPage = pages[currentIndex - 1];
      window.location.hash = '#' + prevPage;
    }
  });

  nextBtn.addEventListener('click', () => {
    const currentIndex = pages.indexOf(currentPage);
    
    if (currentIndex < pages.length - 1) {
      const nextPage = pages[currentIndex + 1];
      window.location.hash = '#' + nextPage; 
    }
  });

  const updateActiveSection = (hash) => {
    navLinks.forEach(link => link.classList.remove('active'));
    articles.forEach(article => {
      article.classList.remove('active');
      article.style.display = 'none';
    });

    const currentLink = document.querySelector(`.navbar-link[href="${hash}"]`);
    const currentArticle = document.querySelector(`article${hash}`);
    currentPage = hash.replace('#', '');

    if (currentLink) {
      currentLink.classList.add('active');
      const pageName = currentLink.textContent.trim();
      pathText.textContent = `~/Portfolio/${pageName}`;
    }
    
    if (currentArticle) {
      currentArticle.classList.add('active');
      currentArticle.style.display = 'block';
      
      if (currentPage === 'resume') {
        currentArticle.style.display = 'flex';
      }
    }
  };

  if (window.location.hash) {
    updateActiveSection(window.location.hash);
  } else {
    updateActiveSection('#home');
  }

  window.addEventListener('hashchange', () => {
    updateActiveSection(window.location.hash);
  });

  const statBoxes = document.querySelectorAll('.stat-box');

  statBoxes.forEach(box => {
    const arrow = document.createElement('span');
    arrow.innerHTML = '▲'; 
    arrow.className = 'dropdown-arrow';
    box.querySelector('.stat-box-header').appendChild(arrow);

    let expanded = true;
    const isThirdBox = box.classList.contains('stat-box:nth-child(3)');
    box.style.height = isThirdBox ? '400px' : '320px';

    arrow.onclick = (e) => {
      e.stopPropagation();
      expanded = !expanded;
      
      arrow.innerHTML = expanded ? '▲' : '▼';
      box.style.height = expanded ? 
        (isThirdBox ? '400px' : '320px') : 
        '54px';
    };
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const options = {
    strings: ['Software Developer', 'Researcher', 'Photographer'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    loop: true,
    cursorChar: '|',
    showCursor: true,
    smartBackspace: true
  };

  const typed = new Typed('.typing', options);
});

const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

sidebarBtn.addEventListener('click', function() {
  sidebar.classList.toggle('active');
});

window.onload = function() {
  const animatedContainer = document.querySelector('.animated-container');
  animatedContainer.style.visibility = 'visible';
};

document.addEventListener('DOMContentLoaded', function() {
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const details = this.closest('.work-timeline-item').querySelector('.work-details');
      const isHidden = details.classList.contains('hidden');
      
      this.classList.toggle('active');
      
      if (isHidden) {
        details.classList.remove('hidden');
        setTimeout(() => details.classList.add('show'), 10);
      } else {
        details.classList.remove('show');
        setTimeout(() => details.classList.add('hidden'), 300);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  function expandStatBoxes() {
    const statBoxes = document.querySelectorAll('.stat-box');
    statBoxes.forEach(box => {
      box.style.height = box.classList.contains('stat-box:nth-child(3)') ? '400px' : '320px';
    });
  }

  const homeLink = document.querySelector('a[href="#home"]');
  const homePage = document.querySelector('.home');
  
  if (homePage.classList.contains('active')) {
    expandStatBoxes();
  }

  homeLink.addEventListener('click', () => {
    setTimeout(expandStatBoxes, 100); 
  });
});

document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const button = e.target.querySelector('.form-btn');
    const defaultText = button.innerHTML;
    
    button.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
    button.disabled = true;

    try {
        const response = await fetch(e.target.action, {
            method: 'POST',
            body: new FormData(e.target)
        });

        if (response.ok) {
            button.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon><span>Sent!</span>';
            e.target.reset();
        } else {
            button.innerHTML = '<ion-icon name="close-outline"></ion-icon><span>Failed</span>';
        }
    } catch {
        button.innerHTML = '<ion-icon name="close-outline"></ion-icon><span>Failed</span>';
    }

    setTimeout(() => {
        button.innerHTML = defaultText;
        button.disabled = false;
    }, 2000);
});
