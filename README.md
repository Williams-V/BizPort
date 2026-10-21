# BizPort
# Mzima BizPilot

**A Business Management and Intelligence Platform for Kenyan SMEs**

> Built by Mzima | Turning everyday business records into clearer business decisions.

## 1. Project Overview

**Mzima BizPilot** is a planned, mobile-friendly business management web application designed to help small and medium-sized enterprises (SMEs) in Kenya manage their daily operations, monitor financial performance, control inventory, track customer debts, and make informed business decisions using accurate business records.

Many small businesses manage sales, expenses, stock, supplier payments, and customer credit using notebooks, spreadsheets, calculators, or disconnected applications. This can make it difficult to understand actual business performance, identify stock shortages, follow up on outstanding debts, and maintain reliable records.

Mzima BizPilot aims to bring these activities into one organized system.

The initial target market is **small retail shops and mini-markets in Nairobi, Kenya**, with the possibility of expanding to other business categories after validating the product with real customers.

The platform will use conventional software logic, structured data, financial calculations, reports, and configurable automated workflows. An AI assistant is not part of the current project scope.

### Project status

**Status:** Planning and requirements definition

The features and architecture described in this README represent the intended product and development direction. They should not be interpreted as evidence that every feature has already been implemented or deployed.

## 2. Vision and Mission

### Vision

To make practical, reliable business management technology accessible to Kenyan businesses, helping them operate more efficiently and grow sustainably.

### Mission

To develop an accessible platform that simplifies business record-keeping, improves visibility into sales and expenses, strengthens inventory and debt management, and reduces repetitive administrative work.

## 3. Objectives

Mzima BizPilot aims to:

- Centralize sales, purchases, inventory, expenses, and debt records.
- Help business owners understand sales, costs, and estimated profit.
- Reduce stock discrepancies and prevent avoidable stock shortages.
- Make customer credit and supplier balances easier to track.
- Provide useful reports based on recorded business data.
- Automate repetitive tasks such as scheduled summaries and stock notifications.
- Provide controlled integration capabilities through Model Context Protocol (MCP).
- Protect business information through access controls and secure data handling.
- Offer an interface that works on mobile phones, tablets, and desktop computers.
- Establish a foundation that can support more business types and additional integrations in the future.

## 4. Target Users

### Primary users

- Owners of small retail shops.
- Mini-market and convenience-store operators.
- Small businesses that need basic sales, stock, and financial tracking.
- Shop managers responsible for daily operations.

### Initial market

The initial market is Nairobi, Kenya. The product will be designed around local business needs, including Kenyan shillings (KES), local operating practices, and the realities of small-business record-keeping.

Expansion into other counties and business categories will depend on customer feedback, product performance, and market validation.

## 5. Core Product Features

### 5.1 Dashboard

The dashboard will provide a consolidated overview of business activity.

Planned information includes:

- Sales for the current day and selected periods.
- Recorded operating expenses.
- Estimated gross profit and net operating profit, where the required data is available.
- Outstanding customer debts.
- Outstanding supplier balances.
- Current stock levels.
- Products below their configured stock thresholds.
- Recent transactions.
- Relevant scheduled reminders and workflow status.

Users should be able to filter relevant figures by date range and access the underlying records where appropriate.

**Important:** Revenue, cash received, gross profit, and net profit are different measures. The dashboard must label them correctly and avoid presenting incomplete financial information as confirmed profit.

### 5.2 Sales Management

The sales module will allow authorized users to:

- Record a sale.
- Add one or more products to a transaction.
- Specify quantities and applicable selling prices.
- Calculate subtotals and totals.
- Record discounts when permitted.
- Record the payment method, such as cash, M-Pesa, or another supported method.
- Record fully paid, partially paid, or credit sales.
- View sales history.
- Search and filter transactions.
- View transaction details.
- Record eligible returns or corrections through controlled procedures.

Each transaction should have a unique identifier, timestamp, business association, creator, and item-level details.

Stock quantities and sales records must remain consistent. Failed transactions should not leave partially completed financial or inventory updates.

An M-Pesa label in the initial version will indicate a recorded payment method only. It will not mean the platform has independently verified a payment through Safaricom.

### 5.3 Inventory Management

The inventory module will provide tools to manage products and stock movements.

Planned functionality:

- Create and edit product records.
- Store product names, SKUs or internal codes, categories, buying costs, and selling prices.
- Track current quantities.
- Configure low-stock thresholds.
- Record stock received from suppliers.
- Record stock reductions caused by sales.
- Record authorized adjustments, losses, damage, and returns.
- View stock movement history.
- Identify products that are running low.
- Search and filter products.
- View stock valuation using a clearly defined costing method.

