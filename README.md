## Housekeeping

We work in **feature** branches, based on branch **develop**. When the work is done we make a merge request back into **develop**. When enough work is done in **develop** we decide to make a **release**, by creating a **release/x.x.x** branch based on **develop** (pointing to the cloud staging environment). This build can then be tested internally, leading to possible **fix** branches, merged one by one after code review back into the **release/x.x.x** branch. When the release goes live, we merge it into **master** and into **develop** and apply the tag the **vx.x.x**. Feature and fix branches are safe to delete after being merged back into **develop** and **release-x** branches.

**Hotfixes** branches are based on **master** and after a merge request merged into **master** and **develop**.

This process is called [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) and works really well in a multi developer team.

## First use

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
