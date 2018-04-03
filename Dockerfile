FROM dockershelf/python:3.5
MAINTAINER Luis Alejandro Martínez Faneyth <luis@huntingbears.com.ve>

RUN apt-get update && \
    apt-get install sudo ruby ruby-dev build-essential zlib1g-dev

RUN gem install github-pages

RUN useradd --create-home --shell /bin/bash --uid 1000 huntingbears

RUN echo "huntingbears ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/huntingbears

ADD requirements.txt /home/huntingbears/

RUN pip install -r /home/huntingbears/requirements.txt

RUN apt-get purge ruby-dev build-essential zlib1g-dev && apt-get autoremove

RUN rm /home/huntingbears/requirements.txt

USER huntingbears

WORKDIR /home/huntingbears