Stock changes should be recorded as traceable movements rather than silently overwriting quantities.

The implementation must define how returns, cancellations, damaged stock, and corrections affect stock balances and financial reports.

### 5.4 Purchases and Suppliers

This module will help businesses record purchases and manage supplier relationships.

Planned functionality:

- Register suppliers and their contact details.
- Record purchases and purchased items.
- Track quantities and purchase costs.
- Record the date of purchase.
- Track amounts paid and amounts outstanding.
- Maintain supplier payment history.
- Display outstanding supplier balances.
- Record eligible purchase returns and corrections.

The system must distinguish a purchase from a supplier payment. Recording a payment should reduce the amount owed without incorrectly recording the same purchase expense a second time.

### 5.5 Expenses Management

Authorized users will be able to record and categorize operating expenses.

Planned functionality:

- Record expense descriptions and amounts.
- Categorize expenses.
- Record dates and payment methods.
- Add optional reference numbers or supporting notes.
- View expense history.
- Filter expenses by category and date range.
- Compare expenses across reporting periods.
- Include eligible expenses in financial reports.

The system should distinguish operating expenses, inventory purchases, owner withdrawals, and other financial movements rather than treating every outgoing payment as an expense.

### 5.6 Customer Credit and Debt Management

This module will help businesses manage customers who purchase goods on credit.

Planned functionality:

- Create customer records.
- Record credit sales.
- Track amounts owed by each customer.
- Record full or partial repayments.
- Maintain a customer account history.
- Display outstanding balances.
- Record agreed due dates.
- Identify overdue balances.
- Generate configurable payment reminders.
- View customer debt reports.

Repayments must reduce outstanding debt without incorrectly counting the repayment as a second sale.

Customer-facing reminders should only be sent through configured channels, with appropriate permissions and safeguards against duplicate messages.

### 5.7 Reports and Business Performance

The reporting module will turn recorded transactions into structured business reports using conventional calculations and defined business rules.

Planned reports include:

- Daily, weekly, and monthly sales summaries.
- Sales by product and category.
- Expense summaries by category.
- Gross profit reports where cost data is available.
- Estimated net operating profit reports.
- Inventory and stock movement reports.
- Low-stock reports.
- Customer debt and overdue balance reports.
- Supplier balance reports.
- Purchase summaries.
- Comparison between selected reporting periods.

Reports must show their date ranges, calculation definitions, and relevant limitations.

Financial results should be calculated from the underlying records rather than hard-coded values or unverified assumptions.

### 5.8 Search, Filtering, and History

The platform should provide consistent search and filtering across important records.

Users with the appropriate permissions should be able to find transactions, products, customers, suppliers, expenses, and stock movements.

Important records should retain timestamps and relevant audit information. Changes to financial records should be traceable.

### 5.9 Notifications and Reminders

The notification system will support configurable operational reminders, including:

- Low-stock alerts.
- Daily business summaries.
- Weekly business reports.
- Upcoming or overdue customer payments.
- Selected operational notifications.

The initial delivery channels should be chosen based on implementation cost, reliability, and customer needs. Email is a possible starting point; SMS and WhatsApp integrations may be introduced later.

The platform must not promise delivery through an external service until that integration is configured and tested.

## 6. Automated Workflows

Automation is a core part of BizPilot. It will reduce repetitive tasks through explicit rules and controlled background processing.

### Workflow 1: Low-stock alert

**Trigger:** A product's available quantity reaches or falls below its configured threshold.

**Process:**
1. Record the stock movement.
2. Recalculate the current quantity.
3. Compare the quantity with the configured threshold.
4. Create a notification or alert.
5. Prevent repeated notifications for the same unresolved condition unless a new alert is justified.

**Result:** The owner or authorized manager can identify products that may require restocking.

### Workflow 2: Daily business summary

**Trigger:** A configured daily closing time.

**Process:**
1. Select transactions for the relevant business and reporting date.
2. Calculate sales, recorded expenses, relevant payment totals, and available profit measures.
3. Generate a structured summary.
4. Save the report or deliver it through the owner's configured channel.
5. Log the result and any delivery failure.

The summary must use the business's configured time zone and must not describe sales totals as profit.

### Workflow 3: Customer payment reminder

**Trigger:** A customer debt reaches its configured reminder date or becomes overdue.

**Process:**
1. Check the debt balance and due date.
2. Confirm that the reminder is enabled and the destination is available.
3. Check whether the same reminder has already been processed.
4. Send or queue the approved reminder.
5. Record the attempt and result.

