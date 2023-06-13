## ConvertKit Next.js Segment setup

This is a very simple version of how we have Segment set up on our Next.js site. Almost all documentation is contained within the components.

## Setup

1. Copy `.env.example` to `.env.local` and fill in the values. You'll need the production and development write keys from Segment. The data team will provide these.
2. Run `yarn install` or `npm install` to install the dependencies. It doesn't really matter which you use.

## Running the app

1. Run `yarn dev` or `npm run dev` to start the app. It will be available at http://localhost:3000.
2. Make sure your cookies are cleared before checking the app, especially the `_ck_allow_cookies` cookie. This is the cookie that Segment uses to determine if a user is new or returning. If you don't clear this cookie, you'll always be a returning user.
