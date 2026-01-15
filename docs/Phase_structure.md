🔹 PHASE 0 – Project Foundation & Mental Model
==============================================

**Goal:** Understand system + prepare environment

### What this phase contains:

*   What problem we are solving
    
*   How real restaurants work (data flow)
    
*   High-level architecture
    
*   Repo & folder structure
    
*   Tech stack confirmation
    

### What we implement:

*   Repo structure (folders only)
    
*   No DB
    
*   No backend code
    
*   No frontend code
    

✅ **After Phase 0:**You should clearly visualize **how data flows** end to end.

🔹 PHASE 1 – Database Design (Core of Everything)
=================================================

We will split DB into **sub-phases**.

🔹 PHASE 1.1 – Core Master Tables
---------------------------------

**Goal:** Identity & control

### Tables:

*   users
    
*   roles
    

### Concepts learned:

*   Real-world RBAC
    
*   Role assignment
    
*   Admin-controlled user creation
    

✅ **After this:**Admin can exist in DB and users can have roles.

🔹 PHASE 1.2 – Inventory Master Data
------------------------------------

**Goal:** What items exist?

### Tables:

*   inventory\_items
    
*   suppliers
    

### Concepts learned:

*   Units (kg, liter, piece)
    
*   Supplier linkage
    

🔹 PHASE 1.3 – Inventory Movement Tables
----------------------------------------

**Goal:** Stock tracking logic

### Tables:

*   inventory\_inflow
    
*   inventory\_outflow
    
*   waste\_logs
    

### Concepts learned:

*   Inflow vs outflow vs waste
    
*   Why waste is separate
    
*   Real accounting thinking
    

🔹 PHASE 1.4 – Ordering & Billing Tables
----------------------------------------

**Goal:** Revenue flow

### Tables:

*   orders
    
*   order\_items
    
*   invoices
    

### Concepts learned:

*   Order lifecycle
    
*   GST calculation base
    
*   Invoice modeling
    

✅ **After PHASE 1 (Complete DB):**

*   DB is production-like
    
*   All relations exist
    
*   Ready for backend
    

🔹 PHASE 2 – Backend Foundation (FastAPI)
=========================================

🔹 PHASE 2.1 – Backend Setup & DB Connection
--------------------------------------------

*   FastAPI app structure
    
*   SQLAlchemy setup
    
*   PostgreSQL connection
    
*   Alembic (optional, we’ll discuss)
    

🔹 PHASE 2.2 – Auth & RBAC (Simplified but Real)
------------------------------------------------

**Important**

### What we do:

*   Users table backed auth
    
*   Role-based access checks
    
*   Admin-only routes
    

### What we **won’t** do:

*   OAuth
    
*   JWT complexity (unless needed)
    

### What you’ll understand:

*   How RBAC works in real companies
    
*   How roles are enforced at API level
    

🔹 PHASE 2.3 – Inventory APIs
-----------------------------

*   Create inventory items
    
*   Inflow APIs
    
*   Outflow APIs
    
*   Auto stock calculation
    

🔹 PHASE 2.4 – Waste Management APIs
------------------------------------

*   Log waste
    
*   Link waste to inventory
    
*   Understand loss tracking
    

🔹 PHASE 2.5 – Ordering & Invoice APIs
--------------------------------------

*   Create order
    
*   Reduce inventory
    
*   Generate invoice
    
*   Apply GST
    

✅ **After PHASE 2:**Backend is **fully functional**.

🔹 PHASE 3 – Frontend Foundation (Vite + React)
===============================================

🔹 PHASE 3.1 – Frontend Setup
-----------------------------

*   Vite project
    
*   Folder structure
    
*   API service layer
    

🔹 PHASE 3.2 – Admin Screens
----------------------------

*   Create users
    
*   Assign roles
    
*   Create inventory items
    

🔹 PHASE 3.3 – Operations Screens
---------------------------------

*   Inflow entry
    
*   Outflow entry
    
*   Waste logging
    

🔹 PHASE 3.4 – Orders & Billing Screens
---------------------------------------

*   Create order
    
*   View invoice
    
*   GST breakdown
    

⚠️ No CSS focus.Only **logic & data flow**.

🔹 PHASE 4 – End-to-End Flow Review
===================================

*   Full system walkthrough
    
*   Real-world mapping
    
*   What happens when:
    
    *   Stock arrives
        
    *   Order placed
        
    *   Waste occurs
        
    *   Invoice generated
        

🔹 PHASE 5 – Learning Wrap-Up
=============================

*   What you learned
    
*   How this maps to real companies
    
*   How to extend this system
    

3️⃣ Important: RBAC Clarification (Your Requirement)
----------------------------------------------------

You said something **very correct**:

> Admin should be able to add users and assign roles via UI

✔ We WILL do this✔ roles table exists✔ users table stores role\_id✔ Admin is inserted directly into DB initially✔ Later admin creates users via UI

This matches **real-world enterprise systems**.