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

const dashboard = document.querySelector("#overview");
const dashboardNavLinks = [...document.querySelectorAll(".nav-link")];
const dashboardViews = {
  overview: {
    label: "Overview",
    title: "Good morning, Vanessa.",
    subtitle: "Here’s what’s happening at Mwangaza Market today.",
  },
  sales: {
    label: "Sales",
    title: "Sales",
    subtitle: "Review recent transactions or record a new sale.",
  },
  inventory: {
    label: "Inventory",
    title: "Inventory",
    subtitle: "Check the products that need restocking.",
  },
  customers: {
    label: "Customers",
    title: "Customer balances",
    subtitle: "Keep track of outstanding customer credit.",
  },
  reports: {
    label: "Reports",
    title: "Reports",
    subtitle: "Review sales performance across reporting periods.",
  },
  purchases: {
    label: "Purchases",
    title: "Purchases & suppliers",
    subtitle: "Track stock purchases, supplier payments, and balances.",
  },
  expenses: {
    label: "Expenses",
    title: "Expenses",
    subtitle: "Keep operating costs organized by category and date.",
  },
  team: {
    label: "Team",
    title: "Team & permissions",
    subtitle: "Manage staff access by role. Permission enforcement requires the backend.",
  },
  activity: {
    label: "Activity",
    title: "Audit activity",
    subtitle: "Review a sample history of important business changes.",
  },
  automation: {
    label: "Automations",
    title: "Automations & reminders",
    subtitle: "Configure low-stock alerts, summaries, and payment reminders.",
  },
  integrations: {
    label: "Integrations",
    title: "Integrations",
    subtitle: "Review planned read-only connections. No external services are connected.",
  },
  settings: {
    label: "Settings",
    title: "Security & settings",
    subtitle: "Security controls shown here are illustrative and not enforced by this frontend.",
  },
};

