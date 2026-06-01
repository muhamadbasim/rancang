import type {
  DomainKey,
  Integration,
  SchemaTable,
  UserRole,
  WorkflowStep,
} from "./types";

export interface DomainTemplate {
  label: string;
  defaultName: string;
  roles: UserRole[];
  schema: SchemaTable[];
  workflow: WorkflowStep[];
  integrations: Integration[];
  acceptanceCriteria: string[];
  summaryFrame: string; // used to frame the product summary paragraph
}

const baseAuthTable: SchemaTable = {
  name: "users",
  columns: [
    { name: "id", type: "uuid", note: "PK" },
    { name: "email", type: "text", note: "unique" },
    { name: "password_hash", type: "text" },
    { name: "full_name", type: "text" },
    { name: "role", type: "text", note: "enum reference" },
    { name: "created_at", type: "timestamptz", note: "default now()" },
  ],
  relations: ["has many sessions"],
};

export const TEMPLATES: Record<DomainKey, DomainTemplate> = {
  crm: {
    label: "CRM",
    defaultName: "LeanCRM",
    summaryFrame:
      "a lean CRM that helps a small team capture leads, move deals through clear stages, schedule follow-ups, and forecast monthly revenue",
    roles: [
      { name: "Admin", permissions: ["manage users", "configure pipeline stages", "view all deals", "export reports"] },
      { name: "Sales Rep", permissions: ["create/edit own leads", "move deals", "log follow-ups", "view own forecast"] },
      { name: "Manager", permissions: ["view team deals", "reassign leads", "view team forecast"] },
    ],
    schema: [
      baseAuthTable,
      {
        name: "contacts",
        columns: [
          { name: "id", type: "uuid", note: "PK" },
          { name: "name", type: "text" },
          { name: "company", type: "text" },
          { name: "email", type: "text" },
          { name: "phone", type: "text" },
          { name: "owner_id", type: "uuid", note: "FK -> users.id" },
          { name: "created_at", type: "timestamptz" },
        ],
        relations: ["belongs to users (owner)", "has many deals"],
      },
      {
        name: "deals",
        columns: [
          { name: "id", type: "uuid", note: "PK" },
          { name: "contact_id", type: "uuid", note: "FK -> contacts.id" },
          { name: "title", type: "text" },
          { name: "value", type: "numeric(12,2)" },
          { name: "stage", type: "text", note: "enum: new|qualified|proposal|won|lost" },
          { name: "expected_close", type: "date" },
          { name: "owner_id", type: "uuid", note: "FK -> users.id" },
          { name: "created_at", type: "timestamptz" },
        ],
        relations: ["belongs to contacts", "has many activities"],
      },
      {
        name: "activities",
        columns: [
          { name: "id", type: "uuid", note: "PK" },
          { name: "deal_id", type: "uuid", note: "FK -> deals.id" },
          { name: "type", type: "text", note: "enum: call|email|meeting|note" },
          { name: "due_at", type: "timestamptz" },
          { name: "done", type: "boolean", note: "default false" },
          { name: "notes", type: "text" },
        ],
        relations: ["belongs to deals"],
      },
    ],
    workflow: [
      { order: 1, title: "Capture lead", detail: "A new contact is created manually or via web form; system assigns an owner." },
      { order: 2, title: "Qualify", detail: "Rep reviews the lead and creates a deal at stage 'qualified' with an estimated value." },
      { order: 3, title: "Advance pipeline", detail: "Deals move through proposal → won/lost; each stage change is timestamped." },
      { order: 4, title: "Schedule follow-up", detail: "Rep logs an activity with a due date; overdue activities surface on the dashboard." },
      { order: 5, title: "Forecast", detail: "System sums weighted deal values by expected close date to project monthly revenue." },
    ],
    integrations: [
      { name: "Email (SMTP / Resend)", purpose: "send follow-up emails and reminders", category: "email" },
      { name: "Google Calendar", purpose: "sync meeting activities", category: "other" },
      { name: "WhatsApp Business API", purpose: "send follow-up messages to leads", category: "messaging" },
    ],
    acceptanceCriteria: [
      "A rep can create a contact and an associated deal in under 30 seconds.",
      "Moving a deal between stages updates the pipeline board without a full page reload.",
      "Overdue follow-ups are highlighted on the dashboard with a count badge.",
      "The forecast view shows projected revenue for the current and next month with weighted probabilities.",
      "Managers can view, but reps cannot edit, deals they do not own.",
    ],
  },

  booking: {
    label: "Booking",
    defaultName: "BookFlow",
    summaryFrame:
      "an appointment booking system where customers self-schedule available slots, pay or confirm, and staff manage the daily calendar",
    roles: [
      { name: "Customer", permissions: ["browse availability", "book/cancel own appointment", "receive reminders"] },
      { name: "Staff / Provider", permissions: ["set availability", "view own schedule", "mark appointments complete"] },
      { name: "Admin", permissions: ["manage services", "manage staff", "view all bookings", "configure payment"] },
    ],
    schema: [
      baseAuthTable,
      {
        name: "services",
        columns: [
          { name: "id", type: "uuid", note: "PK" },
          { name: "name", type: "text" },
          { name: "duration_min", type: "integer" },
          { name: "price", type: "numeric(10,2)" },
          { name: "active", type: "boolean", note: "default true" },
        ],
        relations: ["has many appointments"],
      },
      {
        name: "availability",
        columns: [
          { name: "id", type: "uuid", note: "PK" },
          { name: "staff_id", type: "uuid", note: "FK -> users.id" },
          { name: "weekday", type: "smallint", note: "0=Sun..6=Sat" },
          { name: "start_time", type: "time" },
          { name: "end_time", type: "time" },
        ],
        relations: ["belongs to users (staff)"],
      },
      {
        name: "appointments",
        columns: [
          { name: "id", type: "uuid", note: "PK" },
          { name: "service_id", type: "uuid", note: "FK -> services.id" },
          { name: "staff_id", type: "uuid", note: "FK -> users.id" },
          { name: "customer_id", type: "uuid", note: "FK -> users.id" },
          { name: "starts_at", type: "timestamptz" },
          { name: "status", type: "text", note: "enum: pending|confirmed|completed|cancelled" },
          { name: "payment_status", type: "text", note: "enum: unpaid|paid|refunded" },
        ],
        relations: ["belongs to services", "belongs to users (staff & customer)"],
      },
    ],
    workflow: [
      { order: 1, title: "Pick a service", detail: "Customer selects a service; system shows duration and price." },
      { order: 2, title: "Choose a slot", detail: "Available slots are computed from staff availability minus existing appointments." },
      { order: 3, title: "Confirm & pay", detail: "Customer confirms; optional QRIS/online payment marks payment_status." },
      { order: 4, title: "Reminders", detail: "System sends a reminder 24h and 1h before the appointment." },
      { order: 5, title: "Complete", detail: "Staff marks the appointment complete; no-shows are flagged." },
    ],
    integrations: [
      { name: "QRIS / Midtrans", purpose: "accept online payment at booking", category: "payment" },
      { name: "WhatsApp / SMS", purpose: "send booking confirmations and reminders", category: "messaging" },
      { name: "Google Calendar", purpose: "publish staff schedules", category: "other" },
    ],
    acceptanceCriteria: [
      "A customer can complete a booking in 4 taps or fewer from the service list.",
      "The system never offers a slot that overlaps an existing confirmed appointment.",
      "Cancelling within the allowed window frees the slot immediately.",
      "Reminders are sent at 24h and 1h before the start time.",
      "Admin can deactivate a service without breaking historical appointment records.",
    ],
  },

  inventory: {
    label: "Inventory",
    defaultName: "StockPulse",
    summaryFrame:
      "a real-time inventory dashboard for a store that tracks stock levels, logs sales and restocks, and alerts on low stock",
    roles: [
      { name: "Owner", permissions: ["view dashboard", "manage products", "view reports", "manage staff"] },
      { name: "Cashier", permissions: ["record sales", "view stock", "create restock requests"] },
      { name: "Stock Keeper", permissions: ["receive stock", "adjust counts", "manage suppliers"] },
    ],
    schema: [
      baseAuthTable,
      {
        name: "products",
        columns: [
          { name: "id", type: "uuid", note: "PK" },
          { name: "sku", type: "text", note: "unique" },
          { name: "name", type: "text" },
          { name: "category", type: "text" },
          { name: "unit_price", type: "numeric(10,2)" },
          { name: "qty_on_hand", type: "integer", note: "default 0" },
          { name: "reorder_point", type: "integer" },
        ],
        relations: ["has many stock_movements"],
      },
      {
        name: "stock_movements",
        columns: [
          { name: "id", type: "uuid", note: "PK" },
          { name: "product_id", type: "uuid", note: "FK -> products.id" },
          { name: "type", type: "text", note: "enum: sale|restock|adjustment" },
          { name: "qty_delta", type: "integer", note: "+in / -out" },
          { name: "actor_id", type: "uuid", note: "FK -> users.id" },
          { name: "created_at", type: "timestamptz" },
        ],
        relations: ["belongs to products", "belongs to users (actor)"],
      },
      {
        name: "suppliers",
        columns: [
          { name: "id", type: "uuid", note: "PK" },
          { name: "name", type: "text" },
          { name: "contact", type: "text" },
          { name: "lead_time_days", type: "integer" },
        ],
        relations: ["has many products"],
      },
    ],
    workflow: [
      { order: 1, title: "Record sale", detail: "Cashier records a sale; system writes a negative stock_movement and decrements qty_on_hand." },
      { order: 2, title: "Low-stock alert", detail: "When qty_on_hand drops below reorder_point, the product is flagged on the dashboard." },
      { order: 3, title: "Create restock", detail: "Stock keeper raises a restock against a supplier using lead_time_days." },
      { order: 4, title: "Receive stock", detail: "Incoming stock writes a positive movement and increments qty_on_hand." },
      { order: 5, title: "Reconcile", detail: "Periodic physical count creates adjustment movements to fix discrepancies." },
    ],
    integrations: [
      { name: "Barcode scanner (Web USB/keyboard wedge)", purpose: "scan SKUs at point of sale", category: "other" },
      { name: "Payment gateway", purpose: "record paid sales", category: "payment" },
      { name: "Email / WhatsApp", purpose: "send low-stock alerts to the owner", category: "messaging" },
    ],
    acceptanceCriteria: [
      "Recording a sale updates qty_on_hand and the dashboard within 1 second.",
      "Products below their reorder point appear in a 'Needs restock' list automatically.",
      "Every stock change is auditable through stock_movements with actor and timestamp.",
      "The dashboard shows total inventory value and today's sales count in real time.",
      "Negative stock is prevented; a sale exceeding qty_on_hand is rejected with a clear error.",
    ],
  },

  helpdesk: {
    label: "Helpdesk",
    defaultName: "DeskLine",
    summaryFrame:
      "a multi-channel helpdesk that unifies email and chat into one ticket inbox, with assignment, SLAs, and status tracking",
    roles: [
      { name: "Customer", permissions: ["open ticket", "reply to ticket", "view own tickets"] },
      { name: "Agent", permissions: ["view assigned tickets", "reply", "change status", "add internal notes"] },
      { name: "Supervisor", permissions: ["assign tickets", "view all tickets", "configure SLA", "view reports"] },
    ],
    schema: [
      baseAuthTable,
      {
        name: "tickets",
        columns: [
          { name: "id", type: "uuid", note: "PK" },
          { name: "subject", type: "text" },
          { name: "channel", type: "text", note: "enum: email|chat|web" },
          { name: "status", type: "text", note: "enum: open|pending|resolved|closed" },
          { name: "priority", type: "text", note: "enum: low|normal|high|urgent" },
          { name: "requester_id", type: "uuid", note: "FK -> users.id" },
          { name: "assignee_id", type: "uuid", note: "FK -> users.id (nullable)" },
          { name: "sla_due_at", type: "timestamptz" },
          { name: "created_at", type: "timestamptz" },
        ],
        relations: ["has many messages", "belongs to users (requester & assignee)"],
      },
      {
        name: "messages",
        columns: [
          { name: "id", type: "uuid", note: "PK" },
          { name: "ticket_id", type: "uuid", note: "FK -> tickets.id" },
          { name: "author_id", type: "uuid", note: "FK -> users.id" },
          { name: "body", type: "text" },
          { name: "internal", type: "boolean", note: "default false" },
          { name: "created_at", type: "timestamptz" },
        ],
        relations: ["belongs to tickets"],
      },
    ],
    workflow: [
      { order: 1, title: "Intake", detail: "Inbound email or chat creates a ticket on the matching channel with status 'open'." },
      { order: 2, title: "Triage", detail: "Supervisor or rules engine assigns priority and an agent; SLA due time is set." },
      { order: 3, title: "Respond", detail: "Agent replies; customer-visible messages notify the requester, internal notes do not." },
      { order: 4, title: "Resolve", detail: "Agent sets status to resolved; an auto-close timer moves it to closed after N days." },
      { order: 5, title: "Report", detail: "Supervisor reviews SLA breaches and per-agent resolution times." },
    ],
    integrations: [
      { name: "Inbound email (IMAP / Postmark)", purpose: "turn emails into tickets", category: "email" },
      { name: "Live chat widget", purpose: "embed chat that opens tickets", category: "messaging" },
      { name: "WhatsApp Business API", purpose: "support customers over WhatsApp", category: "messaging" },
    ],
    acceptanceCriteria: [
      "An inbound email creates exactly one ticket and threads subsequent replies to it.",
      "Internal notes are never visible to the customer.",
      "Tickets breaching SLA are visually flagged and counted for the supervisor.",
      "An agent only sees tickets assigned to them unless they are a supervisor.",
      "Resolved tickets auto-close after a configurable number of days.",
    ],
  },

  marketplace: {
    label: "Marketplace",
    defaultName: "MarketMVP",
    summaryFrame:
      "a two-sided marketplace MVP where sellers list products and buyers browse, order, and pay, with the platform taking a commission",
    roles: [
      { name: "Buyer", permissions: ["browse listings", "place orders", "pay", "review sellers"] },
      { name: "Seller", permissions: ["create listings", "manage inventory", "fulfil orders", "view payouts"] },
      { name: "Admin", permissions: ["approve sellers", "set commission", "resolve disputes", "view all orders"] },
    ],
    schema: [
      baseAuthTable,
      {
        name: "listings",
        columns: [
          { name: "id", type: "uuid", note: "PK" },
          { name: "seller_id", type: "uuid", note: "FK -> users.id" },
          { name: "title", type: "text" },
          { name: "description", type: "text" },
          { name: "price", type: "numeric(10,2)" },
          { name: "stock", type: "integer" },
          { name: "status", type: "text", note: "enum: draft|active|sold_out" },
        ],
        relations: ["belongs to users (seller)", "has many order_items"],
      },
      {
        name: "orders",
        columns: [
          { name: "id", type: "uuid", note: "PK" },
          { name: "buyer_id", type: "uuid", note: "FK -> users.id" },
          { name: "total", type: "numeric(12,2)" },
          { name: "commission", type: "numeric(12,2)" },
          { name: "status", type: "text", note: "enum: pending|paid|shipped|delivered|refunded" },
          { name: "created_at", type: "timestamptz" },
        ],
        relations: ["belongs to users (buyer)", "has many order_items"],
      },
      {
        name: "order_items",
        columns: [
          { name: "id", type: "uuid", note: "PK" },
          { name: "order_id", type: "uuid", note: "FK -> orders.id" },
          { name: "listing_id", type: "uuid", note: "FK -> listings.id" },
          { name: "qty", type: "integer" },
          { name: "unit_price", type: "numeric(10,2)" },
        ],
        relations: ["belongs to orders", "belongs to listings"],
      },
    ],
    workflow: [
      { order: 1, title: "Seller onboarding", detail: "Seller signs up and is approved by an admin before listings go active." },
      { order: 2, title: "List product", detail: "Seller publishes a listing with price and stock; status becomes 'active'." },
      { order: 3, title: "Buyer checkout", detail: "Buyer adds items, pays; order total and platform commission are computed." },
      { order: 4, title: "Fulfilment", detail: "Seller ships; status moves paid → shipped → delivered with tracking." },
      { order: 5, title: "Payout", detail: "Platform settles seller earnings minus commission on a schedule." },
    ],
    integrations: [
      { name: "Payment gateway (Midtrans / Stripe)", purpose: "collect payments and split payouts", category: "payment" },
      { name: "Object storage (S3)", purpose: "store listing images", category: "storage" },
      { name: "Email / WhatsApp", purpose: "order and shipping notifications", category: "messaging" },
    ],
    acceptanceCriteria: [
      "A listing cannot go active until the seller is approved by an admin.",
      "Checkout computes the correct total and commission, and reduces listing stock atomically.",
      "Buyers cannot order more than the available stock.",
      "Order status transitions follow the allowed sequence and are logged.",
      "Seller payout equals order total minus the configured commission rate.",
    ],
  },

  generic: {
    label: "App",
    defaultName: "MyApp",
    summaryFrame:
      "a focused web application that lets users sign in, manage their core records, and complete the primary task end to end",
    roles: [
      { name: "Admin", permissions: ["manage users", "manage all records", "configure settings"] },
      { name: "Member", permissions: ["create/edit own records", "view shared data"] },
    ],
    schema: [
      baseAuthTable,
      {
        name: "items",
        columns: [
          { name: "id", type: "uuid", note: "PK" },
          { name: "owner_id", type: "uuid", note: "FK -> users.id" },
          { name: "title", type: "text" },
          { name: "status", type: "text", note: "enum: active|archived" },
          { name: "data", type: "jsonb", note: "flexible payload" },
          { name: "created_at", type: "timestamptz" },
        ],
        relations: ["belongs to users (owner)"],
      },
    ],
    workflow: [
      { order: 1, title: "Sign in", detail: "User authenticates and lands on a dashboard of their items." },
      { order: 2, title: "Create", detail: "User creates a record through a validated form." },
      { order: 3, title: "Manage", detail: "User edits, archives, or filters their records." },
      { order: 4, title: "Review", detail: "Dashboard summarises counts and recent activity." },
    ],
    integrations: [
      { name: "Auth provider", purpose: "email/password or OAuth sign-in", category: "auth" },
      { name: "Email", purpose: "transactional notifications", category: "email" },
    ],
    acceptanceCriteria: [
      "A user can sign in and reach their dashboard.",
      "Creating a record validates required fields before saving.",
      "Users can only see and edit records they own unless they are an admin.",
      "The dashboard reflects new records without a manual refresh.",
    ],
  },
};
