# Mini projet licence
Project made to obtain the licence certificate of computer science at University of Abou bekr Belkaid Tlemcen 
made by : 
- BENZERDJEB MOHAMED Adnane. 
- BEZZEGHOUD Mohammed.
- FEKIH MOHAMMED Amine.

<p align="center">
    <img src="https://res.cloudinary.com/dxobgdfyq/image/upload/v1675808635/Logo-Univ_Tlemcen_biaecn.png" 
        alt="Picture"
        width="200" 
        height="300"  /> </p>

![frontend](https://res.cloudinary.com/dxobgdfyq/image/upload/v1675808631/mini_tz7k12.png)
![backend](https://res.cloudinary.com/dxobgdfyq/image/upload/v1675810305/mini1_pktt85.png)



## Features

- Booking for users.
- Verify user infos also check the bookings history.
- Edit user's infos and credentials.
- Admin dashboard to manage bookings and users.

## How to use : 
- make sure to create your own .env file in the backend folder and put the values respecting the .env.example file.
- run ```npm i``` on both backend and client folders.
- run ```npm run dev``` on the client folder and ```npm start``` on the server folder.
- make sure to create a database that has this structure :
 
### hiking table
| COLUMN | ATTRIBUTES |
| ------ | ------ |
| id | INT, PRIMARY KEY, UNIQUE, AUTO INCREMENT |
| tilte | VARCHAR(45) |
| desc | VARCHAR(255) |
| price | INT, NOT NULL |
| cover | VARCHAR(45),UNIQUE |

### users table

| COLUMN | ATTRIBUTES |
| ------ | ------ |
| uid | INT, PRIMARY KEY, UNIQUE, AUTO INCREMENT |
| username | VARCHAR(45),NOT NULL, UNIQUE |
| email | VARCHAR(255),NOT NULL, UNIQUE |
| password | VARCHAR(255), NOT NULL |
| avatar | VARCHAR(45) |
| isAdmin | BOOLEAN |

### bookings table
| COLUMN | ATTRIBUTES |
| ------ | ------ |
| bid | INT, PRIMARY KEY, UNIQUE, AUTO INCREMENT |
| tilte | VARCHAR(45) |
| price | INT, NOT NULL |

## LICENCE

MIT.
