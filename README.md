# Bear Feeder

A simple Express server that converts a BearBlog feed into a JSON object and serves it over HTTP.

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/stilwell/bear-feeder.git
```

2. Install dependencies

```bash
npm install
```

3. Set the `FEED_URL` environment variable.

```bash
vim .env
```

4. Run the server in development mode

```bash
npm run dev
```

5. Access the feed at `http://localhost:3000/feed`.

## Building and Running with Docker

1. Build the Docker image

```bash
docker build -t bear-feeder:latest .
```

2. Run the Docker container.

Either as a daemon...

```bash
docker run -d -p 3000:3000 bear-feeder:latest
```

Or interactively...

```bash
docker run --rm -it -p 3000:3000 bear-feeder:latest
```

3. Access the feed at `http://localhost:3000/feed`.
