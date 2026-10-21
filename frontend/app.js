const chartSets = {
  week: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    current: [18, 27, 23, 39, 34, 52, 47],
    previous: [15, 22, 20, 31, 29, 42, 38],
    total: "246,320",
  },
  month: {
    labels: ["1–5", "6–10", "11–15", "16–20", "21–25", "26–30"],
    current: [22, 35, 29, 47, 42, 58],
    previous: [18, 28, 26, 36, 34, 45],
    total: "914,750",
  },
  quarter: {
    labels: ["Aug", "Sep", "Oct"],
    current: [33, 49, 61],
    previous: [29, 37, 46],
    total: "2,486,900",
  },
};

const chartCanvas = document.querySelector("#sales-chart");
const chartTooltip = document.querySelector("#chart-tooltip");
const rangeSelect = document.querySelector("#range-select");
let activeChart = chartSets.week;
let toastTimer;

function drawChart() {
  if (!chartCanvas) return;
  const rect = chartCanvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const scale = window.devicePixelRatio || 1;
  chartCanvas.width = Math.round(rect.width * scale);
  chartCanvas.height = Math.round(rect.height * scale);
  const context = chartCanvas.getContext("2d");
  context.scale(scale, scale);

  const width = rect.width;
  const height = rect.height;
  const padding = { top: 13, right: 10, bottom: 25, left: 30 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const maxValue = 70;
  const xAt = (index) => padding.left + (activeChart.labels.length === 1 ? plotWidth / 2 : (index * plotWidth) / (activeChart.labels.length - 1));
  const yAt = (value) => padding.top + plotHeight - (value / maxValue) * plotHeight;

  context.clearRect(0, 0, width, height);
  context.font = '9px "DM Sans", sans-serif';
  context.textBaseline = "middle";
  [0, 20, 40, 60].forEach((value) => {
    const y = yAt(value);
    context.beginPath();
    context.strokeStyle = "#edf0ed";
    context.lineWidth = 1;
    context.setLineDash([3, 4]);
    context.moveTo(padding.left, y);
    context.lineTo(width - padding.right, y);
    context.stroke();
    context.setLineDash([]);
    context.fillStyle = "#9aa39d";
    context.textAlign = "right";
    context.fillText(value === 0 ? "0" : `${value}k`, padding.left - 8, y);
  });

  function drawLine(values, color, dashed = false) {
    context.beginPath();
    values.forEach((value, index) => {
      const x = xAt(index);
      const y = yAt(value);
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.strokeStyle = color;
    context.lineWidth = dashed ? 1.5 : 2.2;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.setLineDash(dashed ? [4, 4] : []);
    context.stroke();
    context.setLineDash([]);
  }

  drawLine(activeChart.previous, "#cbd3cd", true);
  drawLine(activeChart.current, "#174b38");
  activeChart.current.forEach((value, index) => {
    context.beginPath();
    context.fillStyle = "#ffffff";
    context.arc(xAt(index), yAt(value), 3.3, 0, Math.PI * 2);
    context.fill();
    context.lineWidth = 1.8;
    context.strokeStyle = "#174b38";
    context.stroke();
  });

  context.fillStyle = "#909a92";
  context.textAlign = "center";
  activeChart.labels.forEach((label, index) => {
    context.fillText(label, xAt(index), height - 9);
  });
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2800);
}

rangeSelect.addEventListener("change", (event) => {
  activeChart = chartSets[event.target.value] || chartSets.week;
  document.querySelector("#chart-total").textContent = activeChart.total;
  drawChart();
});

window.addEventListener("resize", drawChart);
window.addEventListener("load", drawChart);
if ("ResizeObserver" in window) new ResizeObserver(drawChart).observe(chartCanvas);

chartCanvas.addEventListener("pointermove", (event) => {
  const rect = chartCanvas.getBoundingClientRect();
  const plotStart = 30;
  const plotWidth = rect.width - plotStart - 10;
  const index = Math.max(0, Math.min(activeChart.current.length - 1, Math.round(((event.clientX - rect.left - plotStart) / plotWidth) * (activeChart.current.length - 1))));
  chartTooltip.textContent = `${activeChart.labels[index]} · KES ${activeChart.current[index]},000`;
  chartTooltip.style.left = `${Math.min(rect.width - 130, Math.max(28, (index / Math.max(1, activeChart.current.length - 1)) * plotWidth + plotStart - 20))}px`;
  chartTooltip.style.top = `${Math.max(0, event.clientY - rect.top - 34)}px`;
  chartTooltip.classList.add("visible");
});
chartCanvas.addEventListener("pointerleave", () => chartTooltip.classList.remove("visible"));

const saleDialog = document.querySelector("#sale-dialog");
document.querySelector("#open-sale").addEventListener("click", () => saleDialog.showModal());
document.querySelector("#close-sale").addEventListener("click", () => saleDialog.close());
document.querySelector("#cancel-sale").addEventListener("click", () => saleDialog.close());
saleDialog.addEventListener("click", (event) => {
  if (event.target === saleDialog) saleDialog.close();
});

document.querySelector("#sale-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const amount = Number(formData.get("amount"));
  if (!Number.isFinite(amount) || amount <= 0) return;

  const customer = String(formData.get("customer") || "").trim() || "Walk-in customer";
  const payment = String(formData.get("payment"));
  const initials = customer.split(/\s+/).slice(0, 2).map((part) => part[0].toUpperCase()).join("");
  const amountText = new Intl.NumberFormat("en-KE").format(amount);
  const row = document.createElement("tr");
  row.innerHTML = `<td><span class="transaction-id"></span></td><td><span class="customer-cell"><span class="customer-avatar avatar-green"></span></span></td><td><span class="payment-type"></span></td><td class="muted-cell">Just now</td><td class="align-right amount-cell"></td>`;
  row.querySelector(".transaction-id").textContent = `#BP-${Date.now().toString().slice(-5)}`;
  row.querySelector(".customer-cell").append(document.createTextNode(customer));
  row.querySelector(".customer-avatar").textContent = initials;
  row.querySelector(".payment-type").textContent = payment;
  row.querySelector(".payment-type").classList.add(payment.toLowerCase().replace("-", ""));
  row.querySelector(".amount-cell").textContent = `KES ${amountText}`;
  document.querySelector("#sales-rows").prepend(row);

  const salesTotal = document.querySelector("#sales-total");
  const currentTotal = Number(salesTotal.textContent.replaceAll(",", ""));
  salesTotal.textContent = new Intl.NumberFormat("en-KE").format(currentTotal + amount);
  event.currentTarget.reset();
  saleDialog.close();
  showToast(`Sale of KES ${amountText} recorded in this demo.`);
});

document.querySelector("#sales-search").addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  const rows = [...document.querySelectorAll("#sales-rows tr")];
  let visibleRows = 0;
  rows.forEach((row) => {
    const matches = row.textContent.toLowerCase().includes(query);
    row.hidden = !matches;
    if (matches) visibleRows += 1;
  });
  document.querySelector("#empty-search").hidden = visibleRows > 0;
});

document.querySelector("#export-sales").addEventListener("click", () => {
  const rows = [["Transaction", "Customer", "Payment", "Time", "Amount"]];
  document.querySelectorAll("#sales-rows tr").forEach((row) => {
    if (row.hidden) return;
    rows.push([...row.querySelectorAll("td")].map((cell) => cell.innerText.trim().replace(/\s+/g, " ")));
  });
  const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.download = "bizport-sales.csv";
  link.click();
  URL.revokeObjectURL(link.href);
  showToast("Sales CSV exported.");
});

document.querySelector(".notification-button").addEventListener("click", () => showToast("You’re all caught up on notifications."));

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

drawChart();