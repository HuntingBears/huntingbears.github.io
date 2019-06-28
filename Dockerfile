FROM dockershelf/python:3.5
MAINTAINER Luis Alejandro Martínez Faneyth <luis@huntingbears.com.ve>

RUN apt-get update && \
    apt-get install sudo

RUN useradd --create-home --shell /bin/bash --uid 1000 travis

RUN echo "travis ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/travis

ADD requirements.txt /home/travis/app/

RUN pip install -r /home/travis/app/requirements.txt

RUN rm /home/travis/app/requirements.txt

RUN chown -R travis:travis /home/travis/app

USER travis

WORKDIR /home/travis/app
