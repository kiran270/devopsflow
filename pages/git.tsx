import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { GitBranch, GitCommit, GitMerge } from 'lucide-react'
import GitDiagram from '../components/animations/GitDiagram'

export default function Git() {
  const [scenario, setScenario] = useState<'intro' | 'workflow' | 'init' | 'pull' | 'conflict' | 'undo' | 'branch' | 'merge' | 'rebase' | 'stash' | 'log' | 'usecases'>('intro')

  const scenarios = {
    intro: {
      name: 'Introduction to Git',
      description: 'Learn what Git is and why developers use it',
      steps: [
        {
          command: 'What is Git?',
          output: `Git is a distributed version control system that tracks changes in your code over time.
It allows multiple developers to work together, maintains complete history, and enables easy rollback to previous versions.`,
          explanation: 'Git is the most popular version control system used by millions of developers worldwide.'
        },
        {
          command: 'What Git Does',
          output: `• Tracks every change to your code
• Enables collaboration without conflicts
• Creates branches for parallel development
• Merges changes from multiple developers
• Provides complete project history
• Works offline - commit locally, push later`,
          explanation: 'Git gives you complete control over your code history and enables team collaboration.'
        },
        {
          command: 'Real-World Use Cases',
          output: `• Team collaboration on software projects
• Maintaining multiple versions (dev/staging/prod)
• Code review through pull requests
• Rolling back broken deployments
• Open source contribution
• Tracking who changed what and when`,
          explanation: 'Git is essential for modern software development, from solo projects to large teams.'
        },
        {
          command: 'Git Workflow',
          output: `1. 📝 Edit Code - Make changes to your files
2. ➕ git add - Stage changes for commit
3. 💾 git commit - Save snapshot with message
4. ☁️ git push - Upload to remote repository
5. ✅ Remote Repo - Code is backed up and shared`,
          explanation: 'This is the basic workflow you will use daily as a developer.'
        }
      ]
    },
    workflow: {
      name: 'Complete Git Workflow',
      description: 'From cloning a repository to pushing your changes',
      steps: [
        {
          command: 'git clone https://github.com/user/project.git',
          output: `Cloning into 'project'...
remote: Enumerating objects: 125, done.
remote: Counting objects: 100% (125/125), done.
remote: Compressing objects: 100% (89/89), done.
remote: Total 125 (delta 45), reused 98 (delta 32)
Receiving objects: 100% (125/125), 45.23 KiB | 2.12 MiB/s, done.
Resolving deltas: 100% (45/45), done.`,
          explanation: 'Downloads the entire repository from GitHub to your computer'
        },
        {
          command: 'cd project',
          output: '',
          explanation: 'Navigate into the cloned project directory'
        },
        {
          command: 'git status',
          output: `On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean`,
          explanation: 'Check current status - everything is clean after clone'
        },
        {
          command: 'git branch feature/new-button',
          output: '',
          explanation: 'Create a new branch for your feature work'
        },
        {
          command: 'git checkout feature/new-button',
          output: `Switched to branch 'feature/new-button'`,
          explanation: 'Switch to the new branch to start working'
        },
        {
          command: '# Make changes to files...',
          output: `# Edit app.js, add new button component
# Edit styles.css, add button styles`,
          explanation: 'You edit files in your code editor'
        },
        {
          command: 'git status',
          output: `On branch feature/new-button
Changes not staged for commit:
  
  modified:   app.js
  modified:   styles.css

no changes added to commit`,
          explanation: 'Git detects your file changes'
        },
        {
          command: 'git add .',
          output: '',
          explanation: 'Stage all your changes for commit'
        },
        {
          command: 'git commit -m "Add new button component"',
          output: `[feature/new-button 7a8b9c0] Add new button component
 2 files changed, 24 insertions(+), 2 deletions(-)`,
          explanation: 'Save your changes with a descriptive message'
        },
        {
          command: 'git push origin feature/new-button',
          output: `Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 8 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 892 bytes | 892.00 KiB/s, done.
Total 4 (delta 2), reused 0 (delta 0)
To https://github.com/user/project.git
 * [new branch]      feature/new-button -> feature/new-button`,
          explanation: 'Upload your branch to GitHub so others can see it'
        },
        {
          command: '# Create Pull Request on GitHub',
          output: `✓ Pull Request created
  From: feature/new-button
  To: main
  
  Ready for review!`,
          explanation: 'On GitHub, create a PR to merge your changes into main'
        }
      ]
    },
    pull: {
      name: 'Pull Latest Changes',
      description: 'Get updates from your team before starting work',
      steps: [
        {
          command: 'git status',
          output: `On branch main
Your branch is behind 'origin/main' by 3 commits.
  (use "git pull" to update your local branch)

nothing to commit, working tree clean`,
          explanation: 'Check status - you are behind the remote repository'
        },
        {
          command: 'git pull origin main',
          output: `remote: Enumerating objects: 12, done.
remote: Counting objects: 100% (12/12), done.
remote: Compressing objects: 100% (8/8), done.
remote: Total 9 (delta 4), reused 6 (delta 1)
Unpacking objects: 100% (9/9), done.
From https://github.com/user/project
 * branch            main       -> FETCH_HEAD
Updating abc1234..def5678
Fast-forward
 app.js    | 15 ++++++++++++---
 README.md |  4 ++--
 2 files changed, 14 insertions(+), 5 deletions(-)`,
          explanation: 'Downloads and merges changes from GitHub into your local branch'
        },
        {
          command: 'git status',
          output: `On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean`,
          explanation: 'Now you are up to date with the latest changes'
        },
        {
          command: 'git log --oneline -3',
          output: `def5678 (HEAD -> main, origin/main) Update README
cde4567 Fix bug in login
bcd3456 Add new feature`,
          explanation: 'View the latest commits you just pulled'
        }
      ]
    },
    conflict: {
      name: 'Resolve Merge Conflicts',
      description: 'What to do when Git cannot auto-merge changes',
      steps: [
        {
          command: 'git pull origin main',
          output: `Auto-merging app.js
CONFLICT (content): Merge conflict in app.js
Automatic merge failed; fix conflicts and then commit the result.`,
          explanation: 'Git found conflicting changes in app.js - same lines edited differently'
        },
        {
          command: 'git status',
          output: `On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   app.js`,
          explanation: 'Shows which files have conflicts that need manual resolution'
        },
        {
          command: '# Open app.js and fix conflicts',
          output: `<<<<<<< HEAD (Your changes)
function login() {
  return authenticateUser();
}
=======
function login() {
  return validateAndLogin();
}
>>>>>>> origin/main (Their changes)

# Choose one or combine both, then remove markers`,
          explanation: 'Edit the file, choose which code to keep, remove conflict markers'
        },
        {
          command: 'git add app.js',
          output: '',
          explanation: 'Mark the conflict as resolved by staging the file'
        },
        {
          command: 'git commit -m "Resolve merge conflict in app.js"',
          output: `[main 9f8e7d6] Resolve merge conflict in app.js`,
          explanation: 'Complete the merge with a commit'
        },
        {
          command: 'git push origin main',
          output: `Enumerating objects: 5, done.
Writing objects: 100% (3/3), 345 bytes | 345.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0)
To https://github.com/user/project.git
   def5678..9f8e7d6  main -> main`,
          explanation: 'Push the resolved merge to GitHub'
        }
      ]
    },
    undo: {
      name: 'Undo & Fix Mistakes',
      description: 'How to undo changes and fix common mistakes',
      steps: [
        {
          command: '# Scenario: Made changes but want to discard them',
          output: `Modified: app.js, styles.css`,
          explanation: 'You made changes but want to throw them away'
        },
        {
          command: 'git restore app.js',
          output: '',
          explanation: 'Discard changes in app.js, restore to last commit'
        },
        {
          command: '# Scenario: Staged wrong files',
          output: `Staged: app.js, config.json (oops!)`,
          explanation: 'You accidentally staged config.json'
        },
        {
          command: 'git restore --staged config.json',
          output: '',
          explanation: 'Unstage config.json, but keep the changes in the file'
        },
        {
          command: '# Scenario: Bad commit message',
          output: `Last commit: "fixed stuff" (not descriptive!)`,
          explanation: 'You committed with a vague message'
        },
        {
          command: 'git commit --amend -m "Fix login validation bug"',
          output: `[main 7a8b9c0] Fix login validation bug
 Date: Mon Nov 11 10:30:00 2024
 1 file changed, 5 insertions(+), 2 deletions(-)`,
          explanation: 'Replace the last commit message with a better one'
        },
        {
          command: '# Scenario: Forgot to add a file to last commit',
          output: `Oops, forgot to add tests.js!`,
          explanation: 'You committed but forgot to include a file'
        },
        {
          command: 'git add tests.js',
          output: '',
          explanation: 'Stage the forgotten file'
        },
        {
          command: 'git commit --amend --no-edit',
          output: `[main 8b9c0d1] Fix login validation bug
 Date: Mon Nov 11 10:30:00 2024
 2 files changed, 15 insertions(+), 2 deletions(-)`,
          explanation: 'Add the file to the previous commit without changing the message'
        }
      ]
    },
    init: {
      name: 'Start New Project',
      description: 'Initialize a new Git repository from scratch',
      steps: [
        {
          command: 'mkdir my-project',
          output: '',
          explanation: 'Create a new directory for your project'
        },
        {
          command: 'cd my-project',
          output: '',
          explanation: 'Navigate into the project directory'
        },
        {
          command: 'git init',
          output: `Initialized empty Git repository in /Users/you/my-project/.git/`,
          explanation: 'Initialize Git - creates hidden .git folder to track changes'
        },
        {
          command: 'git status',
          output: `On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)`,
          explanation: 'Check status - repository is empty and ready'
        },
        {
          command: 'echo "# My Project" > README.md',
          output: '',
          explanation: 'Create your first file'
        },
        {
          command: 'git add README.md',
          output: '',
          explanation: 'Stage the file for first commit'
        },
        {
          command: 'git commit -m "Initial commit"',
          output: `[main (root-commit) a1b2c3d] Initial commit
 1 file changed, 1 insertion(+)
 create mode 100644 README.md`,
          explanation: 'Create the first commit in your repository'
        },
        {
          command: 'git remote add origin https://github.com/user/my-project.git',
          output: '',
          explanation: 'Connect your local repo to GitHub'
        },
        {
          command: 'git push -u origin main',
          output: `Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 234 bytes | 234.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/user/my-project.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.`,
          explanation: 'Push your first commit to GitHub and set up tracking'
        }
      ]
    },
    stash: {
      name: 'Save Work Temporarily',
      description: 'Stash changes when you need to switch context quickly',
      steps: [
        {
          command: 'git status',
          output: `On branch feature
Changes not staged for commit:
  
  modified:   app.js
  modified:   styles.css`,
          explanation: 'You are working on a feature with uncommitted changes'
        },
        {
          command: '# Urgent: Need to fix bug on main branch!',
          output: `Boss: "Fix the login bug NOW!"`,
          explanation: 'Emergency! Need to switch branches but have unsaved work'
        },
        {
          command: 'git stash',
          output: `Saved working directory and index state WIP on feature: abc1234 Add feature
HEAD is now at abc1234 Add feature`,
          explanation: 'Saves your changes temporarily and cleans working directory'
        },
        {
          command: 'git status',
          output: `On branch feature
nothing to commit, working tree clean`,
          explanation: 'Working directory is now clean - safe to switch branches'
        },
        {
          command: 'git checkout main',
          output: `Switched to branch 'main'`,
          explanation: 'Switch to main branch to fix the bug'
        },
        {
          command: '# Fix the bug, commit, push...',
          output: `Bug fixed and pushed! ✓`,
          explanation: 'Fix the urgent issue'
        },
        {
          command: 'git checkout feature',
          output: `Switched to branch 'feature'`,
          explanation: 'Switch back to your feature branch'
        },
        {
          command: 'git stash pop',
          output: `On branch feature
Changes not staged for commit:
  
  modified:   app.js
  modified:   styles.css

Dropped refs/stash@{0} (def5678)`,
          explanation: 'Restore your saved changes and continue working'
        },
        {
          command: 'git stash list',
          output: `# Empty - stash was popped`,
          explanation: 'View all stashed changes (pop removes from list)'
        }
      ]
    },
    log: {
      name: 'View History',
      description: 'Explore commit history and find specific changes',
      steps: [
        {
          command: 'git log',
          output: `commit abc1234def5678 (HEAD -> main, origin/main)
Author: John Doe <john@example.com>
Date:   Mon Nov 11 10:30:00 2024

    Add user authentication

commit 789abcd012efgh
Author: Jane Smith <jane@example.com>
Date:   Sun Nov 10 15:20:00 2024

    Fix login bug`,
          explanation: 'Shows detailed commit history with full information'
        },
        {
          command: 'git log --oneline',
          output: `abc1234 (HEAD -> main) Add user authentication
789abcd Fix login bug
456efgh Update README
123abcd Initial commit`,
          explanation: 'Compact view - one line per commit, easier to scan'
        },
        {
          command: 'git log --oneline --graph --all',
          output: `* abc1234 (HEAD -> main) Add user authentication
| * def5678 (feature) Add new button
|/
* 789abcd Fix login bug
* 456efgh Update README`,
          explanation: 'Visual graph showing branches and merge history'
        },
        {
          command: 'git log --author="John"',
          output: `commit abc1234def5678
Author: John Doe <john@example.com>
Date:   Mon Nov 11 10:30:00 2024

    Add user authentication`,
          explanation: 'Filter commits by specific author'
        },
        {
          command: 'git log --since="2 days ago"',
          output: `commit abc1234def5678
Author: John Doe <john@example.com>
Date:   Mon Nov 11 10:30:00 2024

    Add user authentication`,
          explanation: 'Show commits from last 2 days'
        },
        {
          command: 'git show abc1234',
          output: `commit abc1234def5678
Author: John Doe <john@example.com>
Date:   Mon Nov 11 10:30:00 2024

    Add user authentication

diff --git a/auth.js b/auth.js
+++ b/auth.js
@@ -1,0 +1,5 @@
+function authenticate(user) {
+  return validateUser(user);
+}`,
          explanation: 'Show detailed changes in a specific commit'
        },
        {
          command: 'git diff main..feature',
          output: `diff --git a/button.js b/button.js
new file mode 100644
+++ b/button.js
@@ -0,0 +1,3 @@
+function Button() {
+  return <button>Click me</button>;
+}`,
          explanation: 'Compare differences between two branches'
        }
      ]
    },
    commit: {
      name: 'Git Commit',
      description: 'Learn how commits create a history of changes',
      steps: [
        {
          command: 'git status',
          output: `On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  
  modified:   app.js
  modified:   index.html

no changes added to commit (use "git add")`,
          explanation: 'Shows which files have been modified but not yet staged'
        },
        {
          command: 'git add .',
          output: '',
          explanation: 'Stages all modified files, preparing them for commit'
        },
        {
          command: 'git status',
          output: `On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
  
  modified:   app.js
  modified:   index.html`,
          explanation: 'Now files are staged and ready to be committed'
        },
        {
          command: 'git commit -m "Add new feature"',
          output: `[main abc1234] Add new feature
 2 files changed, 15 insertions(+), 3 deletions(-)`,
          explanation: 'Creates a permanent snapshot with commit ID abc1234'
        }
      ]
    },
    branch: {
      name: 'Git Branch',
      description: 'Create and switch between branches',
      steps: [
        {
          command: 'git branch',
          output: `* main`,
          explanation: 'Shows current branch (marked with *)'
        },
        {
          command: 'git branch feature',
          output: '',
          explanation: 'Creates a new branch called "feature"'
        },
        {
          command: 'git branch',
          output: `  feature
* main`,
          explanation: 'Now we have two branches, still on main'
        },
        {
          command: 'git checkout feature',
          output: `Switched to branch 'feature'`,
          explanation: 'Switched to feature branch, now commits go here'
        }
      ]
    },
    merge: {
      name: 'Git Merge',
      description: 'Combine changes from different branches',
      steps: [
        {
          command: 'git branch',
          output: `* feature
  main`,
          explanation: 'Currently on feature branch with some commits'
        },
        {
          command: 'git checkout main',
          output: `Switched to branch 'main'`,
          explanation: 'Switch to main branch to merge feature into it'
        },
        {
          command: 'git merge feature',
          output: `Updating abc1234..def5678
Fast-forward
 feature.js | 10 ++++++++++
 1 file changed, 10 insertions(+)
 create mode 100644 feature.js`,
          explanation: 'Merges feature branch into main, combining both histories'
        },
        {
          command: 'git log --oneline --graph',
          output: `* def5678 (HEAD -> main, feature) Add feature
* abc1234 Initial commit`,
          explanation: 'Shows the merged commit history'
        }
      ]
    },
    rebase: {
      name: 'Git Rebase',
      description: 'Rewrite commit history',
      steps: [
        {
          command: 'git log --oneline --all --graph',
          output: `* ghi9012 (main) Update main
| * def5678 (HEAD -> feature) Feature work
|/
* abc1234 Initial commit`,
          explanation: 'Feature and main have diverged from abc1234'
        },
        {
          command: 'git rebase main',
          output: `Successfully rebased and updated refs/heads/feature.`,
          explanation: 'Replays feature commits on top of main'
        },
        {
          command: 'git log --oneline --all --graph',
          output: `* jkl3456 (HEAD -> feature) Feature work
* ghi9012 (main) Update main
* abc1234 Initial commit`,
          explanation: 'Feature now has a linear history on top of main'
        },
        {
          command: 'git log --oneline',
          output: `jkl3456 (HEAD -> feature) Feature work
ghi9012 (main) Update main
abc1234 Initial commit`,
          explanation: 'Clean, linear history - feature commit has new ID!'
        }
      ]
    },
    usecases: {
      name: 'Real-World Use Cases',
      description: 'Practical Git examples used in real projects',
      steps: []
    }
  }



  const [isPaused, setIsPaused] = useState(false)
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 min-h-[calc(100vh-80px)] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2 sm:mb-3 flex-shrink-0"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Git Tutorial
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm px-2">
            Learn Git concepts through interactive animations
          </p>
        </motion.div>

        {/* Scenario Selection */}
        <motion.div
          className="glass-card p-3 mb-3 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setScenario('intro')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${scenario === 'intro'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white/10 hover:bg-white/20'
                  }`}
              >
                📖 Introduction
              </button>
              <button
                onClick={() => setScenario('workflow')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${scenario === 'workflow'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/10 hover:bg-white/20'
                  }`}
              >
                <span className="hidden sm:inline">Full Workflow</span>
                <span className="sm:hidden">Workflow</span>
              </button>
              <button
                onClick={() => setScenario('pull')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${scenario === 'pull'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/10 hover:bg-white/20'
                  }`}
              >
                Pull
              </button>
              <button
                onClick={() => setScenario('conflict')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${scenario === 'conflict'
                  ? 'bg-red-500 text-white'
                  : 'bg-white/10 hover:bg-white/20'
                  }`}
              >
                <GitMerge size={14} />
                Conflicts
              </button>
              <button
                onClick={() => setScenario('init')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${scenario === 'init'
                  ? 'bg-teal-500 text-white'
                  : 'bg-white/10 hover:bg-white/20'
                  }`}
              >
                Init
              </button>
              <button
                onClick={() => setScenario('undo')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${scenario === 'undo'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white/10 hover:bg-white/20'
                  }`}
              >
                Undo
              </button>
              <button
                onClick={() => setScenario('stash')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${scenario === 'stash'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white/10 hover:bg-white/20'
                  }`}
              >
                <GitCommit size={14} />
                Stash
              </button>
              <button
                onClick={() => setScenario('log')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${scenario === 'log'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white/10 hover:bg-white/20'
                  }`}
              >
                <GitCommit size={14} />
                Log
              </button>
              <button
                onClick={() => setScenario('branch')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${scenario === 'branch'
                  ? 'bg-green-500 text-white'
                  : 'bg-white/10 hover:bg-white/20'
                  }`}
              >
                <GitBranch size={14} />
                Branch
              </button>
              <button
                onClick={() => setScenario('merge')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${scenario === 'merge'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 hover:bg-white/20'
                  }`}
              >
                <GitMerge size={14} />
                Merge
              </button>
              <button
                onClick={() => setScenario('rebase')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${scenario === 'rebase'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white/10 hover:bg-white/20'
                  }`}
              >
                <GitBranch size={14} />
                Rebase
              </button>
              <button
                onClick={() => setScenario('usecases')}
                className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-xs sm:text-sm ${scenario === 'usecases'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'bg-white/10 hover:bg-white/20'
                  }`}
              >
                💼 Use Cases
              </button>
            </div>


          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 lg:min-h-0 lg:overflow-hidden">
          {/* Unified Console View */}
          <motion.div
            className="glass-card p-3 sm:p-4 flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 flex-shrink-0">
              {scenarios[scenario].name}
            </h2>
            <div className="flex-1 min-h-0 overflow-auto space-y-3 custom-scrollbar">
              {/* Description */}
              <div className="glass-card p-2 sm:p-3 bg-white/5">
                <p className="text-xs text-gray-300">
                  {scenarios[scenario].description}
                </p>
              </div>

              {/* Show Use Cases or Terminal based on scenario */}
              {scenario === 'usecases' ? (
                /* Real-World Use Cases with Code Examples */
                <div className="space-y-4">
                  {/* Use Case 1: Feature Branch Workflow */}
                  <div className="border border-blue-500/30 rounded-lg p-3 bg-blue-500/5">
                    <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                      <span>🔀</span>
                      Use Case 1: Feature Branch Workflow for Team Collaboration
                    </h4>

                    {/* Diagram */}
                    <div className="mb-3 glass-card p-2 bg-black/30">
                      <GitDiagram type="branching" />
                    </div>

                    <div className="mb-2">
                      <p className="text-xs text-gray-300 mb-2">
                        <span className="font-semibold text-yellow-400">Problem:</span> Multiple developers need to work on different features simultaneously without interfering with each other's code.
                      </p>
                      <p className="text-xs text-gray-300 mb-2">
                        <span className="font-semibold text-green-400">Solution:</span> Use feature branches to isolate work, then merge when ready.
                      </p>
                    </div>

                    <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                      <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                        Terminal Commands
                      </div>
                      <div className="p-3 font-mono text-xs">
                        <div className="text-gray-400"># Developer 1: Working on login feature</div>
                        <div className="text-green-300">git checkout -b feature/user-login</div>
                        <div className="text-gray-400"># Make changes to login.js</div>
                        <div className="text-green-300">git add login.js</div>
                        <div className="text-green-300">git commit -m "Add user authentication"</div>
                        <div className="text-green-300">git push origin feature/user-login</div>
                        <div className="mt-2 text-gray-400"># Developer 2: Working on payment feature (simultaneously)</div>
                        <div className="text-green-300">git checkout -b feature/payment-gateway</div>
                        <div className="text-gray-400"># Make changes to payment.js</div>
                        <div className="text-green-300">git add payment.js</div>
                        <div className="text-green-300">git commit -m "Integrate Stripe payment"</div>
                        <div className="text-green-300">git push origin feature/payment-gateway</div>
                      </div>
                    </div>

                    <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                      <p className="text-xs text-gray-300">
                        <span className="font-semibold text-purple-300">Why this works:</span> Each developer works in isolation. No conflicts occur until merge time. Code review happens via pull requests before merging to main branch.
                      </p>
                    </div>
                  </div>

                  {/* Use Case 2: Hotfix in Production */}
                  <div className="border border-red-500/30 rounded-lg p-3 bg-red-500/5">
                    <h4 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                      <span>🚨</span>
                      Use Case 2: Emergency Hotfix in Production
                    </h4>

                    <div className="mb-3 glass-card p-2 bg-black/30">
                      <GitDiagram type="hotfix" />
                    </div>

                    {/* Diagram */}
                    <div className="mb-3 glass-card p-2 bg-black/30">
                      <GitDiagram type="branching" />
                    </div>

                    <div className="mb-2">
                      <p className="text-xs text-gray-300 mb-2">
                        <span className="font-semibold text-yellow-400">Problem:</span> Critical bug found in production. Need to fix immediately without deploying unfinished features from development branch.
                      </p>
                      <p className="text-xs text-gray-300 mb-2">
                        <span className="font-semibold text-green-400">Solution:</span> Create hotfix branch from production, fix bug, deploy, then merge back to development.
                      </p>
                    </div>

                    <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                      <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                        Terminal Commands
                      </div>
                      <div className="p-3 font-mono text-xs">
                        <div className="text-gray-400"># Create hotfix from production branch</div>
                        <div className="text-green-300">git checkout main</div>
                        <div className="text-green-300">git pull origin main</div>
                        <div className="text-green-300">git checkout -b hotfix/payment-crash</div>
                        <div className="mt-2 text-gray-400"># Fix the critical bug</div>
                        <div className="text-green-300">git add payment.js</div>
                        <div className="text-green-300">git commit -m "Fix payment processing crash"</div>
                        <div className="mt-2 text-gray-400"># Deploy to production</div>
                        <div className="text-green-300">git checkout main</div>
                        <div className="text-green-300">git merge hotfix/payment-crash</div>
                        <div className="text-green-300">git push origin main</div>
                        <div className="mt-2 text-gray-400"># Merge back to development to keep in sync</div>
                        <div className="text-green-300">git checkout develop</div>
                        <div className="text-green-300">git merge hotfix/payment-crash</div>
                        <div className="text-green-300">git push origin develop</div>
                      </div>
                    </div>

                    <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                      <p className="text-xs text-gray-300">
                        <span className="font-semibold text-purple-300">Why this works:</span> Hotfix is isolated from unfinished features. Production gets the fix immediately. Development branch stays updated with the fix.
                      </p>
                    </div>
                  </div>

                  {/* Use Case 3: Code Review with Pull Requests */}
                  <div className="border border-green-500/30 rounded-lg p-3 bg-green-500/5">
                    <h4 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                      <span>👥</span>
                      Use Case 3: Code Review Process with Pull Requests
                    </h4>

                    <div className="mb-3 glass-card p-2 bg-black/30">
                      <GitDiagram type="pullrequest" />
                    </div>

                    <div className="mb-2">
                      <p className="text-xs text-gray-300 mb-2">
                        <span className="font-semibold text-yellow-400">Problem:</span> Need to ensure code quality and catch bugs before merging to main branch.
                      </p>
                      <p className="text-xs text-gray-300 mb-2">
                        <span className="font-semibold text-green-400">Solution:</span> Use pull requests for peer review before merging.
                      </p>
                    </div>

                    <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                      <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                        Terminal Commands & GitHub Workflow
                      </div>
                      <div className="p-3 font-mono text-xs">
                        <div className="text-gray-400"># Developer completes feature</div>
                        <div className="text-green-300">git checkout -b feature/user-profile</div>
                        <div className="text-green-300">git add .</div>
                        <div className="text-green-300">git commit -m "Add user profile page"</div>
                        <div className="text-green-300">git push origin feature/user-profile</div>
                        <div className="mt-2 text-gray-400"># On GitHub: Create Pull Request</div>
                        <div className="text-blue-300">Title: "Add user profile page"</div>
                        <div className="text-blue-300">Description: "Implements user profile with avatar upload"</div>
                        <div className="mt-2 text-gray-400"># Team reviews code, suggests changes</div>
                        <div className="text-yellow-300">Reviewer: "Please add input validation"</div>
                        <div className="mt-2 text-gray-400"># Developer makes requested changes</div>
                        <div className="text-green-300">git add profile.js</div>
                        <div className="text-green-300">git commit -m "Add input validation"</div>
                        <div className="text-green-300">git push origin feature/user-profile</div>
                        <div className="mt-2 text-gray-400"># After approval, merge via GitHub UI</div>
                        <div className="text-cyan-300">✓ Pull Request Approved & Merged</div>
                      </div>
                    </div>

                    <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                      <p className="text-xs text-gray-300">
                        <span className="font-semibold text-purple-300">Why this works:</span> Catches bugs early through peer review. Maintains code quality standards. Creates documentation of why changes were made. Enables knowledge sharing across team.
                      </p>
                    </div>
                  </div>

                  {/* Use Case 4: Rollback Broken Deployment */}
                  <div className="border border-orange-500/30 rounded-lg p-3 bg-orange-500/5">
                    <h4 className="font-semibold text-orange-300 mb-2 flex items-center gap-2">
                      <span>⏮️</span>
                      Use Case 4: Rollback Broken Deployment
                    </h4>

                    <div className="mb-3 glass-card p-2 bg-black/30">
                      <GitDiagram type="revert" />
                    </div>

                    <div className="mb-2">
                      <p className="text-xs text-gray-300 mb-2">
                        <span className="font-semibold text-yellow-400">Problem:</span> New deployment breaks production. Need to quickly revert to previous working version.
                      </p>
                      <p className="text-xs text-gray-300 mb-2">
                        <span className="font-semibold text-green-400">Solution:</span> Use Git to revert to last known good commit.
                      </p>
                    </div>

                    <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                      <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                        Terminal Commands
                      </div>
                      <div className="p-3 font-mono text-xs">
                        <div className="text-gray-400"># Check recent commits</div>
                        <div className="text-green-300">git log --oneline -5</div>
                        <div className="text-gray-500">abc123 (HEAD) Deploy new payment system</div>
                        <div className="text-gray-500">def456 Update user dashboard</div>
                        <div className="text-gray-500">ghi789 Fix login bug</div>
                        <div className="mt-2 text-gray-400"># Revert to previous commit (def456)</div>
                        <div className="text-green-300">git revert abc123</div>
                        <div className="text-green-300">git push origin main</div>
                        <div className="mt-2 text-gray-400"># Or use reset for complete rollback</div>
                        <div className="text-green-300">git reset --hard def456</div>
                        <div className="text-green-300">git push origin main --force</div>
                        <div className="mt-2 text-gray-400"># Production is now back to working state</div>
                        <div className="text-cyan-300">✓ Deployment rolled back successfully</div>
                      </div>
                    </div>

                    <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                      <p className="text-xs text-gray-300">
                        <span className="font-semibold text-purple-300">Why this works:</span> Git maintains complete history. Can instantly revert to any previous state. Minimizes downtime during incidents. Broken code can be fixed later without pressure.
                      </p>
                    </div>
                  </div>

                  {/* Use Case 5: Collaborative Development with Forks */}
                  <div className="border border-pink-500/30 rounded-lg p-3 bg-pink-500/5">
                    <h4 className="font-semibold text-pink-300 mb-2 flex items-center gap-2">
                      <span>🍴</span>
                      Use Case 5: Contributing to Open Source Projects
                    </h4>

                    <div className="mb-3 glass-card p-2 bg-black/30">
                      <GitDiagram type="workflow" />
                    </div>

                    <div className="mb-2">
                      <p className="text-xs text-gray-300 mb-2">
                        <span className="font-semibold text-yellow-400">Problem:</span> Want to contribute to an open source project but don't have write access to the main repository.
                      </p>
                      <p className="text-xs text-gray-300 mb-2">
                        <span className="font-semibold text-green-400">Solution:</span> Fork the repository, make changes, and submit a pull request.
                      </p>
                    </div>

                    <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                      <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                        Terminal Commands
                      </div>
                      <div className="p-3 font-mono text-xs">
                        <div className="text-gray-400"># Fork the repo on GitHub, then clone your fork</div>
                        <div className="text-green-300">git clone https://github.com/YOUR-USERNAME/awesome-project.git</div>
                        <div className="text-green-300">cd awesome-project</div>
                        <div className="mt-2 text-gray-400"># Add original repo as upstream</div>
                        <div className="text-green-300">git remote add upstream https://github.com/ORIGINAL-OWNER/awesome-project.git</div>
                        <div className="mt-2 text-gray-400"># Create feature branch</div>
                        <div className="text-green-300">git checkout -b fix/typo-in-readme</div>
                        <div className="mt-2 text-gray-400"># Make your changes</div>
                        <div className="text-green-300">git add README.md</div>
                        <div className="text-green-300">git commit -m "Fix typo in installation instructions"</div>
                        <div className="mt-2 text-gray-400"># Push to your fork</div>
                        <div className="text-green-300">git push origin fix/typo-in-readme</div>
                        <div className="mt-2 text-gray-400"># Create Pull Request on GitHub</div>
                        <div className="text-cyan-300">→ Go to GitHub and click "Compare & pull request"</div>
                        <div className="mt-2 text-gray-400"># Keep your fork updated with upstream</div>
                        <div className="text-green-300">git fetch upstream</div>
                        <div className="text-green-300">git checkout main</div>
                        <div className="text-green-300">git merge upstream/main</div>
                        <div className="text-green-300">git push origin main</div>
                      </div>
                    </div>

                    <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                      <p className="text-xs text-gray-300">
                        <span className="font-semibold text-purple-300">Why this works:</span> Forking creates your own copy where you have full control. You can experiment freely without affecting the original project. Pull requests allow maintainers to review your changes before merging. This is how thousands of developers contribute to projects like React, Vue, and Linux.
                      </p>
                    </div>
                  </div>

                  {/* Use Case 6: Managing Multiple Environments */}
                  <div className="border border-teal-500/30 rounded-lg p-3 bg-teal-500/5">
                    <h4 className="font-semibold text-teal-300 mb-2 flex items-center gap-2">
                      <span>🌳</span>
                      Use Case 6: Managing Dev, Staging, and Production Environments
                    </h4>

                    <div className="mb-3 glass-card p-2 bg-black/30">
                      <GitDiagram type="merge" />
                    </div>

                    <div className="mb-2">
                      <p className="text-xs text-gray-300 mb-2">
                        <span className="font-semibold text-yellow-400">Problem:</span> Need to maintain separate codebases for development, staging, and production with different configurations.
                      </p>
                      <p className="text-xs text-gray-300 mb-2">
                        <span className="font-semibold text-green-400">Solution:</span> Use Git branches to manage different environments and merge changes through them.
                      </p>
                    </div>

                    <div className="bg-gray-900/80 border border-gray-700 rounded overflow-hidden mb-2">
                      <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
                        Branch Strategy
                      </div>
                      <div className="p-3 font-mono text-xs">
                        <div className="text-gray-400"># Branch structure</div>
                        <div className="text-cyan-300">main (production) → stable, deployed to production</div>
                        <div className="text-cyan-300">staging → testing before production</div>
                        <div className="text-cyan-300">develop → active development</div>
                        <div className="text-cyan-300">feature/* → individual features</div>
                        <div className="mt-2 text-gray-400"># Development workflow</div>
                        <div className="text-green-300">git checkout develop</div>
                        <div className="text-green-300">git checkout -b feature/new-payment-method</div>
                        <div className="text-gray-400"># ... make changes ...</div>
                        <div className="text-green-300">git commit -m "Add PayPal integration"</div>
                        <div className="mt-2 text-gray-400"># Merge to develop for testing</div>
                        <div className="text-green-300">git checkout develop</div>
                        <div className="text-green-300">git merge feature/new-payment-method</div>
                        <div className="text-green-300">git push origin develop</div>
                        <div className="text-cyan-300">→ Auto-deploys to dev environment</div>
                        <div className="mt-2 text-gray-400"># After testing, promote to staging</div>
                        <div className="text-green-300">git checkout staging</div>
                        <div className="text-green-300">git merge develop</div>
                        <div className="text-green-300">git push origin staging</div>
                        <div className="text-cyan-300">→ Auto-deploys to staging environment</div>
                        <div className="mt-2 text-gray-400"># After QA approval, deploy to production</div>
                        <div className="text-green-300">git checkout main</div>
                        <div className="text-green-300">git merge staging</div>
                        <div className="text-green-300">git tag -a v1.2.0 -m "Release v1.2.0"</div>
                        <div className="text-green-300">git push origin main --tags</div>
                        <div className="text-cyan-300">→ Auto-deploys to production</div>
                      </div>
                    </div>

                    <div className="bg-purple-500/10 border-l-2 border-purple-400 rounded p-2">
                      <p className="text-xs text-gray-300">
                        <span className="font-semibold text-purple-300">Why this works:</span> Each environment has its own branch with appropriate stability level. Changes flow through environments (dev → staging → production) ensuring thorough testing. Tags mark production releases for easy rollback. CI/CD pipelines can automatically deploy based on branch updates.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Terminal Simulation for other scenarios */
                <div className="glass-card p-2 sm:p-3 bg-black/50 border border-gray-600">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-600">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-gray-400">Terminal</span>
                  </div>

                  <div className="font-mono text-xs space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                    {scenarios[scenario].steps.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {/* Command */}
                        <div className="flex items-start gap-2">
                          <span className="text-green-400">$</span>
                          <span className="text-blue-300">{s.command}</span>
                        </div>

                        {/* Output */}
                        {s.output && (
                          <div className="text-gray-300 whitespace-pre-wrap mt-1 ml-4">
                            {s.output}
                          </div>
                        )}

                        {/* Explanation */}
                        <div className="mt-2 p-2 bg-blue-500/10 border-l-2 border-blue-400 rounded">
                          <div className="text-blue-300 text-xs">💡 {s.explanation}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
