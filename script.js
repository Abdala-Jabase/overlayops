const DEFAULT_PLAN = {
  name: "Lab Rollout",
  price: "$6,800",
  duration: "6-week validation sprint"
};

function persistPlanSelection(event) {
  const trigger = event.currentTarget;
  const plan = {
    name: trigger.dataset.plan || DEFAULT_PLAN.name,
    price: trigger.dataset.price || DEFAULT_PLAN.price,
    duration: trigger.dataset.duration || DEFAULT_PLAN.duration
  };

  localStorage.setItem("overlayopsPlan", JSON.stringify(plan));
}

function loadPlanSelection() {
  try {
    const saved = localStorage.getItem("overlayopsPlan");
    return saved ? JSON.parse(saved) : DEFAULT_PLAN;
  } catch {
    return DEFAULT_PLAN;
  }
}

function setupLandingPage() {
  document.querySelectorAll(".select-plan").forEach((link) => {
    link.addEventListener("click", persistPlanSelection);
  });
}

function setupCheckoutPage() {
  const plan = loadPlanSelection();
  const planName = document.getElementById("selected-plan");
  const planPrice = document.getElementById("selected-price");
  const planDuration = document.getElementById("selected-duration");

  if (planName) {
    planName.textContent = plan.name;
  }

  if (planPrice) {
    planPrice.textContent = plan.price;
  }

  if (planDuration) {
    planDuration.textContent = plan.duration;
  }

  const form = document.getElementById("checkout-form");
  const confirmationCard = document.getElementById("confirmation-card");
  const confirmationCopy = document.getElementById("confirmation-copy");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const company = formData.get("company") || "Your team";
    const email = formData.get("email") || "your email";

    if (confirmationCopy) {
      confirmationCopy.textContent = `${company} is marked as interested in the ${plan.name} package. A real flow would send follow-up to ${email}.`;
    }

    form.hidden = true;
    if (confirmationCard) {
      confirmationCard.hidden = false;
    }
  });
}

const page = document.body.dataset.page;

if (page === "landing") {
  setupLandingPage();
}

if (page === "checkout") {
  setupCheckoutPage();
}
