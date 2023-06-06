# Financial Table App

This is a single-page application that represents a table of financial instruments. The table allows you to sort the data by "Asset Class", "Price" (in descending order), and "Ticker". The rows are color-coded based on the "Asset Class", and the "Price" is displayed in blue for positive values and red for negative values.

## Getting Started

To get started with the Financial Table App, follow the instructions below.

### Prerequisites

Make sure you have the following software installed on your system:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository to your local machine:

```bash

git clone <repository-url>

```
2. Change into the project directory:

```bash

cd financial-table

```

3. Install the dependencies:

```bash

npm install

```

### Installation

1. Start the application:

```bash

npm start

```

2. Open your browser and visit http://localhost:3000 to access the Financial Table App.


### Project Structure

The project structure is as follows:

```bash

jpmorgan/
  ├── public/
  │   └── index.html
  ├── src/
  │   ├── components/
  │   │   └── FinancialTable.tsx
  │   ├── models/
  │   │   └── index.tsx
  │   ├── services/
  │   │   └── index.tsx
  │   │   └── db.json
  │   ├── App.tsx
  │   ├── App.css
  │   ├── index.tsx
  │   └── ...
  ├── package.json
  └── README.md

```