Owners must have appropriate control over reminder settings. Messages should be respectful, accurate, and limited to the information necessary for the reminder.

### Workflow 4: Weekly report

**Trigger:** A configured weekly schedule.

**Process:**
1. Retrieve the relevant week's records.
2. Calculate the selected performance measures.
3. Compare periods where meaningful data exists.
4. Generate a structured report.
5. Save or deliver the report.
6. Record success or failure.

All summaries and reports will be generated through deterministic calculations and defined rules. AI-generated business advice is outside the current scope.

### Workflow reliability requirements

All automated workflows should support:

- Configurable schedules and business preferences.
- Retry handling for temporary failures.
- Duplicate prevention and idempotency.
- Logging and monitoring.
- Clear failure states.
- Safe handling of time zones and reporting periods.
- Appropriate permissions for external communications.
- Tests for missed, repeated, and delayed events.

A simple scheduler may be sufficient for the initial MVP. A queue and worker system such as Celery with Redis can be introduced if the project's workload requires it.

## 7. MCP Integration

### What MCP means for BizPilot

Model Context Protocol (MCP) is a standard for exposing selected application capabilities and data to compatible external clients.

BizPilot will plan for an MCP server that provides controlled access to approved business information. MCP is an integration capability, not a requirement for ordinary shop owners to use an AI assistant.

The core web application must remain fully usable without MCP.

### Initial MCP design

The first MCP implementation should prioritize read-only tools such as:

- `get_sales_summary` — retrieve an authorized business's sales totals for a specified period.
- `get_profit_report` — retrieve calculated profit measures and relevant calculation limitations.
- `list_low_stock_products` — list products below configured stock thresholds.
- `get_outstanding_customer_debts` — retrieve permitted outstanding debt information.
- `get_expense_summary` — retrieve expense totals for a specified period.

The final tool names, parameters, return formats, and permissions must be documented before implementation.

### MCP security requirements

- Authenticate MCP clients where required by the integration design.
- Enforce business-level data isolation.
- Apply authorization checks to every tool call.
- Validate all input parameters.
- Limit returned data to what the requesting user is permitted to access.
- Avoid exposing secrets, passwords, tokens, or unnecessary personal information.
- Log appropriate access and error information.
- Use read-only tools initially.

Write-capable MCP tools, such as creating sales or recording payments, should not be introduced without a separate security review, strict authorization, validation, and safeguards against duplicate or unintended actions.

MCP must not bypass the application's normal business rules or permissions.

## 8. User Roles and Permissions

BizPilot will use role-based access control. The following roles describe the intended system permissions and responsibilities.

| Role | Main responsibilities and access |
|---|---|
| **Business Owner** | Full control of their business account, business settings, staff access, reports, products, sales, purchases, expenses, debts, and integrations. |
| **Business Manager** | Manage daily operations, oversee sales and stock, review reports, coordinate staff, and manage permitted records. Access to sensitive settings depends on the owner's permissions. |
| **Cashier / Sales Attendant** | Record sales, view relevant product information, and handle permitted transactions. Restricted from sensitive financial settings, user management, and unauthorized changes. |
| **Inventory Clerk** | Manage permitted product records, record stock received and authorized stock movements, and review stock alerts. Financial and user-management access is restricted. |
| **Accountant / Bookkeeper** | Access permitted financial records, expenses, supplier balances, customer debts, and reports. May reconcile records and make authorized corrections without automatically receiving full administrative control. |
| **Read-Only Viewer** | View only the information explicitly granted by the owner or administrator. Cannot create, edit, delete, approve, or send records. |
| **Platform Administrator** | Maintain the overall application, manage technical operations, monitor system health, and handle authorized support tasks. Access to customers' business data must be limited, justified, controlled, and audited. |

### Role design principles

- A user may have access to more than one role if permitted by the system.
- Permissions must be enforced by the backend, not merely hidden in the frontend.
- Every business must have isolated users, records, and permissions.
- The business owner must be able to grant or revoke staff access.
- Sensitive actions should require additional authorization where appropriate.
- Platform administration must not automatically grant unrestricted access to every customer's private business records.
- Roles and permissions must be tested against unauthorized access attempts.

### Important actions requiring additional controls

Depending on the final requirements, these may include:

- Changing selling prices or discounts beyond an allowed limit.
- Adjusting stock without a corresponding reason.
- Editing or reversing completed transactions.
- Writing off customer debt.
- Recording supplier payment corrections.
- Exporting sensitive financial data.
- Changing staff permissions.
- Configuring external integrations.

