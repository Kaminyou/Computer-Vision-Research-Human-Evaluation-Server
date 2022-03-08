FROM nikolaik/python-nodejs:latest

COPY ./backend /home/cv/backend
COPY ./frontend /home/cv/frontend
COPY ./misc /home/cv/misc
WORKDIR /home/cv
RUN cd frontend && yarn install
RUN cd frontend && yarn build
RUN cd backend && pip install -r requirements.txt
RUN apt-get update
RUN apt-get -y install nginx
RUN cp /home/cv/misc/default /etc/nginx/sites-available/default
RUN rm /var/www/html/*
RUN cp -r /home/cv/frontend/build/* /var/www/html/
EXPOSE 9090

CMD ["/bin/bash", "/home/cv/misc/start.sh"]