const moduleView = document.querySelector("#module-view");
const moduleViewContent = {
  sales: `
    <article class="panel module-panel">
      <div class="panel-heading"><div><p class="section-kicker">RECORD CONTROLS</p><h2>Returns &amp; corrections</h2></div><span class="preview-badge">Demo preview</span></div>
      <p class="module-description">Keep a traceable record when a completed sale needs a correction. Reversals are not applied to the sample figures.</p>
      <div class="module-action-row"><span><strong>Sale #BP-24016</strong><small>Credit sale · KES 3,200 · 9:56 am</small></span><button class="secondary-button" type="button" data-demo-action="A correction request is preview-only; no sale was changed.">Request correction</button></div>
    </article>`,
  inventory: `
    <article class="panel module-panel">
      <div class="panel-heading"><div><p class="section-kicker">TRACEABLE STOCK</p><h2>Recent stock movements</h2></div><button class="secondary-button" type="button" data-demo-action="Stock adjustments require backend authorization and are not saved in this preview.">Record adjustment</button></div>
      <div class="table-scroll"><table><thead><tr><th>PRODUCT</th><th>MOVEMENT</th><th>REASON</th><th>RECORDED BY</th></tr></thead><tbody><tr><td>Maize flour 2kg</td><td>−2 units</td><td>Sale #BP-24018</td><td>Vanessa K.</td></tr><tr><td>Cooking oil 1L</td><td>+12 units</td><td>Purchase #PO-0082</td><td>Vanessa K.</td></tr><tr><td>White sugar 1kg</td><td>−1 unit</td><td>Damaged stock</td><td>Peter M.</td></tr></tbody></table></div>
    </article>`,
  customers: `
    <article class="panel module-panel">
      <div class="panel-heading"><div><p class="section-kicker">ACCOUNT HISTORY</p><h2>Repayments &amp; reminders</h2></div><span class="preview-badge">Demo preview</span></div>
      <div class="table-scroll"><table><thead><tr><th>CUSTOMER</th><th>ACTIVITY</th><th>DATE</th><th class="align-right">AMOUNT</th><th></th></tr></thead><tbody><tr><td>Peter O.</td><td>Partial repayment · M-Pesa</td><td>Today, 9:14 am</td><td class="align-right amount-cell">KES 1,000</td><td><button class="text-button" type="button" data-demo-action="Repayments are illustrative and are not applied to a real balance.">Details</button></td></tr><tr><td>David M.</td><td>Payment reminder due</td><td>Overdue by 3 days</td><td class="align-right amount-cell">KES 1,900</td><td><button class="text-button" type="button" data-demo-action="No reminder was sent. Connect a messaging provider to enable delivery.">Send reminder</button></td></tr></tbody></table></div>
    </article>`,
  reports: `
    <article class="panel module-panel">
      <div class="panel-heading"><div><p class="section-kicker">REPORT DEFINITIONS</p><h2>Understand the figures</h2></div><span class="preview-badge">Sample data</span></div>
      <div class="report-definitions"><div><strong>Sales revenue</strong><span>Completed sales less applicable discounts and returns.</span></div><div><strong>Gross profit</strong><span>Net sales revenue less cost of goods sold, when cost data is available.</span></div><div><strong>Operating profit</strong><span>Gross profit less eligible operating expenses. Not a statutory accounting report.</span></div></div>
    </article>`,
  purchases: `
    <div class="module-grid"><article class="panel module-panel"><div class="panel-heading"><div><p class="section-kicker">PROCUREMENT</p><h2>Recent purchases</h2></div><button class="primary-button module-button" type="button" data-demo-action="Purchase entry is a preview; no stock or balance was changed.">Record purchase</button></div><div class="table-scroll"><table><thead><tr><th>REFERENCE</th><th>SUPPLIER</th><th>DATE</th><th>STATUS</th><th class="align-right">TOTAL</th></tr></thead><tbody><tr><td>#PO-0082</td><td>Nairobi Wholesalers</td><td>Today</td><td><span class="payment-type cash">Part paid</span></td><td class="align-right amount-cell">KES 24,600</td></tr><tr><td>#PO-0081</td><td>Eastlands Distributors</td><td>Yesterday</td><td><span class="payment-type mpesa">Paid</span></td><td class="align-right amount-cell">KES 8,450</td></tr></tbody></table></div></article>
    <article class="panel module-panel"><div class="panel-heading"><div><p class="section-kicker">SUPPLIER BALANCES</p><h2>Outstanding</h2></div></div><div class="balance-list"><div class="balance-row"><span class="balance-customer"><strong>Nairobi Wholesalers</strong><small>Payment due 28 Oct</small></span><strong class="balance-amount">KES 9,600</strong></div><div class="balance-row"><span class="balance-customer"><strong>Eastlands Distributors</strong><small>Account up to date</small></span><strong class="balance-amount">KES 0</strong></div></div><button class="secondary-button module-spaced" type="button" data-demo-action="Supplier payment is a preview; no balance was changed.">Record supplier payment</button></article></div>`,
  expenses: `
    <article class="panel module-panel"><div class="panel-heading"><div><p class="section-kicker">OPERATING COSTS</p><h2>Recent expenses</h2></div><button class="primary-button module-button" type="button" data-demo-action="Expense entry is a preview; no expense was saved.">Record expense</button></div><div class="module-summary"><span>Recorded this month</span><strong>KES 38,450</strong><small>Sample total · Inventory purchases are tracked separately.</small></div><div class="table-scroll"><table><thead><tr><th>DESCRIPTION</th><th>CATEGORY</th><th>PAYMENT</th><th>DATE</th><th class="align-right">AMOUNT</th></tr></thead><tbody><tr><td>Shop rent</td><td>Rent</td><td>Bank transfer</td><td>20 Oct</td><td class="align-right amount-cell">KES 18,000</td></tr><tr><td>Electricity tokens</td><td>Utilities</td><td>M-Pesa</td><td>18 Oct</td><td class="align-right amount-cell">KES 2,500</td></tr><tr><td>Delivery to shop</td><td>Transport</td><td>Cash</td><td>17 Oct</td><td class="align-right amount-cell">KES 850</td></tr></tbody></table></div></article>`,
  team: `
    <article class="panel module-panel"><div class="panel-heading"><div><p class="section-kicker">ACCESS CONTROL</p><h2>Staff &amp; roles</h2></div><button class="primary-button module-button" type="button" data-demo-action="Staff invitations are preview-only. Secure account creation and permission checks need the backend.">Invite staff</button></div><p class="module-notice">Example permissions only. Roles shown here do not grant or restrict access in this static preview.</p><div class="table-scroll"><table><thead><tr><th>TEAM MEMBER</th><th>ROLE</th><th>ACCESS EXAMPLE</th><th>STATUS</th></tr></thead><tbody><tr><td>Vanessa K.</td><td><span class="role-label">Business Owner</span></td><td>Business settings and all records</td><td>Active</td></tr><tr><td>Peter M.</td><td><span class="role-label">Inventory Clerk</span></td><td>Products and stock movements</td><td>Active</td></tr><tr><td>Anne W.</td><td><span class="role-label">Cashier</span></td><td>Sales and product lookup</td><td>Active</td></tr><tr><td>Grace N.</td><td><span class="role-label">Business Manager</span></td><td>Daily operations and permitted reports</td><td>Active</td></tr><tr><td>David O.</td><td><span class="role-label">Bookkeeper</span></td><td>Financial records and reports</td><td>Active</td></tr><tr><td>Esther K.</td><td><span class="role-label">Accountant</span></td><td>Permitted financial records and reports</td><td>Active</td></tr><tr><td>James N.</td><td><span class="role-label">Read-only Viewer</span></td><td>Granted records only</td><td>Invited</td></tr></tbody></table></div></article>`,
  activity: `
    <article class="panel module-panel"><div class="panel-heading"><div><p class="section-kicker">TRACEABILITY</p><h2>Recent business activity</h2></div><button class="secondary-button" type="button" data-demo-action="The sample audit history is ready to export once connected to saved records.">Export activity</button></div><p class="module-notice">Illustrative audit log. In the live system, important edits and reversals should be recorded and attributable.</p><div class="table-scroll"><table><thead><tr><th>WHEN</th><th>WHO</th><th>ACTIVITY</th><th>RECORD</th><th>DETAIL</th></tr></thead><tbody><tr><td>10:42 am</td><td>Anne W.</td><td>Sale recorded</td><td>#BP-24018</td><td>KES 2,450 · Cash</td></tr><tr><td>10:15 am</td><td>Peter M.</td><td>Stock received</td><td>#PO-0082</td><td>Cooking oil · +12</td></tr><tr><td>Yesterday</td><td>Vanessa K.</td><td>Price updated</td><td>Maize flour 2kg</td><td>KES 145 → 150</td></tr><tr><td>Yesterday</td><td>Vanessa K.</td><td>Debt repayment</td><td>Peter O.</td><td>KES 1,000 · M-Pesa</td></tr></tbody></table></div></article>`,
  automation: `
    <div class="module-grid"><article class="panel module-panel"><div class="panel-heading"><div><p class="section-kicker">SCHEDULED WORKFLOWS</p><h2>Alerts &amp; summaries</h2></div><span class="preview-badge">Not connected</span></div><div class="workflow-row"><span><strong>Low-stock alerts</strong><small>When stock reaches the configured threshold</small></span><label class="workflow-toggle"><input type="checkbox" checked aria-label="Low-stock alert preview enabled" /><span></span></label></div><div class="workflow-row"><span><strong>Daily business summary</strong><small>Every day · 6:00 pm Nairobi time</small></span><label class="workflow-toggle"><input type="checkbox" checked aria-label="Daily summary preview enabled" /><span></span></label></div><div class="workflow-row"><span><strong>Weekly report</strong><small>Every Monday · 8:00 am</small></span><label class="workflow-toggle"><input type="checkbox" aria-label="Weekly report preview disabled" /><span></span></label></div></article><article class="panel module-panel"><div class="panel-heading"><div><p class="section-kicker">CUSTOMER FOLLOW-UP</p><h2>Payment reminders</h2></div></div><p class="module-description">Reminder delivery needs an approved channel and customer contact details. No messages are sent from this demo.</p><button class="secondary-button" type="button" data-demo-action="Reminder schedule is saved only in a connected backend. No message was sent.">Review reminder settings</button><p class="workflow-footnote">Planned safeguards: duplicate prevention, attempt logs, retries, and owner-controlled schedules.</p></article></div>`,
  integrations: `
    <article class="panel module-panel"><div class="panel-heading"><div><p class="section-kicker">CONTROLLED ACCESS</p><h2>Read-only MCP tools</h2></div><span class="status-pill">Not connected</span></div><p class="module-description">Model Context Protocol (MCP) can provide approved clients with limited, read-only access to selected business information. BizPort's core workflows do not depend on MCP.</p><div class="integration-list"><div><span><strong>Sales summary</strong><small>Totals for an authorized date range</small></span><span class="status-pill">Planned</span></div><div><span><strong>Profit report</strong><small>Calculated values with limitations</small></span><span class="status-pill">Planned</span></div><div><span><strong>Low-stock products</strong><small>Products at or below threshold</small></span><span class="status-pill">Planned</span></div><div><span><strong>Customer debts &amp; expenses</strong><small>Permission-scoped summaries</small></span><span class="status-pill">Planned</span></div></div><p class="module-notice">No client is connected. Authentication, business isolation, authorization, validation, and access logging must be implemented on the server before enabling an integration.</p><button class="secondary-button" type="button" data-demo-action="MCP integration is not connected in this frontend preview.">Connection settings</button></article>`,
  settings: `
    <div class="module-grid"><article class="panel module-panel"><div class="panel-heading"><div><p class="section-kicker">ACCOUNT SECURITY</p><h2>Protect your account</h2></div><span class="preview-badge">Preview only</span></div><div class="settings-row"><span><strong>Sign-in &amp; recovery</strong><small>Authentication and recovery require a secure backend.</small></span><button class="text-button" type="button" data-demo-action="Account recovery is not implemented in this frontend preview.">Manage</button></div><div class="settings-row"><span><strong>Staff permissions</strong><small>Enforce roles on every server request, not only in the interface.</small></span><button class="text-button" type="button" data-view-link="team">Review roles</button></div><div class="settings-row"><span><strong>Business data isolation</strong><small>Each business must only access its own records.</small></span><span class="status-pill">Backend needed</span></div><div class="settings-row"><span><strong>HTTPS, rate limits &amp; secure sessions</strong><small>Required for a production deployment.</small></span><span class="status-pill">Backend needed</span></div></article><article class="panel module-panel"><div class="panel-heading"><div><p class="section-kicker">DATA &amp; PRIVACY</p><h2>Business safeguards</h2></div></div><div class="settings-row"><span><strong>Backups &amp; restoration</strong><small>Schedule protected backups and verify restore procedures.</small></span><button class="text-button" type="button" data-demo-action="Backups and restoration cannot be configured from the static frontend.">Review</button></div><div class="settings-row"><span><strong>Audit history</strong><small>Keep traceable records of sensitive changes.</small></span><button class="text-button" type="button" data-view-link="activity">View activity</button></div><div class="settings-row"><span><strong>Data protection review</strong><small>Assess applicable Kenyan data-protection obligations before launch.</small></span><span class="status-pill">Owner review</span></div><p class="module-notice">This prototype does not store account or business data. Production security and compliance require implementation and review.</p></article></div>`,
};