The system should use traceable reversals and corrections instead of silently deleting important financial history.

## 9. Technical Stack

The planned stack is as follows:

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js and React | Responsive user interface and application screens |
| Frontend language | JavaScript or TypeScript | Application logic and component development |
| Backend | Python and FastAPI | Business rules, API endpoints, authentication, and validation |
| Database | PostgreSQL | Persistent business and transactional data |
| ORM and migrations | SQLAlchemy and Alembic, subject to final confirmation | Database access and schema changes |
| Version control | Git and GitHub | Collaboration, code review, branches, and version history |
| Frontend hosting | Vercel, subject to deployment configuration | Hosting the web interface |
| Backend hosting | A suitable Python-compatible hosting provider | Hosting the API and related backend processes |
| Scheduled processing | Python scheduler initially; queue and workers if needed | Automated reports, alerts, and background tasks |
| MCP | Python-compatible MCP implementation | Controlled access to approved application tools |
| Testing | Pytest and suitable frontend testing tools | Backend, frontend, integration, and regression testing |

These are planned technologies. Final dependency versions and hosting choices should be recorded when the development environment is established.

## 10. Proposed System Architecture

The system will be divided into clear components.

### Frontend

Responsible for:

- Login and account screens.
- Dashboard and reports.
- Sales and purchase forms.
- Product and inventory screens.
- Customer and supplier management.
- Expense and debt screens.
- Staff management and permissions interfaces.
- Notification settings.

### Backend API

Responsible for:

- Authentication and authorization.
- Business and tenant isolation.
- Input validation.
- Sales and purchase processing.
- Financial calculations.
- Inventory consistency.
- Customer and supplier balances.
- Report generation.
- Notification configuration.
- Audit logging.
- Controlled access to MCP tools.

### Database

Responsible for reliably storing business records and their relationships, with appropriate constraints and transaction handling.

### Automation workers

Responsible for scheduled and event-driven jobs, report generation, notification processing, retry handling, and job status tracking.

### MCP server

Responsible for exposing approved tools to compatible clients through a separate, controlled integration layer.

### High-level request flow

```text
User
  |
  v
Next.js / React Frontend
  |
  v
FastAPI Backend
  |
  +------ Authentication and Permissions
  |
  +------ Business Rules and Calculations
  |
  +------ PostgreSQL Database
  |
  +------ Automation Scheduler / Workers
  |
  +------ Controlled MCP Integration
```

The frontend must not connect directly to PostgreSQL. Sensitive operations must pass through backend validation and authorization.

## 11. Database Design

The final schema will be developed during requirements and database design. The following entities are expected to be considered.

| Entity | Purpose |
|---|---|
| Users | User accounts and authentication references |
| Businesses | Business profiles, settings, currency, and time zone |
| Memberships | User-to-business relationships and assigned roles |
| Roles and Permissions | Access-control definitions |
| Products | Product descriptions, SKUs, prices, and stock settings |
| Categories | Product classification |
| Sales | Transaction-level sale records |
| Sale Items | Products, quantities, and prices associated with each sale |
| Payments | Recorded payments and payment allocations |
| Suppliers | Supplier details |
| Purchases | Supplier purchase records |
| Purchase Items | Products, quantities, and costs for each purchase |
| Customers | Customer records |
| Customer Debts | Outstanding credit balances and due dates |
| Expenses | Categorized operating expenses |
| Stock Movements | Traceable changes to inventory quantities |
| Notifications | Notification records and delivery status |
| Workflow Jobs | Scheduled job details, execution status, and retry information |
| Audit Logs | Records of important actions and changes |
| MCP Access Records | Appropriate records of integration access and relevant errors |

The precise entities and relationships may change as requirements are validated.

### Database principles

- Every business-owned record must be associated with the correct business.
- Use appropriate foreign keys, unique constraints, and database transactions.
- Store monetary values using precise decimal or integer-based representations, not binary floating-point arithmetic.
- Store timestamps consistently and apply the business's configured time zone when presenting reports.
- Use database migrations to track schema changes.
- Use indexes for common searches, date filters, and business-scoped queries.
- Avoid permanently deleting important financial records where a reversal or archival procedure is more appropriate.
- Define retention and deletion procedures for personal information.

## 12. Financial Calculation Rules

Reliable reporting depends on agreed definitions.

### Sales revenue

Revenue from completed sales, based on the project's agreed treatment of discounts, returns, and transaction status.

### Cost of goods sold

The cost assigned to goods sold during the reporting period, using a documented inventory costing method.

### Gross profit

