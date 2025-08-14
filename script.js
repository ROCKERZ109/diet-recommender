// DOM Elements
const goalForm = document.getElementById("goalForm");
const results = document.getElementById("results");
const aiResponse = document.getElementById("aiResponse");
const darkModeToggle = document.getElementById("darkModeToggle");
const askAiBtn = document.getElementById("askAiBtn");

// Dark Mode
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

// Load dark mode on start
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// Form Submission
goalForm.addEventListener("submit", function (e) {
  e.preventDefault();
  generatePlan();
});

// Simulate AI Call
askAiBtn.addEventListener("click", async () => {
  const protein = document.getElementById("protein").value;
  const budget = document.getElementById("budget").value;
  const diet = document.getElementById("diet").value;
  const allergies = document.getElementById("allergies").value.split(",").map(a => a.trim()).filter(a => a);
  const meals = document.getElementById("meals").value;

  aiResponse.innerHTML = "🧠 AI is analyzing your plan...";

  try {
    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        protein: parseFloat(protein),
        budget: parseFloat(budget),
        diet,
        allergies,
        meals,
        foodData: willysFood
      })
    });

    const data = await response.json();
    aiResponse.innerHTML = `<pre>${data.plan}</pre>`;
  } catch (error) {
    aiResponse.innerHTML = `<p>❌ AI service unavailable. Try again later.</p>`;
  }
});

// Generate Meal Plan
function generatePlan() {
  const proteinGoal = parseFloat(document.getElementById("protein").value);
  const budget = parseFloat(document.getElementById("budget").value);
  const diet = document.getElementById("diet").value;
  const allergies = document.getElementById("allergies").value.toLowerCase().split(",").map(a => a.trim());

  results.innerHTML = "<p>🍳 Calculating your optimal plan...</p>";

  let filteredFood = willysFood.filter(item => {
    const hasAllergen = allergies.some(allergen => 
      item.name.toLowerCase().includes(allergen)
    );
    return !hasAllergen && !item.name.toLowerCase().includes("katt") && !item.name.toLowerCase().includes("hund");
  });

  // Sort by protein per krona
  const sorted = filteredFood.sort((a, b) => b.proteinPerKrona - a.proteinPerKrona);

  let plan = [];
  let totalProtein = 0;
  let totalCost = 0;

  for (let item of sorted) {
    if (totalProtein >= proteinGoal || totalCost >= budget) break;

    const proteinPer100g = item.protein;
    const pricePer100g = (item.price / parseFloat(item.volume)) * 100;
    const neededProtein = Math.min(proteinGoal - totalProtein, proteinPer100g * 2); // Max 200g per item
    const amount = (neededProtein / proteinPer100g) * 100;
    const cost = (amount / 100) * pricePer100g;

    if (totalCost + cost <= budget) {
      plan.push({
        name: item.name,
        amount: amount.toFixed(0) + "g",
        protein: neededProtein.toFixed(1),
        cost: cost.toFixed(2),
      });
      totalProtein += neededProtein;
      totalCost += cost;
    }
  }

  if (totalProtein < proteinGoal * 0.9) {
    results.innerHTML = `<p>❌ Could not reach ${proteinGoal}g protein within ${budget} kr.</p>`;
  } else {
    results.innerHTML = `
      <h3>✅ Meal Plan (Total: ${totalCost.toFixed(2)} kr, ${totalProtein.toFixed(1)}g protein)</h3>
      <ul>
        ${plan.map(p => `<li>${p.name} – ${p.amount} → ${p.protein}g protein (${p.cost} kr)</li>`).join("")}
      </ul>
      <p><strong>Best value:</strong> ${sorted[0]?.name}</p>
    `;
  }
}