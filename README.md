### Cook Book - React.js + Node.js Application by [Benerous](https://github.com/Benerous)

## Main features
- Display list of recipes (image, title, date created and description).
- Search by title in list of recipes.
- Add new recipe.
- Add new recipe based on another one. 
  - 'Child' recipes are shown as 'children' of a 'parent' recipe. 
  - User can add 'child' recipe to recipes on any depth.
- Modify existing recipe on any depth.
- Delete existing recipe on any depth.
- View full information about recipe (image, title, date created and date last modified, description, ingredients, method and list of 'child' recipes).
- View every previous recipe versions of 'child' recipe if exist (if not - show list of recipes).
- Recipes sorted alphabetically on any depth.

## Demo Website
Deme: https://benerous-cook-book-app.herokuapp.com/

## Main Application's Dependencies
- React.js - v9.5.0
- Redux - v4.0.5
- Node.js - v12.14.1
- Express - v4.17.1
- MongoDB - v4.2.8
- Mongoose - v5.9.24
- Bootstrap - 4.5.0

## Warning
### Currently adding image to recipe is possible only via URL, so image with local path won't be shown on application.

## Run locally
- Clone to local machine
```bash
git clone [git@github.com:Benerous/cook-book-app.git]
cd cook-book-app
```
- Run Backend
```bash
cd backend
npm install
npm start
```
- Run Frontend (in new terminal)
```bash
cd frontend
npm install
npm start
```
# For any questions [Email Benerous](mailto:bogdanvyshynsky2201@gmail.com)

## License
[ISC](https://choosealicense.com/licenses/isc/)