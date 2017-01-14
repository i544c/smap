## Django Development With Docker Compose

Edit .env
```
SECRET_KEY=5(15ds+i2+%ik6z&!yer+ga9m=e%jcqiz_5wszg)r-z!2--b2d
DB_NAME=postgres
DB_USER=postgres
DB_PASS=postgres
DB_SERVICE=postgres
DB_PORT=5432
```

Create new app
```
docker-compose exec web bash
mkdir -p docker_django/apps/<appname>
python manage.py startapp <appname> docker_django/apps/<appname>
```
