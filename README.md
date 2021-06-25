## Housekeeping

We work in **feature** branches, based on branch **develop**. When the work is done we make a merge request back into **develop**. When enough work is done in **develop** we decide to make a **release**, by creating a **release/x.x.x** branch based on **develop**. This build can then be tested internally, leading to possible **fix** branches, merge requested back into the **release/x.x.x** branch. When the release goes live, we merge it into **master** and into **develop** and apply the tag the **vx.x.x**.

**Hotfixes** branches are based on **master** and after a merge request merged into **master** and **develop**.

**Feature**, **fix** and **hotfix** branches are safe to delete after being merged back into their respective **develop**, **release/x.x.x** and **master** branch.

This process is called [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) and works really well in a multi developer team.

## First use

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


First, install the app server and the dependencies from package.json by running:

```bash
npm install
```


## Getting Started


First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.


## Deploy on AWS

Every change to the develop branch will trigger the gitlab ci/cd pipeline and update the EC2 instance(s) hosting the in-development version of the app .
Actually an app instance is running for viewing and testing at https://dev.cloud.enzosystems.com:3000 


Explanations:
You can trigger a new email to start the flow by sending a GET request to https://dev.cloud.enzosystems.com:3003/email?email=frank@enzosystems.com (you can do it with the webbrowser)
Once you receive the email, it contains a link that expire after 8 or 10 h (not sure need to check the settings on the instances)
This link start the prechecking flow if a reservation is found and valid , once you finish the flow you receive a QRcode.
If you reuse the link , the  prechecked reservation is still retrieve but you re notified that it is already prechcked  and allows you to continue in order to update values . At the end , instead of sending a new QRcode , this 2nd time will reset the reservation to a non -prechecked status
Note , you can also reset a reservation by calling a GET to https://dev.cloud.enzosystems.com:3003/reset?email=frank@enzosystems.com or to https://dev.cloud.enzosystems.com:3003/reset?uuid =reservationID