**Gross profit = Net sales revenue − Cost of goods sold**

### Net operating profit

**Net operating profit = Gross profit − Eligible operating expenses**

This simplified formula must be adapted to the accounting scope and must not be presented as a complete statutory accounting or tax calculation.

### Customer outstanding balance

The amount owed by a customer, calculated from applicable credit transactions, repayments, adjustments, and reversals.

### Supplier outstanding balance

The amount owed to a supplier, calculated from recorded purchases, payments, credits, and adjustments.

### Calculation safeguards

- Do not double-count purchases and supplier payments.
- Do not count debt repayments as new sales.
- Exclude cancelled or reversed transactions from applicable totals.
- Apply returns and discounts consistently.
- Distinguish cash movement from recognized revenue and profit.
- Clearly indicate when costs or other data are missing.
- Test formulas against manually verified example transactions.

## 13. Security, Privacy, and Compliance

BizPilot will handle potentially sensitive business and customer information. Security and privacy must be built into the application from the beginning.

Planned safeguards include:

- Secure authentication and password handling.
- Backend-enforced role-based permissions.
- Strict business-level data isolation.
- HTTPS for deployed environments.
- Secure management of API keys, database credentials, and other secrets.
- Input validation and appropriate output handling.
- Protection against common web vulnerabilities.
- Rate limiting where appropriate.
- Audit trails for important actions.
- Regular database backups and tested restoration procedures.
- Restricted administrative access.
- Safe error messages that do not expose secrets or internal details.
- Secure session and token management.
- A documented process for incident response and account recovery.

### Kenyan data protection considerations

The project must assess its obligations under Kenya's Data Protection Act, 2019, and applicable regulations. This includes evaluating the lawful basis for processing personal data, transparency, data minimization, retention, security, data-subject rights, and any applicable registration or other compliance requirements.

The team should assess whether a Data Protection Impact Assessment or additional safeguards are necessary for the actual processing activities.

The README is a technical planning document, not a legal compliance certification.

## 14. Testing and Quality Assurance

Testing must cover individual components and the full business workflow.

### Backend testing

- Authentication and authorization.
- Sales creation and validation.
- Inventory updates.
- Expense recording.
- Purchase processing.
- Debt and payment calculations.
- Report accuracy.
- Business data isolation.
- API error handling.

### Frontend testing

- Forms and validation messages.
- Responsive layouts.
- Navigation.
- Search and filters.
- Dashboard calculations as displayed by the interface.
- Role-specific screen access.
- Loading, empty, and error states.

### Integration testing

- Frontend-to-backend communication.
- Database transaction integrity.
- Sales and stock consistency.
- Purchases and supplier balances.
- Customer debt and repayment flows.
- Scheduled reports and notifications.
- MCP authentication and tool permissions.

### Automation testing

- Jobs execute at the configured times.
- Failed jobs can be retried safely.
- Duplicate notifications are prevented.
- Incorrect or missing data is handled properly.
- External service failures do not corrupt business records.

### Acceptance testing

Before a release, the team should test complete scenarios using realistic sample data and verify the results manually.

No production release should depend solely on the fact that the application starts successfully.

## 15. Development-Team Roles

The project will be developed collaboratively, with clear ownership of responsibilities. Team members may take on multiple roles depending on their skills and availability.

### 15.1 Project Lead / Product Owner

**Main responsibility:** Keep the team aligned with the product's objectives and user needs.

Responsibilities:

- Define and prioritize product requirements.
- Maintain the project backlog and roadmap.
- Coordinate the development team.
- Make or coordinate product-scope decisions.
- Track progress and risks.
- Organize customer interviews and feedback.
- Confirm acceptance criteria before features are marked complete.
- Ensure the product solves a validated business problem.

### 15.2 Frontend Developer

**Main responsibility:** Build the user-facing web application.

Responsibilities:

- Develop the Next.js and React application.
- Implement responsive screens and navigation.
- Build dashboard, sales, inventory, expenses, debts, and reports interfaces.
- Connect frontend components to the FastAPI backend.
- Implement form validation and error handling.
- Respect backend-enforced permissions in the user interface.
- Improve usability and accessibility.
- Write and maintain frontend tests.

### 15.3 Backend Developer

**Main responsibility:** Implement the business logic and API.

Responsibilities:

- Build FastAPI endpoints.
- Implement authentication and authorization.
- Define request and response schemas.
- Validate business transactions.
- Implement sales, purchases, stock, expenses, debts, and reports.
- Enforce tenant isolation.
- Implement financial calculations.
- Handle database transactions and error responses.
- Maintain API documentation and backend tests.

