

## :books: Teach Portal ##

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#sparkles-design-patterns">Design Patterns</a> &#xa0; | &#xa0;
  <a href="#bangbang-assumptions">Assumptions</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies-and-tools">Technologies</a> &#xa0; | &#xa0;
  <a href="#running-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-app">APP</a> &#xa0;  &#xa0;
</p>

<br>

## :dart: About ##

Teach Portal is an Adminstation portal for Teachers.

**Teacher**
> Teacher Must use signup or login to access Teach Portal

> Teacher must provide FirstName, LastName, Email and valid Password to Signup

> Teacher must provide a valid username and password to Login

> Teacher can create new Student

> Teacher can see list of students created by them

> Teacher can see aother teachers with no of students created by them

**Student**
> Student must have FirstName, LastName and Email for creating a new Student in portal


## :sparkles: Design Patterns ##

:heavy_check_mark: **Backend for FrontEnd** \
React Web app should be deployed independtly with API as it backend

:heavy_check_mark: **Distributed Caching** \
Student list is cached in distributed cache (inmemory for task) only accessed from DB for a Teacher and invalidated if new student added

:heavy_check_mark: **Facade pattern** \
Using Asp.Net identity for managing identity - Authentication and authorization

:heavy_check_mark: **Builder Design Pattern** \
Create different user objects for different roles for Token creation

:heavy_check_mark: **Respository Pattern** \
Student and Teacher data accessed via repository from DB via entity framework

:heavy_check_mark: **Proxy Pattern** \
React uses service as proxy for API

## :bangbang: Assumptions ##

> Use InMemory database - SQL lite for store instead of DB in cloud

> Use InMemory Distibuted caching

> Use a local authentication system instead of third party

> Containeraztion and deployment not requried

> Tests are not required

> Implement one feature in one resource (e.g Pagination only for student not teacher)

> Implement simple portal, do not consider Teachers from multiple orgs (Tenant based App)

## :sparkles: Features ##

`Implemented`

:heavy_check_mark: **Teacher Signup** 

:heavy_check_mark: **Teacher Login** 

:heavy_check_mark: **Create new Student** 

:heavy_check_mark: **Student List with Pagination** 

:heavy_check_mark: **Teacher List with Student Count** 

:heavy_check_mark: **Cache All Students for teacher in API** 

`Future Enhancements`

:heavy_exclamation_mark: Student List with Global Search and Sorting with Spinning loader 

:heavy_exclamation_mark: Use redux store to store future complex pages 

:heavy_exclamation_mark: Move cache to Azure Redis 

:heavy_exclamation_mark: Use PROD Azure SQL DB 

:heavy_exclamation_mark: Azure AD \
Use Azure B2C/Azure Entra external ID for authentication/authorization to different roles
Azure Entra external ID does not support username yet or does not have documentation.
Azure b2c supports username
Use oauth-proxy to protect all API instead using library(e.g. MSAL.js) to protect only current API

:heavy_exclamation_mark: Change table and api for Tenant based product

:heavy_exclamation_mark: Whitelabel the Web and Product with localization

## :rocket: Technologies and Tools ##

The following tools were used in this project:

**API**
- [.Net 8](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Visual studio 2022]

**Web**
- [React 19](https://react.dev/blog/2024/12/05/react-19)
- [Node v22.14.0](https://nodejs.org/en/download)
- [VS Code]


## :running: Starting ##

[Windows]
Run [StartApp.bat](https://github.com/pandurd/teach-portal/blob/main/StartApp.bat)
This will start both API and Web in new shell

**OR**

Use Visual studio to open solution [TeachPortalAPI/TeachPortalAPI.sln](https://github.com/pandurd/teach-portal/blob/main/TeachPortalAPI/TeachPortalAPI.sln) for starting API

**OR**

Use below steps

**API**

> Clone this repo
```bash
git clone https://github.com/pandurd/teach-portal.git
```

```bash
cd teach-portal/TeachPortalAPI/TeachPortalAPI
```

> Install dependencies/test build
```bash
dotnet build
```

> Run API
```bash
dotnet run
```


**Web**

> Navigate to root of repo

```bash
cd teach-portal/teach-portal-web
```

> Install dependencies/test build
```bash
npm i
```

> Run Web
```bash
npm run start
```

## :checkered_flag: App ##

**Web**

Browse "http://localhost:3000/" for Accessing the application

**API**

Browse "http://localhost:5073/swagger/index.html" for Swagger of API


