document.documentElement.classList.add("js");

const anoAtual = document.querySelector("#ano-atual");
const topo = document.querySelector(".topo");
const elementosReveal = document.querySelectorAll(".reveal");
const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

function atualizarTopo() {
    topo?.classList.toggle("com-sombra", window.scrollY > 12);
}

atualizarTopo();
window.addEventListener("scroll", atualizarTopo, { passive: true });

if (reduzMovimento || !("IntersectionObserver" in window)) {
    elementosReveal.forEach((elemento) => elemento.classList.add("visivel"));
} else {
    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observer.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.14
    });

    elementosReveal.forEach((elemento) => observer.observe(elemento));
}
