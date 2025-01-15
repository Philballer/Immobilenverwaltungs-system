# Immobilien Verwaltung

Immobilien Verwaltung is a web-based application designed to simplify the management of real estate properties, contacts, and their relationships, such as owners, tenants, and service providers. The system features a sidebar menu with options for managing properties, contacts, and relationships, each with full CRUD functionality.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Mock Backend](#mock-backend)
- [Technologies Used](#technologies-used)
- [Additional Notes](#additional-notes)

## Getting Started

To get started with the LotteryGame application, follow these steps:

1.  **Clone the repository**:

    Copy

git clone https://github.com/Philballer/Immobilenverwaltungs-system.git`

2.  **Install npm packages**:
    - Open the `Immobilien-verwaltung` solution file in your preferred IDE.
    - Run the following code 'npm install' to install all packages and dependencies.

## Project Structure

The project is organized into the following main folders:

- Client: Contains the Angular frontend application.

- Server: Contains the mock backend using JSON Server

1.  **Frontend Structure**:

- Components: Reusable UI components like datatable, contact-card.
- Services: Service classes for API communication (e.g., ContactService, PropertyService).
- Types: Type definitions for models like IContact, IProperty, and IRelationship.

2.  **Backend Structure**:

- db.json: Mock data for properties, contacts, and relationships.

## Features

**Properties Management**:

- Add, View, Update, Delete Properties.
- Uses Google Maps Address Autocomplete API for address suggestions.

**Contacts Management**:

- Add, View, Update, Delete Contacts.
- Uses Google Maps Address Autocomplete API for address suggestions.
- Each contact can be linked to properties and viewed in detail

**Relationships Management**:

- Supports different relationship types: Owner, Tenant, Service Provider.
- Validates overlapping tenant relationships and enforces mandatory fields for service providers.

**Properties Management**:

- Ensures no overlapping tenancy periods for a contact.
- Mandatory fields appear based on relationship type (e.g., Service Provider requires service details).

## Running the Application

To run the application, follow these steps:

1.  Start the Mock Backend: Navigate to the server folder and run yarn start or npm run start.
2.  Start the Frontend: Navigate to the client folder and run yarn start or npm run start.
3.  Open a browser and navigate to http://localhost:4200 to view the application.

## Technologies Used

- Angular 17: Frontend framework.

- Tailwind CSS: Styling.

- JSON Server: Mock backend.

- TypeScript: Type definitions and improved development experience.

- RxJS: Reactive programming for handling asynchronous data streams.

## Additional Notes

- Make sure to have both backend and frontend running simultaneously for the application to function correctly.
