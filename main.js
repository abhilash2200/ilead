document.addEventListener("DOMContentLoaded", (function () {
    let e, t, a;

    if (document.querySelector("#academic-slider")) {
        e = new Splide("#academic-slider", {
            type: "loop", perPage: 3, gap: "2rem", padding: "1rem", pagination: !1, arrows: !0, breakpoints: { 1024: { perPage: 3 }, 768: { perPage: 2 }, 640: { perPage: 1, padding: "2rem" } }
        }).mount();
    }

    if (document.querySelector("#testimonial-slider")) {
        t = new Splide("#testimonial-slider", {
            type: "loop", perPage: 3, gap: "1.5rem", padding: "0.5rem", pagination: !0, arrows: !1, breakpoints: { 1024: { perPage: 2 }, 640: { perPage: 1, padding: "0rem" } }
        }).mount();
    }

    if (document.querySelector("#ecosystem-slider")) {
        new Splide("#ecosystem-slider", {
            type: "loop", perPage: 4, gap: "1.5rem", padding: "0.5rem", pagination: !0, arrows: !1, breakpoints: { 1280: { perPage: 3 }, 1024: { perPage: 2 }, 640: { perPage: 1, padding: "1.5rem" } }
        }).mount();
    }

    if (document.querySelector("#programs-slider")) {
        const mql = window.matchMedia("(min-width: 768px)");

        const syncProgramsSlider = () => {
            const root = document.querySelector("#programs-slider");
            if (!root) return;

            if (mql.matches) {
                root.classList.remove("is-static");
                if (!a) {
                    a = new Splide("#programs-slider", {
                        type: "loop",
                        perPage: 3,
                        gap: "1.5rem",
                        padding: "1rem",
                        pagination: !0,
                        arrows: !0,
                        breakpoints: { 1280: { perPage: 3 }, 1024: { perPage: 3 }, 768: { perPage: 2 } }
                    }).mount();
                }
            } else {
                root.classList.add("is-static");
                if (a) {
                    a.destroy(!0);
                    a = void 0;
                }
            }
        };

        syncProgramsSlider();
        mql.addEventListener ? mql.addEventListener("change", syncProgramsSlider) : mql.addListener(syncProgramsSlider);
    }

    if (document.querySelector("#video-testimonial-slider")) {
        new Splide("#video-testimonial-slider", {
            type: "loop", perPage: 5, gap: "1rem", padding: "0.5rem", pagination: !0, arrows: !0, breakpoints: { 1280: { perPage: 4 }, 1024: { perPage: 3 }, 768: { perPage: 2 }, 640: { perPage: 1, padding: "2rem" } }
        }).mount();
    }

    AOS.init({ once: !0, offset: 50, duration: 800, easing: "ease-out-cubic" });

    const n = new IntersectionObserver(((entry, obs) => {
        entry.forEach((entry => {
            entry.isIntersecting && ((() => {
                const counters = document.querySelectorAll(".counter"), duration = 1e3 / 60, targetFrames = Math.round(119.99999999999999);
                counters.forEach((counter => {
                    let frame = 0; const targetVal = parseInt(counter.getAttribute("data-target"), 10), interval = setInterval((() => {
                        frame++; const progress = frame / targetFrames, easeProgress = 1 - Math.pow(1 - progress, 3), currentVal = Math.round(targetVal * easeProgress);
                        counter.innerText = currentVal; frame === targetFrames && (clearInterval(interval), counter.innerText = targetVal)
                    }), duration)
                }))
            })(), obs.disconnect())
        }))
    }), { threshold: .5 });

    const o = document.getElementById("hero-stats");
    o && n.observe(o);

    window.addEventListener("load", (function () {
        if (e) e.refresh();
        if (t) t.refresh();
        if (a) a.refresh();
    }));

    document.querySelectorAll(".faq-toggle").forEach((toggle => {
        toggle.addEventListener("click", (() => {
            const answer = toggle.nextElementSibling, icon = toggle.querySelector(".faq-icon");
            answer.classList.toggle("hidden");
            answer.classList.contains("hidden") ? icon.classList.add("rotate-180") : icon.classList.remove("rotate-180");
        }))
    }));

    const s = document.getElementById("admission-modal"), d = document.getElementById("modal-backdrop"), i = document.getElementById("modal-content"), r = document.getElementById("close-modal-btn");

    function c() {
        if (!s || !d || !i) return;
        s.classList.remove("hidden"); s.classList.add("flex"); document.body.classList.add("overflow-hidden");
        setTimeout((() => {
            d.classList.remove("opacity-0"); d.classList.add("opacity-100");
            i.classList.remove("opacity-0", "scale-95"); i.classList.add("opacity-100", "scale-100")
        }), 10)
    }

    function l() {
        if (!s || !d || !i) return;
        d.classList.remove("opacity-100"); d.classList.add("opacity-0");
        i.classList.remove("opacity-100", "scale-100"); i.classList.add("opacity-0", "scale-95");
        document.body.classList.remove("overflow-hidden");
        setTimeout((() => { s.classList.add("hidden"); s.classList.remove("flex") }), 300)
    }

    document.querySelectorAll(".open-modal-btn").forEach((btn => {
        btn.addEventListener("click", (evt => { evt.preventDefault(); c() }))
    }));

    if (r) r.addEventListener("click", l);
    if (d) d.addEventListener("click", l);

    document.addEventListener("keydown", (evt => {
        "Escape" !== evt.key || !s || s.classList.contains("hidden") || l()
    }));

    if (s) setTimeout(c, 1e4);
}));