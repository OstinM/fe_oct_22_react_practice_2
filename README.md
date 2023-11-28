# React Photo Album Practice

You are given markup for a table of photos and 3 arrays.
Implement as much options below as you can:

1. Render photos in a table with id, title, album title and an user name.
    - owner names should be colored with `has-text-link` for men and `has-text-danger` for women.
1. Implement ability to filter photos by an owner:
    - If a user is selected it should be highlighter with `is-active` class;
    - Show only photos of a selected user;
    - Select `All` to see all the photos.
1. Use the `input` to filter photos by name.
    - Show only photos having the input value in their name ignoring the case;
    - The `x` button should appear only when the value is not empty;
    - Clear the value after the `x` button click.
1. Show `No results` message if there are no photos matching current criteria
    - `Reset All Filters` button should clear all the filters.
1. (*) Allow to select several albums:
    - Add `is-info` class to selected categories;
    - You should truncate text of the album name (with CSS or JS)
    - Show only photos of selected categories;
    - `All` button should clear the selection;
    - Remove `is-outlined` class from the `All` button if no categories are selected.
1. (*) Implement photo reordering.
    - add the last column with &darr; and &uarr; buttons
    - with moveUp button, move the item of the list to the one up position (if it's the first element - do nothing)
    - with moveDown button, move the item of the list to the one bottom position (if it's the last element - do nothing)

## Instructions
- Fork, clone and run `npm i`
- fix the DEMO LINK below (use your github username and the repo name)
  - [DEMO LINK](https://OstinM.github.io/fe_oct_22_react_practice_2)
- implement tasks one by one (You can do it in the `App.tsx`)
- `commit`, `push` and `deploy` after each task
- Send a link to your `App.tsx` file to your personal Slack channel (for example #fe_apr22_misha_hrynko)
- Send a message about solving the next tasks after each `push` and `deploy` (e.g. Task 3 is done)
- If you are done with the required tasks please proceed solving the optional once
- Stop when the time is over (typically 2.5 hours from start)
