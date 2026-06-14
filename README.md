# twitter_react_frontend

Next.js frontend for the Twitter clone.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The signup page is available at:

```text
http://localhost:3000/signup
```

Set `NEXT_PUBLIC_API_BASE_URL` when the Go API is not running on
`http://localhost:8080`.

## Repository Structure

This project is managed separately from the Go API repository.

```text
Desktop/twitter-clone/
├── twitter_golang_backend/
└── twitter_react_frontend/
```

## Development Flow

Create one branch and one PR for each task section.

Use branch names that make the developed feature clear, for example:

- `feature/signup-page`
- `feature/login-page`
- `feature/tweet-post-form`
- `feature/tweet-list`
- `feature/profile-page`

Use `PR` as the abbreviation for pull request.
