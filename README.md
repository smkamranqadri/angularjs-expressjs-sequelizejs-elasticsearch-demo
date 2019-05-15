# Demo Application

### It's a demo application for using angularjs, expressjs, sequelizejs and elastic search.

> Steps to start application

1. Install Docker
2. Install Docker Compose
3. Copy .env.sample into .env
4. Run this command `docker-compose up` to start all containers.
5. This will take some time to finished, first it pull the images then it will start the container.
6. Elastic Search container requires more time to complete finish the setup when it start so you need to wait till logging stops for elasticsearch container so we need to restart the nodejs container for connecting again.
7. Once done, open new terminal.
8. Run this command `docker stop nodejs` and check logs on first terminal for stopping of nodejs container.
9. Run this command `docker start nodejs` and check logs again for starting up and success message of connecting to mysql and elasticsearch container.
10. After run this command `docker exec -it nodejs bash` this will gives the bash access of the nodejs container.
11. Now run this command `npm run seed` which run put the seed data into database and elasticsearch.
12. Open brower and run `localhost:3333` and you can now use the application.
13. Now using any code editor you can edit the code and it will restart the server and build the angularjs code.
