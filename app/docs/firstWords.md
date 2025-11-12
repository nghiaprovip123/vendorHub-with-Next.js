---venhub--

Hello everyone, my name is Nghia.

These are some words for my new world-class e-commerce project — a multi-tenant marketplace.

For the whos don't know me. . a short description from me. . I'm 22 year olds guy who loves digital transformation, new trendy technologies,  music.

My new project is called "vendorhub". . this is the multi-tenant Saas platform like Gumroad. . where digital content creator have their own storefront brand via subdomains.

One interesting challenge lies in the architectual design - i use the single MongoDB database with subscription isolation instead of separate databases for each subcription, like companies like Slack or Notion for large scale of subcriptions.

I will Stripe Connect to split the all the payments, so that when the Customers buy products from Vendors. . the platfrom will automatically deduct 10% of our commission and the rest of the payment value will be transfered to supplier's connected account. This requires webhook handling, payment intents and transfers.

From the business perspective, i have write 81 detail high-level use cases for  3 actors: Customers || Vendors || Admin.
Before development phase, i will create ERD diagram for the relationship database.

The system will be writed by Typescript + Next.js which have a support from PayloadCMS. Of course, for the most convinence, i will use Vercel for deployment.