### 15.4 Database Engineer / Data Model Owner

**Main responsibility:** Ensure that business data is structured and stored reliably.

Responsibilities:

- Design the database schema.
- Define relationships, constraints, and indexes.
- Establish migration procedures.
- Review transaction integrity.
- Support data consistency and reporting requirements.
- Plan backups and recovery.
- Review queries for correctness and performance.
- Help establish retention and data-deletion procedures.

This responsibility may initially be handled by the backend developer.

### 15.5 Automation and Integration Engineer

**Main responsibility:** Build reliable scheduled tasks and external integrations.

Responsibilities:

- Implement low-stock alerts.
- Implement scheduled daily and weekly reports.
- Implement customer payment reminders.
- Configure job scheduling and background processing.
- Implement retry logic and duplicate prevention.
- Integrate approved notification channels.
- Monitor failed jobs and delivery outcomes.
- Document integration dependencies and failure handling.

### 15.6 MCP Integration Engineer

**Main responsibility:** Expose approved BizPilot capabilities through MCP.

Responsibilities:

- Define the MCP server architecture.
- Implement approved read-only tools.
- Validate tool parameters.
- Enforce authentication and permissions.
- Prevent unauthorized cross-business access.
- Document tool inputs, outputs, and errors.
- Test MCP behavior with compatible clients.
- Maintain clear boundaries between the MCP layer and core business logic.

This role can be combined with backend development or automation engineering. It does not require building an AI assistant into BizPilot.

### 15.7 UI/UX Designer

**Main responsibility:** Make the product practical and easy to use.

Responsibilities:

- Research how target businesses currently manage operations.
- Design user journeys and screen layouts.
- Create wireframes and prototypes.
- Define reusable interface components.
- Test usability with representative users.
- Ensure common tasks can be completed efficiently on mobile devices.
- Identify confusing forms, labels, and financial summaries.

### 15.8 QA Engineer / Tester

**Main responsibility:** Verify that the system works correctly and securely.

Responsibilities:

- Write test cases and acceptance scenarios.
- Test features against requirements.
- Validate financial calculations.
- Test role permissions and business isolation.
- Reproduce and document defects.
- Perform regression testing.
- Test automation failure scenarios.
- Verify fixes before release.

### 15.9 DevOps and Security Engineer

**Main responsibility:** Support safe deployment, infrastructure, and operational reliability.

Responsibilities:

- Configure development, staging, and production environments.
- Manage deployment pipelines.
- Configure environment variables and secrets.
- Set up monitoring and logging.
- Establish backup and recovery procedures.
- Review dependency and infrastructure security.
- Manage hosting and database configuration.
- Support incident response and deployment rollback.

This responsibility may initially be shared by experienced backend and project team members.

### 15.10 Business Research and Customer Validation Lead

**Main responsibility:** Establish whether the proposed product solves a problem customers will pay to solve.

Responsibilities:

- Research competing products and alternatives.
- Interview shop owners and staff.
- Document current record-keeping practices.
- Identify operational problems and unmet needs.
- Test willingness to pay.
- Evaluate possible pricing models.
- Organize a pilot with selected businesses.
- Collect feedback and prioritize improvements.

### Team working principles

- Every feature must have a clear owner.
- Work should be divided into small, reviewable tasks.
- All contributors should use Git branches and pull requests.
- Changes affecting shared interfaces or database schemas should be communicated before implementation.
- Code should be reviewed before merging into the main branch.
- Sensitive credentials must never be committed to GitHub.
- Feature completion requires appropriate testing and documented acceptance criteria.
- The team should not assume that a planned feature is complete until it has been implemented and verified.

## 16. Development Workflow

The project will use Git and GitHub for collaboration.

### Suggested branch structure

- `main` — stable, reviewed code.
- `develop` — integration branch if the team chooses to use one.
- `feat/<feature-name>` — new features.
- `fix/<issue-name>` — bug fixes.
- `docs/<change-name>` — documentation changes.

The team should agree on one branching strategy and apply it consistently.

### Pull request process

1. Create a branch from the agreed base branch.
2. Implement one clearly defined task.
3. Run relevant tests.
4. Commit changes with descriptive messages.
5. Push the branch to GitHub.
6. Open a pull request.
7. Review code, requirements, and potential regressions.
8. Resolve feedback and merge after approval.

Existing Mzima website code and deployment configuration must not be changed unintentionally. BizPilot should use an explicitly agreed repository and branch structure.

## 17. Suggested Repository Structure

The following is a proposed structure, not a description of files that already exist.

