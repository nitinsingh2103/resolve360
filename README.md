# AICTE Resolve360 — Integrated Complaint Monitoring & Tracking Dashboard
**Smart India Hackathon Prototype (PS ID: SIH26264)**

> **Problem Statement:** Integrated Dashboard for Monitoring and Tracking Institution-Related Complaint Cases Across AICTE Bureaus/Cells.

AICTE Resolve360 is an enterprise-grade administrative oversight portal designed for the All India Council for Technical Education (AICTE). It provides national leadership, bureau heads, and desk inquiry officers with unified visibility into institutional grievances across technical universities and colleges nationwide.

---

## 🌟 Key Functional Highlights

1. **Executive Overview Dashboard (Page 1):**
   - Live KPI cards calculated dynamically from the complaint registry: *Total Complaints, Pending, In Progress, Resolved Cases, Overdue Breaches, and Average Resolution Time*.
   - 4 Interactive Recharts Visualizations:
     - 6-Month longitudinal intake vs resolution trend line chart.
     - Caseload distribution by bureau bar chart.
     - Lifecycle status donut chart.
     - Real-time SLA breach horizontal ranking by bureau.
   - Priority Cases countdown widget & Recent Complaints table.

2. **Full Complaint Registry (Page 2):**
   - Multi-criteria real-time filtering: *Bureau, Category, Status, Priority, Overdue toggle*.
   - Instant search across Complaint ID, Institution Name, and grievance keywords.
   - Column-based sorting (Complaint ID, Institution, Submission Date, Due Date, Priority, Status).
   - Configurable pagination controls (10, 20, 50 rows per page).
   - "New Complaint" modal with complete field validations and unique ID generation (`AICTE-YYYY-XXX`).
   - "Edit Case" modal for authorized demo modifications.

3. **Case Investigation & Timeline (Page 3):**
   - Deep-dive case profile showing target institution, AICTE code, category, and grievance details.
   - Live SLA tracker showing real-time days remaining or overdue delay duration.
   - Status transition controls (*Submitted &rarr; Under Review &rarr; In Progress &rarr; Awaiting Information &rarr; Resolved &rarr; Closed*).
   - Inter-bureau reassignment modal with automated desk officer selection.
   - Directives & internal communications log with confidential observation badges.
   - Complete immutable audit timeline logging every status change, reassignment, and directive with actor and timestamp.

4. **Bureau Monitoring & Performance (Page 4):**
   - Dedicated metrics for 5 demo divisions:
     - *Approval and Accreditation (B-AAC)*
     - *Academic Affairs (B-ACA)*
     - *Finance and Administration (B-FAD)*
     - *Grievance Redressal (B-GRC)*
     - *Technical Support (B-TEC)*
   - Comparative workload bar chart.
   - Resolution efficiency rate (%) and average turnaround in days.
   - Interactive drilldown table pre-filtering cases for the selected bureau.

5. **SLA Breach & Escalation Command Center (Page 5):**
   - Segmented triage tabs:
     - *Overdue Grievances* (genuinely breached based on reference date).
     - *Due within 48 Hours* (approaching deadline warning).
     - *Critical Unresolved Cases*.
   - Executive action recording modal (e.g., *Formal Show Cause Notice Issued, 2-Member Surprise Inspection Team, Hearing Summons*).

6. **Reports & Cross-Bureau Analytics (Page 6):**
   - Dynamic scope filtering by Bureau and Time Period (30 days, 90 days, 6 months, all-time).
   - Longitudinal volume charts, grievance category distribution, and bureau performance breakdown.
   - Functional CSV Export generating clean reports from the currently filtered view.

7. **System Settings & SLA Configuration (Page 7):**
   - Configurable demo officer profile.
   - Configurable resolution SLA limits per priority level (*Critical, High, Medium, Low*).
   - Reset prototype data trigger to restore factory seed state.
   - FastAPI integration architecture monitor.

---

## 🛠️ Technology Stack

- **Frontend Core:** React 19, Vite 8, JavaScript (ESM, JSX).
- **Styling & Design System:** Tailwind CSS v4, Vanilla CSS variables, Inter & Plus Jakarta Sans typography.
- **Routing:** React Router DOM (v7).
- **Data Visualizations:** Recharts (Line, Bar, Donut, Horizontal Bar charts).
- **Icons:** Lucide React.
- **State & Persistence:** React Context API + LocalStorage service layer (`complaintService.js`).
- **Containerization:** Docker (Multi-stage build) & Docker Compose with Nginx Alpine.
- **Backend Ready:** Prepared for Python FastAPI backend via `VITE_API_BASE_URL`.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation & Run

1. **Clone or enter the project directory:**
   ```bash
   cd Resolve360
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to explore the dashboard.

5. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🐳 Running with Docker

Run the entire application in a production-optimized container using Nginx:

```bash
# Build and run container in detached mode
docker compose up -d --build

# View running status
docker compose ps

# Access the application at:
http://localhost:3000
```

To stop the container:
```bash
docker compose down
```

---

## 💾 Architecture & Demo Data

- **Single Source of Truth:** All metrics, KPI badges, Recharts analytics, and tables derive from the unified complaint records managed in `src/context/ComplaintContext.jsx` and `src/services/complaintService.js`.
- **Seed Data:** Seeded with 38 realistic cases covering technical campuses across Indian states (e.g., *Pune, Bhopal, Lucknow, Kolkata, Delhi NCR, Jaipur, etc.*).
- **Accurate Date Math:** The prototype utilizes an anchor date (`2026-10-26T22:20:00+05:30`) to establish genuinely overdue cases, cases due within 48 hours, and accurate average resolution duration.
- **Persistence:** Edits, newly registered complaints, status transitions, comments, and escalation reviews persist across browser refreshes via `localStorage`. A "Reset Demo Data" button is provided in the header and settings to restore factory seed state at any time.

---

## 🔌 Future Python FastAPI Backend Integration

The frontend features an isolated service layer (`src/services/api.js` and `src/services/complaintService.js`). To transition from local storage to a live FastAPI server:

1. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
2. Set the API URL:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
3. Implement the planned FastAPI endpoints:
   - `GET /api/complaints` - Query complaints with pagination, bureau, status, and search filters.
   - `POST /api/complaints` - Register new institutional grievance.
   - `GET /api/complaints/{id}` - Retrieve case details, audit history, and remarks.
   - `PATCH /api/complaints/{id}` - Update status, bureau reassignment, or resolution notes.
   - `POST /api/complaints/{id}/comments` - Append administrative remarks or internal observations.
   - `GET /api/bureaus` - Bureau statistics and officer directory.
   - `GET /api/analytics/overview` - KPI metrics and chart aggregation.
   - `GET /api/escalations` - Overdue and 48-hour SLA breach listing.

---

## ⚖️ Hackathon Disclaimer

*AICTE Resolve360 is a hackathon prototype developed for Smart India Hackathon (SIH26264). All data, institution names, officer designations, and bureau groupings are simulated for demonstration purposes and are not officially connected to live AICTE production databases.*
