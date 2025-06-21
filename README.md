# Book Management Application

## Overview

This is a full-stack web application for managing a collection of books. Users can create, read, update, and delete books through a modern, responsive UI.

The backend is built with **ASP.NET Core Web API**, and the frontend uses **Angular** with **Angular Material** and **Chart.js** for data visualization.

---

## Features

- View all books with detailed info (title, author, ISBN, published date, description)
- Add, edit, and delete books
- Display latest 5 books in a table view
- Display oldest 10 books in a list view
- Visualize books grouped by author using a donut chart
- Responsive UI with smooth SPA experience (no page reloads)

---

## Technologies Used

- **Backend:** ASP.NET Core Web API, C#
- **Frontend:** Angular, TypeScript, Angular Material, Chart.js
- **Tools:** Visual Studio / VS Code, Postman (API testing)
- **Version Control:** Git, GitHub

---

## Getting Started

### Prerequisites

- [.NET 7 SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)
- Angular CLI (`npm install -g @angular/cli`)

### Backend Setup

```bash
cd backend
dotnet restore
dotnet run
