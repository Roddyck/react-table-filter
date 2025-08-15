# React table filter

User table React-based SPA with filtering

Fetches random generated users from `"https://randomuser.me/api/?results=15"`.
Displays user data in a table format with the ability to filter by name and view
higher resolution images on hover.

Deployed and available at [github pages](https://roddyck.github.io/react-table-filter/)

## Features
* **Real-time filtering**: Search users by name with debounced input (custom
useDebounce hook)
* **Interactive elements**:
    * Clear filter button
    * Image tooltip on hover (shows higher resolution image)
* **Loading states**: Spinner animation during data fetching

## Tech Stack
* React
* TypeScript
* Vite
* Tailwind CSS

## Development
```bash
# clone repo
git clone https://github.com/Roddyck/react-table-filter.git

# install packages
npm install

# run dev server
npm run dev
```
