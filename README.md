# Event Management System ([OASIS '23](https://bits-oasis.org/))   

## _To-do_
  - [x] _Disable update button when score has been frozen_
  - [ ] _Manage page refresh_
  - [ ] _Key Logger_
  - [ ] _Make styles consistent all over (especially on Desktop)_
  - [ ] _Improve routing implementation_
  - [x] _Add actions for update and freeze score_
  - [x] _Link above actions to UpdateScore and Level component_
  - [x] _Resolve teamInfo route bug_
  - [x] _Provide feedback on score update and freeze_
  - [x] _Change update score view to allow parameter wise scoring_
  - [x] _Handle inputs in update score view_

## EMS

Portal for judges to grade the participating teams at various levels of an event. The project has been bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
- Authentication - JSON Web tokens
- Styled components - [Material UI](https://material-ui.com/)

## Setup
- Clone and cd into the repo folder
- Run `npm install`
  - Run `npm run start` to spin up a development server
  - Run `npm run build` for a production build

_Please note the branch structure:_
  - `dev-restart` is the development branch. All new commits must be pushed here
  - `master` is the production branch. Do not mess this up.

