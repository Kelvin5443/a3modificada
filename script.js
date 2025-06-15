const allPosts = [
      {
        id: "post1",
        title: "Copa FACS: Primeiro dia cheio de emoções",
        category: "Esportes",
        excerpt: "O primeiro dia da Copa FACS foi marcado por goleadas e viradas emocionantes em várias modalidades esportivas.",
        image: "copafacs.png",
        altText: "Jogadores competindo na Copa FACS",
        date: "20 Jun, 2024",
        tags: ["esporte", "competição", "facs"],
        link: "https://noticiasavera.com.br/domingo-de-finais-marca-o-encerramento-da-copa-facs-2025-com-jogos-decisivos-e-viradas-emocionantes/"
      },
      {
        id: "post2",
        title: "EXPOUNIFACS 2025",
        category: "Eventos",
        excerpt: "Confira como foi a edição deste ano da EXPOUNIFACS e os projetos mais inovadores apresentados.",
        image: "feira.jpeg",
        altText: "Estudantes apresentando projetos na EXPOUNIFACS",
        date: "15 Jun, 2025",
        tags: ["feira", "projetos", "inovação"],
        link: "https://www.even3.com.br/expounifacs20242-515003/"
      },
      {
        id: "post3",
        title: "Resultados da 2ª rodada",
        category: "Esportes",
        excerpt: "Todos os resultados e destaques da segunda rodada da Copa FACS em todas as modalidades.",
        image: "copa.jpg",
        altText: "Resultados dos jogos da Copa FACS",
        date: "10 Jun, 2023",
        tags: ["resultados", "copa", "facs"],
        link: "https://noticiasavera.com.br/domingo-de-finais-marca-o-encerramento-da-copa-facs-2025-com-jogos-decisivos-e-viradas-emocionantes/"
      },
      {
        id: "post4",
        title: "Novos cursos disponíveis",
        category: "Acadêmico",
        excerpt: "Conheça os novos cursos que estarão disponíveis no próximo semestre e suas oportunidades.",
        image: "downloadcursos.jpeg",
        altText: "Novos cursos oferecidos pela FACS",
        date: "5 Jun, 2025",
        tags: ["cursos", "graduação", "novidades"],
        link: "https://www.unifacs.br/graduacao/inteligencia-artificial/"
      },
      {
        id: "post5",
        title: "Palestra sobre Inteligência Artificial na Educação",
        category: "Acadêmico",
        excerpt: "Evento trouxe especialistas para discutir como a IA está transformando os métodos de ensino e aprendizagem.",
        image: "int.jpeg",
        altText: "Palestrante falando sobre IA para plateia de estudantes",
        date: "25 Jun, 2025",
        tags: ["tecnologia", "educação", "inovação"],
        link: "https://eventos.pucsp.br/5-congresso-ia-470058/"
      },
      {
        id: "post6",
        title: "Grupo de Teatro da FACS apresenta nova peça",
        category: "Cultura",
        excerpt: 'O grupo "Cenas Acadêmicas" apresentou sua mais recente produção com grande sucesso de público.',
        image: "tatro.jpeg",
        altText: "Grupo de teatro se apresentando no auditório",
        date: "18 Jun, 2025",
        tags: ["teatro", "cultura", "artes"],
        link: "https://www.even3.com.br/expounifacs20242-515003/"
      }
    ];

    function getImagePath(imageName) {
      if (!imageName) return "default-image.jpg";
      const cleanedName = imageName.startsWith(".") ? imageName.substring(1) : imageName;
      const extensions = [".png", ".jpg", ".jpeg", ".webp"];
      const hasExtension = extensions.some(ext => cleanedName.toLowerCase().endsWith(ext));
      return hasExtension ? cleanedName : `${cleanedName}.jpg`;
    }

    function getLatestPost() {
      const sortedPosts = [...allPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
      return sortedPosts[0];
    }

    function displayLatestPost() {
      const latestPost = getLatestPost();
      const lastPostContainer = document.getElementById("last-post-container");
      if (latestPost && lastPostContainer) {
        const imagePath = getImagePath(latestPost.image);
        lastPostContainer.style.display = "block";
        lastPostContainer.innerHTML = `
          <h3>Último Post Publicado:</h3>
          <article class="post-card">
            <div class="post-image">
              <img src="${imagePath}" alt="${latestPost.altText || latestPost.title}" onerror="this.src='default-image.jpg'; this.alt='Imagem não disponível'">
              <span class="post-category">${latestPost.category}</span>
            </div>
            <div class="post-content">
              <h3 class="post-title">${latestPost.title}</h3>
              <p class="post-excerpt">${latestPost.excerpt}</p>
              <div class="post-meta">
                <span class="post-date"><i class="far fa-calendar"></i> ${latestPost.date || "Data não disponível"}</span>
                <a href="${latestPost.link}" target="_blank" rel="noopener noreferrer" class="read-more-link">Ler mais</a>
              </div>
            </div>
          </article>
        `;
      }
    }

    function displayResults(results) {
      const postsContainer = document.getElementById("posts-container");
      const loadingElement = document.getElementById("search-loading");
      if (loadingElement) loadingElement.classList.remove("active");
      postsContainer.innerHTML = "";
      if (results.length === 0) {
        postsContainer.innerHTML = '<div class="no-results">Nenhum resultado encontrado.</div>';
      } else {
        results.forEach((post) => {
          const imagePath = getImagePath(post.image);
          postsContainer.innerHTML += `
            <article class="post-card">
              <div class="post-image">
                <img src="${imagePath}" alt="${post.altText || post.title}" onerror="this.src='default-image.jpg'; this.alt='Imagem não disponível'">
                <span class="post-category">${post.category}</span>
              </div>
              <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                  <span class="post-date"><i class="far fa-calendar"></i> ${post.date || "Data não disponível"}</span>
                  <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="read-more-link">Ler mais</a>
                </div>
              </div>
            </article>
          `;
        });
      }
    }

    function searchPosts(query) {
      query = query.trim().toLowerCase();
      if (!query) return allPosts;
      return allPosts.filter((post) => post.title.toLowerCase().includes(query));
    }

    function updateSuggestions(query) {
      const datalist = document.getElementById("search-suggestions");
      datalist.innerHTML = "";
      if (query.length < 2) return;
      const suggestions = allPosts
        .filter((post) => post.title.toLowerCase().includes(query.toLowerCase()))
        .map((post) => post.title);
      [...new Set(suggestions)].forEach((title) => {
        const option = document.createElement("option");
        option.value = title;
        datalist.appendChild(option);
      });
    }

    document.addEventListener("DOMContentLoaded", () => {
      displayLatestPost();
      displayResults(allPosts);
      const searchForm = document.getElementById("search-form");
      const searchInput = document.getElementById("search-input");

      searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const query = searchInput.value;
        const results = searchPosts(query);
        displayResults(results);
      });

      searchInput.addEventListener("input", function () {
        updateSuggestions(this.value);
      });
    });

    document.addEventListener("DOMContentLoaded", function () {
      const slides = document.querySelectorAll(".carousel-slide");
      const prevBtn = document.querySelector(".carousel-prev");
      const nextBtn = document.querySelector(".carousel-next");
      const dots = document.querySelectorAll(".carousel-dots .dot");
      let currentIndex = 0;

      function showSlide(index) {
        slides.forEach((slide, i) => {
          slide.classList.toggle("active", i === index);
          dots[i].classList.toggle("active", i === index);
        });
        currentIndex = index;
      }

      prevBtn.addEventListener("click", function () {
        let newIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(newIndex);
      });

      nextBtn.addEventListener("click", function () {
        let newIndex = (currentIndex + 1) % slides.length;
        showSlide(newIndex);
      });

      dots.forEach((dot, i) => {
        dot.addEventListener("click", function () {
          showSlide(i);
        });
      });

      showSlide(0);
    });




    