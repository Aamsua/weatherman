
# Weatherman

Weatherman is a site where a user can compare the predictions of 3 different weather sites.


## 1. Any assumptions you made that were not clearly written in the task description

For date range the user can only choose between 1-3 days to get forecasts, because
Weather APIs I used  have limited date range in free versions. To compare the current weather with forecast, 
first the user has to save the forecast to DB (by clicking "Save weather data" button - a notification should 
appear in top right corner), then  enter the **capitalized** country name and date in format **YYYY-MM-DD**. Then it
finds the data matching those parameters and returns forecast info about the region it matches in the database and ads
current weather information.


## 2. How to deploy/run your solution 

Required to run the application:
  * Angular CLI and Node.js installed
  * PostgreSQL (Server and PgAdmin)
  * IntelliJ Idea or other IDE

1. Clone the repo from Github by copying the  link to command line  ```git clone https://github.com/aamsua/weatherman.git```.
2. Navigate into the 'frontend' folder from the command line and enter ```npm install``` in the terminal.
3. Start PostgreSQL server (Windows key + R, type ```services.msc```, find your Postgres service, start if it's not running), 
4. Open PgAdmin and log in. Under 'Databases' create a new database named "weatherman" and click on it to make it active.
5. Open 'backend' in your IDE (IntelliJ Idea Community in example).
6. Connect the backend to the database (In IntelliJ Idea Community install Database Navigator plugin, navigate to  
View -> Tool Windows -> DB Browser, click on '+' sign choose 'PostgreSQL' and insert your database name (weatherman), user and password.
Test the connection by clicking the button in the bottom right. If needed, navigate to 
backend/src/main/resources/application.properties and configure the file according to your database.
7. Open the file backend/src/main/java/com/example/weatherman_backend/WeathermanBackendApplication.java and start backend
   (in IntelliJ click on the green arrow (or Shift+F10) on the top ribbon right). 
8. In IDE terminal navigate into 'frontend' folder and type ```ng serve --open``` for the front end to start. The API should open
automatically at  http://localhost:4200/ .


## 3. How you solved the tasks, and how much time did different parts take

I started with backend because I had some fresh experience using Java and Spring Boot. I set up the necessary Java Classes (controller, model etc.)
and properties to be able to connect to Postgres DB (I had Postgres already installed in my laptop, for DB I used Dbeaver also).

After that I took a break in the project and started learning Angular. I watched some Angular Course videos in Youtube 
and practiced with Typescript and Angular, I didn´t have any experience before.
This took me 2 days, I guess about 20 hours.

Last I started with frontend. Creating services to receive the needed data from the APIs. There were multiple problems
(precipitation info differs in Apis - millimeters, boolean, percentage) I had to deal with. Also that Accuweather
Trial access allows each developer only up to 50 calls per day was a problem to deal with by working on design. 

Total time :
* Back-end: 6h
* Learning Angular: 20h +
* Front-end functionality: 10h
* HTML & SCSS 5h
* README.md 1,5h


## 4. How you decided what to implement and what to skip

My goal was to do as much as I can in one week, which I thought would be the time needed for this task.
I started from the beginning and moved step by step. I managed to implement stages 1,2,3 and partly stage 5.


## 5. What were the biggest challenges and how did you overcome them
The biggest challenges was to learn Angular in a limited period of time. 
Watching and reading tutorials helped me a lot.
Also, not watching some football World Cup matches was a challenge. 


## 6. If there was a problem you did not have time to overcome, describe how you think it could be solved with more time

If I had more time I would start implementing stage 4.


## 7. What did you learn from implementing the project

I have learned Angular and TypeScript, which was interesting and definitely a beneficial experience.
I also got useful experience with weather APIs and using maps.