```text
mzima-bizpilot/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   └── tests/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── permissions/
│   │   └── main.py
│   ├── migrations/
│   └── tests/
│
├── automation/
│   ├── jobs/
│   ├── notifications/
│   ├── scheduler/
│   └── tests/
│
├── mcp-server/
│   ├── tools/
│   ├── security/
│   └── tests/
│
├── docs/
│   ├── requirements.md
│   ├── database-design.md
│   ├── api-specification.md
│   ├── permissions.md
│   ├── automation-workflows.md
│   ├── mcp-specification.md
│   ├── security.md
│   └── testing-plan.md
│
├── .gitignore
├── README.md
└── LICENSE
```

The exact structure may be adjusted to fit the agreed deployment approach and team workflow. A monorepo is a reasonable starting point, but the team should confirm it before creating project files.

## 18. Implementation Roadmap

### Phase 1: Requirements and market validation

- Research existing solutions and competing products.
- Interview representative Nairobi shop owners.
- Identify the most important daily business problems.
- Document user journeys and feature requirements.
- Agree on MVP scope and acceptance criteria.
- Define initial pricing hypotheses for validation.

**Deliverable:** Validated requirements and a prioritized product backlog.

### Phase 2: UI/UX and database design

- Design the main application screens.
- Define user roles and permissions.
- Create wireframes and navigation flows.
- Design the database schema and relationships.
- Document financial formulas and transaction rules.
- Define the API contract.

**Deliverable:** Reviewed interface designs, database plan, permissions matrix, and API specification.

### Phase 3: Core backend and database

- Set up FastAPI and PostgreSQL.
- Implement authentication and business isolation.
- Implement database migrations.
- Build product, sales, inventory, purchase, expense, and debt services.
- Implement financial calculations and reporting endpoints.
- Write automated backend tests.

**Deliverable:** A tested backend for the core business workflows.

### Phase 4: Frontend development

- Build the application layout and navigation.
- Implement login and account screens.
- Build dashboard and operational modules.
- Connect forms and screens to the API.
- Implement loading, empty, and error states.
- Test responsive layouts and role-specific access.

**Deliverable:** A functional web application connected to the backend.

### Phase 5: Automation

- Implement the workflow scheduler.
- Build low-stock notifications.
- Build daily and weekly reports.
- Build configurable customer payment reminders.
- Add retries, duplicate prevention, and logging.

**Deliverable:** Tested operational automation.

### Phase 6: MCP integration

- Finalize the tool specification.
- Implement the MCP server.
- Add authorization and data filtering.
- Test the initial read-only tools.
- Document supported clients and limitations.

**Deliverable:** A controlled and documented MCP integration.

### Phase 7: Quality assurance and pilot

- Run end-to-end tests.
- Verify financial calculations.
- Test permissions and tenant isolation.
- Test backup restoration and failure recovery.
- Pilot the product with a small group of consenting businesses.
- Collect feedback and fix high-priority issues.

**Deliverable:** A pilot-ready release with documented known limitations.

### Phase 8: Launch and improvement

- Finalize hosting and production configuration.
- Publish user documentation.
- Monitor errors and performance.
- Review pilot feedback.
- Improve usability and reliability.
- Evaluate additional integrations and business categories.

**Deliverable:** A production release supported by an ongoing improvement process.

## 19. Deployment Strategy

The planned deployment approach is:

- **Frontend:** Vercel or another suitable Next.js host.
- **Backend:** A Python-compatible hosting service.
- **Database:** A managed PostgreSQL service where practical.
- **Background jobs:** A worker process or suitable scheduled-job service.
- **Secrets:** Hosting environment variables or a dedicated secrets manager.
- **Monitoring:** Application logs, error reporting, and service health checks.

The frontend, API, database, and background workers must be configured to communicate securely.

Production and development credentials must be separate. Database migrations should be reviewed before production changes, and a rollback or recovery procedure should be available.

A successful frontend deployment does not automatically mean the API, database, scheduled jobs, or MCP server are deployed and working.

## 20. MVP Scope and Exclusions

### Included in the planned MVP

- Business account and staff permissions.
- Dashboard.
- Sales recording.
- Product and inventory management.
- Supplier and purchase records.
- Expense tracking.
- Customer credit and repayments.
- Financial summaries and reports.
- Low-stock alerts.
- Scheduled business summaries.
- Configurable debt reminders.
- Basic audit logging.
- Initial read-only MCP tools, once the core application is stable.

### Not included in the current scope

