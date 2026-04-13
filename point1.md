
### **Project Brief – Admin Panel Security & Access Control Implementation**

The current admin panel of the website can be accessed directly via URL without any authentication process. This creates a significant security risk, as unauthorized users may gain access to the backend system.

To address this issue, an **authentication system (login)** must be implemented to restrict access to the admin panel. All users must log in using registered credentials before accessing any backend functionality.

Additionally, a **Role-Based Access Control (RBAC)** system must be implemented to ensure that each user can only access features and pages according to their assigned role.

#### **User Roles & Access Requirements**

The system must support the following user accounts and permissions:

* **Marketing Team**

    * 2 accounts
    * **Full access** to the admin panel and all features

* **IT Team**

    * 1 account
    * **Full access** to the admin panel and all features

* **HR Team**

    * 1 account
    * **Restricted access** limited only to the **“Career” page**

Each user must have **unique login credentials** (username and password). Shared accounts are not allowed.

The system must enforce access restrictions so that users **can only access the pages and features permitted by their assigned role**.

#### **Activity Log / Audit Trail**

The admin panel must include an **activity log (audit trail)** to record all important user activities. This log should track:

* **User login information**

    * User ID
    * Login timestamp (date & time)

* **User actions within the admin panel**

    * Editing pages
    * Uploading files
    * Updating content
    * Deleting or publishing content
    * Any other relevant system actions

The **activity log must be accessible to Marketing and IT roles only**.

#### **Security Requirements**

* The admin panel **must not be accessible without authentication**
* Direct access to the backend via URL must be blocked
* All users must log in before accessing any admin functionality
* No public access to backend/admin panel endpoints


---

### **Expected Outcome / Target**

The implementation will be considered successful if the following conditions are met:

* The **admin panel cannot be accessed without login (authentication required)**
* A **working login system (username & password)** is implemented
* **Role-Based Access Control (RBAC)** is implemented with the following structure:

    * Marketing (2 accounts, full access)
    * IT (1 account, full access)
    * HR (1 account, access limited to the Career page)
* Each account has **unique credentials**
* An **activity log system** is implemented and accessible by Marketing and IT
* The activity log records:

    * User login (user ID & timestamp)
    * All content changes (edit, delete, publish, upload, etc.)
* **No public access** to backend/admin panel

---
