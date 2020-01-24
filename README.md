# OurGroceries

## Authors
* Marcel Koschu
* Nadine Meister
* Andreas Raith
* Anja Stadlhofer

## Requirments
* python 3.8.0 with pip installed
* A Virtual Environment for python

## Description
Managing the grocery shopping between family members requires a lot of communication. This application helps families to overcome these hurdles, because every member can see what is currently at home and what is on the shopping list – nothing will be bought twice! 

Additionally, users who are logged in will be notified if a product in their fridge is near its expiration day. 
Because our application combines the features of a shopping list and of a fridge list, users can move items directly from the shopping list to the fridge and vice versa.


The owner can also add users to his shopping list with restricted permissions. As example: children can only request items for the shopping list, which must be approved by other members.


## General Setup

Clone the git repository and change in the project folder
````bash
git clone https://github.com/BlueGhost147/OurGroceries.git
cd OurGroceries
````

### Create local enviroment
````bash
virtualenv venv
````
### Activate the local enviroment
````bash
cd venv\Scripts\
activate.bat
cd ../..
````

## Backend Setup

### Install dependencies
Activate the virtual environment and change in the backend folder
````
cd backend
````

Use the requriments.txt to resolve the dependencies (after cloning the repo)
````bash
pip install -r requirements.txt
````

### Setup database

Migrate the model changed to the database
````bash
python manage.py migrate
````

Create a superuser (optional)
Note: Users which are created with the createsuperuser-command or in the django backend cann´t log in in the frontend, since they don´t have a UserProfile. To fix this a UserProfile has to be create manually for the user.
````bash
python manage.py createsuperuser
````

### Run the server

Run the server on port 8000

````bash
python manage.py runserver
````

**Note**: The current configuration sets the debug flag as true. This has to be change for a live deployment.

## Frontend Setup

### Install dependencies
Change in the frontend folder
````
cd frontend\our-groceries
````

Install all required angular dependencies
````bash
npm install --save-dev @angular-devkit/build-angular
npm install @auth0/angular-jwt
ng add @angular/material
npm install ngx-long-press --save
````

Reference: [Stackoverflow - devkit-build-angular](https://stackoverflow.com/questions/50333003/could-not-find-module-angular-devkit-build-angular)


### Run the server
````
ng serve
````

## Troubleshooting

If django throws the error 'No such table' 

````bash
python manage.py migrate --run-syncdb
````

Reference: [Stackoverflow django-no-such-table](https://stackoverflow.com/questions/12784835/django-no-such-table)


## Commands


optional: Fix security vulnerabilities
````bash
npm audit fix
````
