FROM dockershelf/python:3.5
MAINTAINER Luis Alejandro Martínez Faneyth <luis@huntingbears.com.ve>

RUN apt-get update && \
    apt-get install sudo

RUN useradd -ms /bin/bash huntingbears

RUN echo "huntingbears ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/huntingbears

ADD requirements.txt /home/huntingbears/app/

RUN pip install -r /home/huntingbears/app/requirements.txt

RUN rm /home/huntingbears/app/requirements.txt

USER huntingbears

WORKDIR /home/huntingbears/app
