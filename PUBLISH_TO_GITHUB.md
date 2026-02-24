# How to Publish EstateHero to GitHub

Follow these steps in order. Do them in Terminal (or your terminal app) unless the step says "On GitHub".

---

## Part 1: Create an SSH key (one-time setup)

You need this so your computer can talk to GitHub without typing a password every time.

### Step 1.1 – Create the key

Open Terminal and run (use your real email):

```bash
ssh-keygen -t ed25519 -C "os@edl.dk"
```

- When it asks **"Enter file in which to save the key"** → press **Enter** (use default).
- When it asks **"Enter passphrase"** → either type a password you’ll remember, or press **Enter** twice for no passphrase.

### Step 1.2 – Add the key to the agent

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### Step 1.3 – Copy your public key

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

That copies the key. You won’t see anything; it’s in your clipboard.

### Step 1.4 – Add the key on GitHub

1. Go to: **https://github.com/settings/keys**
2. Click **"New SSH key"**.
3. **Title:** type e.g. `My Mac` (any name you like).
4. **Key:** press **Cmd+V** to paste (the key you copied in Step 1.3).
5. Click **"Add SSH key"**.

### Step 1.5 – Test that it works

In Terminal:

```bash
ssh -T git@github.com
```

You should see: **"Hi oskar-edl! You've successfully authenticated..."**  
If it asks "Are you sure you want to continue connecting?" type **yes** and press Enter.

---

## Part 2: Create the repo on GitHub (if it doesn’t exist yet)

**On GitHub:**

1. Go to **https://github.com/new**
2. **Repository name:** `EstateHero`
3. Choose **Public** (or Private if you prefer).
4. **Do not** tick "Add a README", "Add .gitignore", or "Choose a license".
5. Click **"Create repository"**.

You’ll see a page saying "Quick setup — if you’ve pushed before…". You can ignore that; we push in Part 3.

---

## Part 3: Push your project from your computer

All of this is in **Terminal**, in your project folder.

### Step 3.1 – Go to the project folder

```bash
cd /Users/oskar/Desktop/EstateHero
```

### Step 3.2 – Make sure the remote is correct

**If you want the repo under edl-studio:**

```bash
git remote set-url origin git@github.com:edl-studio/EstateHero.git
```

**If you want the repo under your user (oskar-edl):**

```bash
git remote set-url origin git@github.com:oskar-edl/EstateHero.git
```

(Only run one of the two, depending on where you created the repo in Part 2.)

### Step 3.3 – Push to GitHub

```bash
git push -u origin main
```

If everything is set up correctly, the push will finish and you’ll see something like:

```
Enumerating objects: ...
Writing objects: 100% ...
To github.com:edl-studio/EstateHero.git
 * [new branch]      main -> main
```

### Step 3.4 – Check on GitHub

Open in your browser:

- **edl-studio:** https://github.com/edl-studio/EstateHero  
- **your user:** https://github.com/oskar-edl/EstateHero  

You should see your code there. That’s it — the project is published.

---

## Quick reference

| Step | What you do |
|------|------------------|
| 1.1 | `ssh-keygen -t ed25519 -C "os@edl.dk"` → Enter, Enter (or set passphrase) |
| 1.2 | `eval "$(ssh-agent -s)"` then `ssh-add ~/.ssh/id_ed25519` |
| 1.3 | `pbcopy < ~/.ssh/id_ed25519.pub` |
| 1.4 | GitHub → Settings → SSH keys → New SSH key → paste → Add |
| 1.5 | `ssh -T git@github.com` → should say "Hi oskar-edl!" |
| 2 | GitHub → New repository → name: EstateHero → Create (no README etc.) |
| 3.1 | `cd /Users/oskar/Desktop/EstateHero` |
| 3.2 | `git remote set-url origin git@github.com:edl-studio/EstateHero.git` (or oskar-edl) |
| 3.3 | `git push -u origin main` |

---

## If something goes wrong

- **"Permission denied (publickey)"**  
  Part 1 isn’t done or the key wasn’t added to GitHub. Redo Steps 1.1–1.5.

- **"repository not found" or "could not read from remote"**  
  The repo doesn’t exist yet or the URL is wrong. Create the repo (Part 2) and check Step 3.2 (edl-studio vs oskar-edl).

- **"Updates were rejected"**  
  Someone else pushed first. Run:  
  `git pull origin main --rebase`  
  then again:  
  `git push -u origin main`
