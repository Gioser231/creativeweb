document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');

    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                input.style.border = '2px solid red';
            } else {
                input.style.border = '2px solid green';
            }
        });
    });

   
    form.addEventListener('input', () => {
        const data = {
            name: form[0].value,
            email: form[1].value,
            message: form[2].value
        };
        localStorage.setItem('contactData', JSON.stringify(data));
    });

   
    const saved = JSON.parse(localStorage.getItem('contactData'));
    if (saved) {
        form[0].value = saved.name;
        form[1].value = saved.email;
        form[2].value = saved.message;
    }

    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Gracias por contactarnos. Nos comunicaremos pronto.');
        form.reset();
        localStorage.removeItem('contactData');
    });

    
    const reveal = () => {
        const elements = document.querySelectorAll('section');
        const triggerBottom = window.innerHeight * 0.85;

        elements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add('show');
            } else {
                el.classList.remove('show');
            }
        });
    };

    window.addEventListener('scroll', reveal);
    reveal();

    // Contador animado
    const counter = document.getElementById('counter');
    let count = 0;

    const updateCounter = () => {
        if (count < 120) {
            count++;
            counter.textContent = count;
            setTimeout(updateCounter, 10);
        }
    };

    const stats = document.querySelector('.stats');
    if (stats) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        });
        observer.observe(stats);
    }
});
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        faqItem.classList.toggle('active');
    });
});
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.objetivos ul li');

  function showItems() {
    const triggerBottom = window.innerHeight * 0.8;

    items.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;

      if (itemTop < triggerBottom) {
        
        setTimeout(() => {
          item.classList.add('visible');
        }, index * 300);
      }
    });
  }

  window.addEventListener('scroll', showItems);
  showItems(); 
});

const boton = document.getElementById('convertir-moneda');
let mostrandoCOP = false;

boton.addEventListener('click', () => {
  document.querySelectorAll('.usd').forEach(el => el.style.display = mostrandoCOP ? 'inline' : 'none');
  document.querySelectorAll('.cop').forEach(el => el.style.display = mostrandoCOP ? 'none' : 'inline');
  boton.textContent = mostrandoCOP ? 'Convertir a COP' : 'Convertir a USD';
  mostrandoCOP = !mostrandoCOP;
});
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("chatbotToggle");
  const chatbotWindow = document.getElementById("chatbotWindow");

  const faqs = [
    { q: "¿Cuánto cuesta el plan básico?", a: "El plan básico cuesta $500 USD. Incluye Landing page + Formulario." },
    { q: "¿Qué incluye el plan intermedio?", a: "El plan intermedio cuesta $1200 USD e incluye sitio web completo + CMS." },
    { q: "¿Qué tiene el plan avanzado?", a: "El plan avanzado cuesta $2500 USD. Sistema web + integración con base de datos." },
    { q: "¿Cómo puedo contactarlos?", a: "Puedes escribirnos por WhatsApp usando los enlaces de cada plan." }
  ];

  function crearChat() {
    let botonesFaq = faqs.map((item, i) =>
      `<button class="faq-btn" data-index="${i}">${item.q}</button>`
    ).join("");

    chatbotWindow.innerHTML = `
      <header>
        Ayudante 💬
        <button id="closeBtn">&times;</button>
      </header>
      <div class="messages">
        <div><strong>Bot:</strong> ¡Hola! ¿En qué puedo ayudarte? Elige una pregunta o escríbela.</div>
      </div>
      <div class="faq-buttons" style="padding: 10px; display: flex; flex-direction: column; gap: 8px;">
        ${botonesFaq}
      </div>
      <div class="input-area" style="display:none;">
        <input type="text" id="userInput" placeholder="Escribe tu pregunta...">
      </div>
    `;

    // Cerrar ventana con animación
    chatbotWindow.querySelector("#closeBtn").onclick = () => {
      despedidaAnimacion();
    };

    // Manejar click en botones FAQ
    chatbotWindow.querySelectorAll(".faq-btn").forEach(btn => {
      btn.onclick = () => {
        const idx = btn.getAttribute("data-index");
        agregarMensaje("Usuario", faqs[idx].q);
        agregarMensaje("Bot", faqs[idx].a);
      };
    });
  }

  // Añadir mensaje al chat
  function agregarMensaje(quien, texto) {
    const mensajes = chatbotWindow.querySelector(".messages");
    const div = document.createElement("div");
    div.innerHTML = `<strong>${quien}:</strong> ${texto}`;
    mensajes.appendChild(div);
    mensajes.scrollTop = mensajes.scrollHeight; // Auto scroll
  }

  // Animación de despedida antes de cerrar el chat
  function despedidaAnimacion() {
    const messagesDiv = chatbotWindow.querySelector(".messages");
    // Mensaje de despedida estilo cómic
    agregarMensaje("Bot", "¡Hasta luego! 😊🤖");

    // Añadir clase para animar "salida" (la definirás en CSS)
    chatbotWindow.classList.add("animar-salida");

    // Después de la animación (por ejemplo 1.5s), ocultar la ventana y quitar la clase
    setTimeout(() => {
      chatbotWindow.style.display = "none";
      chatbotWindow.classList.remove("animar-salida");
      // Limpia mensajes para la próxima apertura
      chatbotWindow.innerHTML = "";
    }, 1500);
  }

  toggleBtn.onclick = () => {
    if (chatbotWindow.style.display === "flex") {
      despedidaAnimacion();
    } else {
      crearChat();
      chatbotWindow.style.display = "flex";
    }
  };
});
