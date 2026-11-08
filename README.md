# CivicFix — Municipal Grievance & Incident Dispatch System

A structured, full-stack municipal grievance routing platform that replaces manual paper complaints with verified GPS coordinate tracking, automated departmental dispatch queues, and SLA monitoring.

---

## Architecture Overview

CivicFix connects urban residents directly to local civic administrative divisions (Public Works, Jal Sansthan, Municipal Electrical Wing, and Nagar Nigam Sanitation).

- **Frontend (Client Tier):** React.js single-page application built on Vite, styled with a minimalist slate design system, integrating interactive Leaflet / OpenStreetMap for geolocation capture.
- **Backend (Service Tier):** Java 21 & Spring Boot REST API layer handling complaint lifecycle management, priority evaluation, and departmental routing logic.
- **Persistence:** Relational database schema tracking citizen grievance tickets, department mapping, and audit resolution stages.

---

## Key Features

- **Geotagged Incident Reporting:** Citizens log issues with exact geographic coordinates selected via an interactive map or device GPS presets.
- **Departmental Routing:** Automated ingestion into specialized department queues (PWD for roads, Jal Sansthan for pipeline leakages, Electrical Wing for lighting).
- **Public Operations Dashboard:** Live operational feeds displaying real-time incident resolution statuses (`PENDING`, `IN_PROGRESS`, `RESOLVED`) and SLA tracking metrics.
- **Client-Side Storage Fallback:** Graceful fallback support for offline / guest complaint persistence using browser LocalStorage.

---

## Tech Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS & Custom Slate Design Tokens
- **Mapping:** OpenStreetMap / Leaflet Integration
- **Icons:** Lucide React
- **HTTP Client:** Axios

### Backend
- **Language:** Java 21
- **Framework:** Spring Boot 3.x
- **Build Tool:** Maven
- **Architecture:** RESTful Web Services, Spring Data JPA, Spring Security

---

## Project Structure

```text
Civicfix/
├── civicfix-frontend/          # React + Vite application
│   ├── src/
│   │   ├── components/         # Reusable UI elements (Navbar, etc.)
│   │   ├── pages/              # Dashboard, ReportIssue, Auth views
│   │   ├── context/            # Authentication state providers
│   │   └── api/                # Axios API client configurations
│   ├── package.json
│   └── vercel.json             # SPA routing rewrite configuration
│
├── civicfix-backend/           # Spring Boot application
│   ├── src/main/java/          # Controllers, Services, Models, Repositories
│   ├── src/main/resources/     # Application configurations
│   └── pom.xml
└── README.md