- An AI assistant or conversational AI interface.
- LLM-generated business advice or insights.
- Autonomous AI decision-making.
- Unverified M-Pesa payment processing.
- Direct bank integrations.
- Complex enterprise accounting or payroll.
- Tax filing or claims of statutory accounting compliance.
- Multiple business-industry-specific modules before the retail MVP is validated.
- Uncontrolled MCP tools that can modify business records.

These exclusions can be reconsidered later through an explicit product decision.

## 21. Risks and Mitigation

| Risk | Planned mitigation |
|---|---|
| Building features customers do not need | Validate requirements through interviews and a pilot. |
| Incorrect profit calculations | Document formulas and test them against verified examples. |
| Inconsistent inventory records | Use transactional updates and traceable stock movements. |
| Unauthorized access | Enforce backend permissions and business-level isolation. |
| Duplicate notifications | Implement idempotency and notification history. |
| Failed scheduled jobs | Add retries, logs, monitoring, and failure alerts. |
| Unreliable external integrations | Validate integration responses and handle outages safely. |
| Hosting costs increasing | Monitor usage and select infrastructure appropriate to the workload. |
| Scope becoming too large | Prioritize the MVP and require approval for scope changes. |
| Customer reluctance to adopt the system | Keep common workflows simple and test usability with actual users. |

## 22. Success Metrics

The product should be evaluated using measurable outcomes, including:

- Number of businesses that complete onboarding.
- Number of businesses actively using the system.
- Frequency of sales and stock records being entered.
- Accuracy of reports compared with verified source records.
- Reduction in missing or inconsistent business records.
- Reliability of scheduled workflows.
- Rate of successful notification delivery.
- Time required to complete common tasks.
- Customer retention and satisfaction.
- Willingness to pay and conversion from pilot to paid usage.
- Support requests and recurring usability problems.

Targets should be set after baseline research and early pilot results rather than invented before the product is tested.

## 23. Future Enhancements

Potential future enhancements, subject to customer demand and technical feasibility, include:

- Authorized M-Pesa API integration.
- SMS and WhatsApp notifications.
- Receipt generation and printing.
- Barcode scanning.
- Multi-branch business management.
- Data export and import.
- Supplier ordering workflows.
- More advanced inventory valuation.
- Additional integrations through MCP.
- More detailed reporting and reconciliation.
- Additional business-specific modules.

Each enhancement should be prioritized based on user value, implementation effort, cost, and security implications.

## 24. Contribution Guidelines

Contributors should:

- Follow the agreed repository and branch strategy.
- Keep changes focused and reviewable.
- Follow the project's code conventions.
- Add or update tests when changing behavior.
- Document new API endpoints, workflows, and configuration.
- Avoid committing credentials or private customer information.
- Use pull requests for shared code changes.
- Obtain review for database migrations and permission changes.
- Update this README when agreed project scope or implementation status changes.

## 25. Project Governance

Product scope, architecture, and deployment decisions should be documented so the whole team works from the same source of truth.

Requirements should distinguish between:

- **Planned:** Agreed as part of the intended product.
- **In progress:** Currently being implemented.
- **Implemented:** Code exists and has been reviewed.
- **Tested:** Relevant tests have passed.
- **Released:** Available in the intended environment.

A feature should not be described as production-ready merely because development has started or its interface exists.

## 26. License and Ownership

The project's intellectual property ownership, contribution terms, and distribution permissions must be documented explicitly.

If Mzima intends to keep BizPilot proprietary, the repository should use an appropriate proprietary license notice approved by the project owners. A README alone does not establish all legal ownership rights or replace the actual `LICENSE` file.

Third-party libraries and services must be used in accordance with their applicable licenses and terms.

## 27. About Mzima

**Mzima** is the software company behind the BizPilot project. The project is intended to apply practical software engineering to real operational problems faced by Kenyan businesses.

BizPilot will be developed through collaborative planning, implementation, testing, and feedback from the businesses it aims to serve.

## 28. Final Project Principle

Mzima BizPilot should prioritize **accuracy, usability, security, and real customer value** over unnecessary complexity.

The objective is not simply to build a large collection of features. It is to build a dependable system that helps a business owner understand what has happened in the business, identify what requires attention, maintain better records, and manage everyday operations more effectively.

---

**Project:** Mzima BizPilot  
**Organization:** Mzima  
**Initial market:** Small retail shops and mini-markets in Nairobi, Kenya  
**Platform:** Mobile-friendly web application  
**Core stack:** Next.js, React, Python, FastAPI, PostgreSQL  
**Integration approach:** Controlled MCP server and automated workflows  
**AI assistant:** Not included in the current scope  
**Current status:** Planning and requirements definition
