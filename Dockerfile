FROM gobuffalo/buffalo:latest
RUN mkdir -p $GOPATH/src/github.com/tonyalaribe/mybonways
WORKDIR $GOPATH/src/github.com/tonyalaribe/mybonways
RUN apt-get install -y automake build-essential git gobject-introspection \
  libglib2.0-dev gtk-doc-tools
RUN git clone https://github.com/jcupitt/libvips.git && cd libvips && ./bootstrap.sh && ./configure --enable-debug=no --without-python --without-fftw --without-libexif \
    --without-libgf --without-little-cms --without-orc --without-pango --prefix=/usr && make && make install &&  ldconfig
ADD package.json .
RUN npm install
ADD . .
RUN buffalo build -o bin/app
CMD ./bin/app
