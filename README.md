## Before you do anything, make sure you have installed:
- Docker
- Node
- Python

## To setup the project
First of all, setup the .env file like my .env.example.
Then: 

```bash
docker-compose up -d
npm -i
npx prisma generate
npx prisma migrate dev --name init
```

## To run the database:
- docker-compose up -d
- go to http://localhost:5050/ (to view the database via pgAdmin)
- enter PGADMIN_DEFAULT_EMAIL and PGADMIN_DEFAULT_PASSWORD

## To register a new server inside the db
- docker container ls (to get the CONTAINER ID of the postgres image)
- docker inspect CONTAINER ID (to find the IP of the container)
- Then inside the pgAdmin -> Add new Server
- On General tab put a name (e.g. 'text_search')
- On Connection tab enter the IP of the container on Hostname
- Username and passoword: POSTGRES_USER and POSTGRES_PASSWORD

## To run in dev mode

Simply run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## To run the word2vec api
Run word2vec_endpoint.py in order to run the endpoint. This is required since it returns the user input as a vector so it can be compared to the stored vectors.

# Finally
- Open the project and navigate to /insert-data. This will populate your database with data that were created by generate-text-vectors.py (you don't have to run this script I already generated the data for you in simple_sentence_vectors.json)

- After that, happy searching!
