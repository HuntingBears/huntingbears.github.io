FROM dockershelf/python:3.5
MAINTAINER Luis Alejandro Martínez Faneyth <luis@huntingbears.com.ve>

RUN apt-get update && \
    apt-get install sudo ruby ruby-dev build-essential zlib1g-dev

RUN gem install bundler

RUN useradd --create-home --shell /bin/bash --uid 1000 travis

RUN echo "travis ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/travis

ADD requirements.txt Gemfile /home/travis/app/

RUN pip install -r /home/travis/app/requirements.txt

RUN bundle install --gemfile /home/travis/app/Gemfile

RUN apt-get purge ruby-dev build-essential zlib1g-dev && apt-get autoremove

RUN rm /home/travis/app/requirements.txt /home/travis/app/Gemfile

RUN chown -R travis:travis /home/travis/app

USER travis

WORKDIR /home/travis/app
