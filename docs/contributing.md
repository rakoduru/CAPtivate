### Contributing Guideline

(This is just a draft and suggestions for improvements are welcomed)

### Development Task Workflow

When you start working on a Task

Pick an issue from the Todo list. If the issue that you are going to work on does not exist in the list, Add it with a small description.
Checkout the repo.
For example:

```
git clone https://github.com/airavata-courses/CAPtivate.git
cd CAPtivate
```

Create a branch with the following naming convention depending on the type of your task

```
feature/<short-description>
fix/<short-description>
refactor/<short-description>
doc/<short-description>
```

For example :

```
git checkout -b feature/support-user-login
```

Make required changes in the code, do commits.
Push the new branch into remote.
For example :

```
git push origin feature/support-user-login
```

Create a Github pull request for the newly pushed branch with appropriate title and description and add label WIP.
Reference your issue number using `fixes #<ISSUE-NUMBER>`  in the pull request that you create and github will automatically take care of moving the issue in the project board depending on the status of the PR.

When you finish the task

Make sure your change works and will not break master build. (TODO: this will be replaced by Travis)

Remove the WIP label and assign a couple of team members to review the code. This can ensure good code quality.

Reviewers will review the PR and add comments if changes are required. Repeat this till the PR is approved.

The PR can be merged once it is approved and the task should be moved to done state.