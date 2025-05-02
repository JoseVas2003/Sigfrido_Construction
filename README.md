# Sigfrido Vasquez Construction

<IMG src= "https://github.com/user-attachments/assets/93301080-de1f-443c-a621-1ef4711bf62b" width="200" /><br>
## Synopsis
A modern, responsive website created for Sigfrido Construction, a leading construction company specializing in high-quality building and renovation projects. This website is designed to highlight their services, showcase completed projects, and provide clients with easy access to contact information. The goal is to create a professional and engaging online presence to attract new clients and build trust with existing ones.

## Main features
- Review system
- Portfolio showcase system
- Client project management system
- Admin project management system
- Account management system

## Entity-Relationship Diagram 

<IMG src= "https://github.com/user-attachments/assets/d6b4e943-76aa-431b-b07b-8dcc59a05439" width="518" />

## Prototype Images Section
<img width="300" src="https://github.com/user-attachments/assets/fef4b55f-e0cf-4809-995c-eef1d9db2b3a" />
<img width="300" src="https://github.com/user-attachments/assets/c7a8f22b-d2aa-41f1-8cc8-a209d9c20ea4" />
<IMG src= "https://github.com/user-attachments/assets/e00c7ba9-5206-46bb-b204-0255d6e77326" width="300" />
<IMG src= "https://github.com/user-attachments/assets/c5bd1942-a6a3-442f-b530-e9fcb2994e77" width="300" />
<IMG src= "https://github.com/user-attachments/assets/ced70f28-d400-4f18-96ec-983350a96a24" width="300" />
<IMG src= "https://github.com/user-attachments/assets/1f144902-fe68-4e12-88a9-21a55d8e5ce3" width="300" />
<img width="300" src="https://github.com/user-attachments/assets/9f3d85bb-5619-42bd-9b5b-c16638228907" />
<img width="300" src="https://github.com/user-attachments/assets/0a868e68-f76a-4a9b-8115-3e0e37c90f58" />
<img width="300" src="https://github.com/user-attachments/assets/684a9293-4e98-45ad-b401-05a808a432c4" />

<br>

# Testing (per the assignment, placeholder)
## Prerequisites

- **Node.js** v20.x or newer  
- **npm** v10.x or newer  
- **MongoDB** (for admin‑dashboard tests)  

## Setup

1. **Clone the repo**  
   ```bash
   git clone https://github.com/JoseVas2003/Sigfrido_Construction.git
   cd Sigfrido_Construction
   ```

2. **Copy your `.env` files** into both the `frontend/` and `backend/` directories.  
   _(They must not be committed.)_

3. **Install Frontend dependencies & start dev server**  
   ```bash
   cd frontend
   npm install
   npm install mongodb
   npm run dev
   ```

4. **In a separate terminal**, install & start the Backend:  
   ```bash
   cd backend
   npm install
   npm run dev
   ```

## Running the Tests

All end‑to‑end and unit tests live under `test/`.

- **Run everything**  
  ```bash
  npx mocha test
  ```

- **Run all tests in one file**  
  ```bash
  npx mocha test/<NameOfTestFile>.js
  # e.g.
  npx mocha test/reviewTesting.js
  ```

- **Run a single `it()` by description**  
  ```bash
  npx mocha test/<NameOfTestFile>.js -g "<exact it‑description>"
  # e.g.
  npx mocha test/reviewTesting.js -g "allow a logged in user to leave a review"
  ```

### Common Examples

```bash
# Reviews
npx mocha test/reviewTesting.js -g "allow a logged in user"         # create review
npx mocha test/reviewTesting.js -g "prevent non-logged in users"    # guest redirect
npx mocha test/reviewTesting.js -g "non-admin user to delete"       # delete own review
npx mocha test/reviewTesting.js -g "admin to delete a review"       # admin delete

# Navigation Bar (Admin)
npx mocha test/navBarTesting\(Admin\).js \
  -g "Admin Logged In Attempting to Navigate To Home Page"

# Authentication
npx mocha test/authenticationTesting.js \
  -g "Non-Admin User That Is Logged In Attempting to Navigate To Admin Dashboard"
```

> **Tip:** The `-g` (grep) flag only needs a unique substring of the `it()` description.


## Developer Workflow

1. **Clone the repo**  
   ```bash
   git clone https://github.com/JoseVas2003/Sigfrido_Construction.git
   cd Sigfrido_Construction
   ```

2. **Project layout**  
   - `frontend/` – React + TypeScript client  
   - `backend/` – Node.js + Express API  

3. **Local development**  
   - In one terminal, start the backend:  
     ```bash
     cd backend
     npm install     # first time only
     npm run dev
     ```
   - In a second terminal, start the frontend:  
     ```bash
     cd frontend
     npm install     # first time only
     npm run dev
     ```
   - Both servers run on `localhost` (frontend proxies API calls to the backend).

4. **Making changes**  
   - Edit code in your IDE  
   - Verify that your `.env` files are up‑to‑date in **both** folders  
   - Rebuild TS types (frontend) and lint as needed  

5. **Testing your changes**  
   - Hit your new or modified endpoints/components in the browser  
   - Run any existing unit/E2E tests:  
     ```bash
     npx mocha test
     ```

---

## Deployment

### Backend → AWS Elastic Beanstalk

1. **Prepare**  
   - Bump version in `backend/package.json` (optional)  
   - Ensure any new `ENV` vars are defined in the EB Console  

2. **Zip & upload**  
   ```bash
   cd backend
   zip -r ../backend-deploy.zip .    # include package.json, dist/, .env.example, etc.
   ```
   - In the AWS Console → Elastic Beanstalk → Your Environment → **Upload and deploy**  


### Frontend → AWS Amplify

1. **Build check**  
   ```bash
   cd frontend
   npm run build        # must exit cleanly with no TS errors
   ```

2. **Push to GitHub**  
   ```bash
   git add .
   git commit -m "feat: <your changes>"
   git push origin main
   ```

3. **Amplify Console**  
   - If you’ve connected your GitHub repo, Amplify will auto‑detect the push and run the build  
   - Otherwise, open Amplify → **All apps** → select your frontend → **Redeploy last build**  

> **Best practices:**  
> - Always run `npm run build` locally before pushing  
> - Use feature branches & PRs, run tests in CI  
> - Keep your `.env.example` up to date with any new variables  
> - Tag releases (Git) so you can roll back easily in EB or Amplify  


## Timeline

Major Milestones:
	
Sprint 5 > Login Page Functionality<br>
Sprint 6 > Create Project & Portfolio Functionality<br>
Sprint 7 > User / Admin Dashboard Functionality<br>
Sprint 8 > Forgot Password Functionality<br>

## Built With (Tech Stacks)
- Next.js
- React.js
- Node.js
- Express.js	
- MongoDB



# Coding Hornet's development team:
Jose Avalos<br>
Jordan Dawson<br>
Mitchell Kouiyoth<br>
Nathan Kovak<br>
Thanh Nguyen<br>
Galileo A. Perez<br>
Jomel Sotelo<br>
Tanner Stuhr<br>
Jose Vasquez<br>
