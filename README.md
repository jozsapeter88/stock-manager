![header](https://github.com/jozsapeter88/stock-manager/assets/113460628/f7f63c31-10bd-43fc-81a7-736467bb36ba)

<span style="color: blue">ℹ️ Please note that this is not the final version of the project, therefore bugs may appear. If you have any suggestions or observations, please do not hesitate to reach out to us!</span> 

## <span style="font-size: 24px"><b>Introduction 👋</b></span>
Welcome to the Stock System Manager, this a project by two of us, [jozsapeter88](https://github.com/jozsapeter88) and [hajosroli](https://github.com/hajosroli). 

A React / C# project designed to help you manage your facilities and track their corresponding item stock. This system allows you to place orders for items linked to each facility and effectively manage the order process.

## <span style="font-size: 24px"><b>Features 🚀</b></span>
<i>(including TBA features)</i>

• Track Item Stock: Keep track of the available stock for each item associated with a facility.

• Place Orders: Easily place orders for items from their corresponding facilities.

• Manage Facilities: Add, edit, and remove facilities, each with its own stock information.

• Responsive UI: Create a user-friendly interface that adapts to various screen sizes and devices.

• User Authentication: Implement user authentication and authorization to ensure data security and privacy.

• Data Visualization: Utilize charts and graphs to visualize stock trends and order history.

## <span style="font-size: 24px"><b>Technologies and Tools Used</b></span>

• MERN Stack: The project was originally developed using the MERN stack, which includes MongoDB, Express, React, and Node.js.

• ASP.NET Web API: Subsequently, we opted to transition the backend to an ASP.NET Web API, paired with a PostgreSQL database.

• Entity Framework: For our data access layer, we utilized Entity Framework, a popular ORM (Object-Relational Mapping) framework for .NET.

• Identity Framework: To manage user authentication and authorization, we integrated the ASP.NET Identity Framework.

• xUnit: For unit testing, we chose xUnit, ensuring the reliability and robustness of our application.

## <span style="font-size: 24px"><b>Instructions 🔧</b></span>
Follow these instructions to set up the Stock System Manager on your local machine:

Clone the repository to your local system using Git.
```bash
# Clone the repository to your local system.
$ git clone https://github.com/jozsapeter88/stock-manager.git

# Open the solution
# Navigate to the project directory.
$ cd stock-system-manager

# Make a copy of the .env_public files
In the project root folder find .env_public_compose, rename it to .env and add your strong password,
(in the frontend folder find .env_public_frontend you can modify the URL as well if you want)

# Open the appsettings.json file and you can update the "DockerCommandsConnectionString" value with your database connection string.

# Build Docker Images:
Navigate to the project directory and build the Docker images using the following command:

$ docker-compose build

# Start the containers in the following order

# Start the database container
$ docker-compose up -d db

# Start backend container
$ docker-compose up -d stockbackend

# Start frontend container
$ docker-compose up -d stockfrontend

# Open your web browser and go to http://localhost:3000 to explore the Stock System Manager.
```
# How to use it
## Check out the 2-minutes tutorial right [here](https://scribehow.com/shared/Stock_Manager_How-to_demonstration__bLf2BrTbRNmzBALCnWWGjg).

# Stats
<img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/jozsapeter88/stock-manager" /> <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/jozsapeter88/stock-manager" /> <img alt="" src="https://img.shields.io/github/repo-size/jozsapeter88/stock-manager" /> <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/jozsapeter88/stock-manager" /> <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/jozsapeter88/stock-manager" />
