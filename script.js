document.addEventListener("DOMContentLoaded", () => {
  const path = document.getElementById("garland-path");
  const bulbs = document.querySelectorAll(".bulb");
  const pathLength = path.getTotalLength();

  bulbs.forEach((bulb, index) => {
    const position = (pathLength / (bulbs.length - 1)) * index;
    const { x, y } = path.getPointAtLength(position);
    bulb.setAttribute("cx", x);
    bulb.setAttribute("cy", y);
  });
});



const quotes = [
"«Природа говорить тільки з тими, хто слухає»",  
"«Наша планета — це не ресурс, це наш дім»",  
"«Земля — наш дім, її збереження — наша відповідальність»",  
"«Зберігаючи природу, ми зберігаємо себе»",  
"«Чиста природа — це здорове майбутнє»",  
"«Кожна крапля води має значення»",  
"«Ліси дихають за нас. Давайте дихати разом!»",  
"«Захист природи — це шлях до гармонії з собою»",  
"«Вода — це життя. Бережіть її!»",  
"«Наші дії сьогодні визначають, якою буде природа завтра»",  
"«Пам’ятайте: наші дії змінюють світ»",  
"«Планета потребує нашої любові та уваги»",  
"«Кожен вчинок на захист природи — це крок до кращого світу»",  
"«Збереження природи — це наша спільна мета»",  
"«Ми — частина природи, і ми маємо її берегти»"
];

document.addEventListener("DOMContentLoaded", () => {
  const quoteBlock = document.createElement("div");
  quoteBlock.classList.add("quote-block");
  quoteBlock.innerHTML = `
    <div class="quote-text fade-in"></div>
    <div class="quote-controls">
      <button class="prev-quote">⬅</button>
      <button class="next-quote">➡</button>
    </div>
  `;
  document.querySelector("footer.site-footer").prepend(quoteBlock);

  const quoteText = document.querySelector(".quote-text");
  let currentQuoteIndex = 0;

  const updateQuote = () => {
    quoteText.style.opacity = "0";
    setTimeout(() => {
      quoteText.textContent = quotes[currentQuoteIndex];
      quoteText.style.opacity = "1";
    }, 400);
  };

  document.querySelector(".prev-quote").addEventListener("click", () => {
    currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
    updateQuote();
  });

  document.querySelector(".next-quote").addEventListener("click", () => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    updateQuote();
  });

  updateQuote();
});


const stats = [
  { id: "species", label: "Видів, що потребують захисту", value: 32500, speed: 6 },
  { id: "water", label: "Літрів збереженої води", value: 250000000, speed: 8 },
  { id: "trees", label: "Висаджено дерев", value: 370000000, speed: 10 }
];

if (document.title.includes("Ліси та ґрунти")) {
  document.addEventListener("DOMContentLoaded", () => {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");
    stats.forEach(stat => {
      const statBlock = document.createElement("div");
      statBlock.classList.add("stat-block");
      statBlock.innerHTML = `
        <div class="stat-number" id="${stat.id}">0</div>
        <div class="stat-label">${stat.label}</div>
      `;
      statsContainer.appendChild(statBlock);
    });
    document.querySelector("main").appendChild(statsContainer);

    const animateValue = (id, start, end, duration) => {
      const range = end - start;
      let current = start;
      const increment = Math.ceil(range / duration);
      const element = document.getElementById(id);

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        element.textContent = current.toLocaleString();
      }, 10);
    };

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            stats.forEach(stat => animateValue(stat.id, 0, stat.value, stat.speed * 100));
            observer.disconnect(); 
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(statsContainer);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const createSnowflakes = () => {
    const snowContainer = document.querySelector(".snow-container"); 
	
    const createSnowflake = () => {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");

      const randomX = Math.random() * 100 + "%";
      const randomAnimationDuration = Math.random() * 3 + 2 + "s";
      const randomOpacity = Math.random();
      const randomTransformX = Math.random() * 50 - 25 + "px";

      snowflake.style.left = randomX;
      snowflake.style.animationDuration = randomAnimationDuration;
      snowflake.style.opacity = randomOpacity;
      snowflake.style.setProperty('--random-x', randomTransformX); 

      snowContainer.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, 5000); 
    };

    setInterval(createSnowflake, 200); 
  };

  createSnowflakes(); 


  const getPluralForm = (number, forms) => {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return forms[2];
    }
    if (lastDigit === 1) {
      return forms[0];
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return forms[1];
    }
    return forms[2];
  };


  const updateTimer = () => {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1);
    const diff = newYear - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("year-timer").innerHTML = `
      <div>
        <span>${days}</span>
        <div>${getPluralForm(days, ["день", "дні", "днів"])}</div>
      </div>
      <div>
        <span>${hours}</span>
        <div>${getPluralForm(hours, ["година", "години", "годин"])}</div>
      </div>
      <div>
        <span>${minutes}</span>
        <div>${getPluralForm(minutes, ["хвилина", "хвилини", "хвилин"])}</div>
      </div>
      <div>
        <span>${seconds}</span>
        <div>${getPluralForm(seconds, ["секунда", "секунди", "секунд"])}</div>
      </div>
    `;
  };

  setInterval(updateTimer, 1000);
  updateTimer();
});


document.addEventListener("DOMContentLoaded", () => {
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.classList.add("scroll-top");
  scrollTopBtn.innerHTML = "⬆";
  document.body.appendChild(scrollTopBtn);

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });
});