function setDashboardView(view, addHistoryEntry = true) {
  const selectedView = dashboardViews[view] ? view : "overview";
  const viewDetails = dashboardViews[selectedView];
  const reportsSection = document.querySelector("#reports");
  const lowerSection = document.querySelector(".lower-grid");
  const stockPanel = document.querySelector("#inventory");
  const salesPanel = document.querySelector("#sales");
  const customersPanel = document.querySelector("#customers");
  dashboard.dataset.view = selectedView;
  document.querySelector("#breadcrumb-current").textContent = viewDetails.label;
  document.querySelector("#page-title").textContent = viewDetails.title;
  document.querySelector("#page-subtitle").textContent = viewDetails.subtitle;
  document.querySelector("#business-metrics").hidden = selectedView !== "overview";
  reportsSection.hidden = selectedView !== "overview" && selectedView !== "inventory" && selectedView !== "reports";
  stockPanel.hidden = selectedView !== "overview" && selectedView !== "inventory";
  lowerSection.hidden = selectedView !== "overview" && selectedView !== "sales" && selectedView !== "customers";
  salesPanel.hidden = selectedView !== "overview" && selectedView !== "sales";
  customersPanel.hidden = selectedView !== "overview" && selectedView !== "customers";
  moduleView.hidden = selectedView === "overview";
  moduleView.innerHTML = selectedView === "overview" ? "" : `
    <label class="module-search"><span>Filter this view</span><input type="search" aria-label="Filter this view" placeholder="Search visible records" /></label>
    ${moduleViewContent[selectedView] || ""}`;
  document.querySelector("#open-sale").hidden = selectedView !== "overview" && selectedView !== "sales";
  reportsSection.classList.toggle("single-panel-grid", selectedView === "inventory" || selectedView === "reports");
  lowerSection.classList.toggle("single-panel-grid", selectedView === "sales" || selectedView === "customers");

  dashboardNavLinks.forEach((link) => {
    const isCurrent = link.hash === `#${selectedView}`;
    link.classList.toggle("active", isCurrent);
    if (isCurrent) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  const updateHistory = addHistoryEntry ? "pushState" : "replaceState";
  window.history[updateHistory](null, "", `#${selectedView}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

dashboardNavLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setDashboardView(link.hash.slice(1));
  });
});

moduleView.addEventListener("click", (event) => {
  const action = event.target.closest("[data-demo-action]");
  if (action) {
    showToast(action.dataset.demoAction);
    return;
  }
  const viewLink = event.target.closest("[data-view-link]");
  if (viewLink) setDashboardView(viewLink.dataset.viewLink);
});

moduleView.addEventListener("input", (event) => {
  if (!event.target.matches(".module-search input")) return;
  const query = event.target.value.trim().toLowerCase();
  moduleView.querySelectorAll("tbody tr").forEach((row) => {
    row.hidden = !row.textContent.toLowerCase().includes(query);
  });
});

moduleView.addEventListener("change", (event) => {
  if (!event.target.matches(".workflow-toggle input")) return;
  const state = event.target.checked ? "on" : "off";
  showToast(`Workflow set ${state} in this preview only; no scheduled job was changed.`);
});

window.addEventListener("popstate", () => {
  if (!appShell.hidden) setDashboardView(window.location.hash.slice(1), false);
});

drawChart();

const authShell = document.querySelector("#auth-shell");
const landingShell = document.querySelector("#landing-shell");
const appShell = document.querySelector("#app-shell");
const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");

function showAuthForm(formToShow) {
  landingShell.hidden = true;
  appShell.hidden = true;
  authShell.hidden = false;
  loginForm.hidden = formToShow !== loginForm;
  signupForm.hidden = formToShow !== signupForm;
  document.querySelector("#login-feedback").textContent = "";
  document.querySelector("#signup-feedback").textContent = "";
  formToShow.querySelector("input").focus();
}

function openDashboardDemo() {
  landingShell.hidden = true;
  authShell.hidden = true;
  appShell.hidden = false;
  setDashboardView("overview", false);
  drawChart();
}

document.querySelector("#landing-login").addEventListener("click", () => showAuthForm(loginForm));
document.querySelector("#landing-signup").addEventListener("click", () => showAuthForm(signupForm));
document.querySelector("#landing-start").addEventListener("click", () => showAuthForm(signupForm));
document.querySelector("#landing-demo").addEventListener("click", openDashboardDemo);
document.querySelector("#auth-home").addEventListener("click", () => {
  authShell.hidden = true;
  landingShell.hidden = false;
});
document.querySelector("#auth-brand-home").addEventListener("click", (event) => {
  event.preventDefault();
  authShell.hidden = true;
  landingShell.hidden = false;
});
document.querySelector("#show-signup").addEventListener("click", () => showAuthForm(signupForm));
document.querySelector("#show-login").addEventListener("click", () => showAuthForm(loginForm));
document.querySelector("#open-demo").addEventListener("click", openDashboardDemo);
document.querySelector("#exit-demo").addEventListener("click", () => {
  appShell.hidden = true;
  authShell.hidden = true;
  landingShell.hidden = false;
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#login-feedback").textContent = "Sign-in is a UI preview only; authentication isn't connected yet.";
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const password = signupForm.elements.namedItem("password").value;
  const confirmation = signupForm.elements.namedItem("confirm-password").value;
  if (password !== confirmation) {
    document.querySelector("#signup-feedback").textContent = "Those passwords don't match. Please check and try again.";
    signupForm.elements.namedItem("confirm-password").focus();
    return;
  }
  document.querySelector("#signup-feedback").textContent = "Account creation is a UI preview only; registration isn't connected yet.";
});

document.querySelector("#forgot-password").addEventListener("click", () => {
  document.querySelector("#login-feedback").textContent = "Password recovery isn't connected yet.";
});

document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const passwordInput = button.parentElement.querySelector("input");
    const shouldShow = passwordInput.type === "password";
    passwordInput.type = shouldShow ? "text" : "password";
    button.textContent = shouldShow ? "Hide" : "Show";
    button.setAttribute("aria-label", `${shouldShow ? "Hide" : "Show"} password`);
  });
});