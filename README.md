
# Character Copier

This project demonstrates a simple character copier class (`Copier`) in TypeScript. The `Copier` class reads characters from a source (`ISource`) one by one and writes each character to a destination (`IDestination`) until it encounters a newline character (`'\n'`). The project includes unit tests using `ts-mockito` to mock the source and destination interfaces.

## Table of Contents
- [Character Copier](#character-copier)
  - [Table of Contents](#table-of-contents)
  - [How the Code Works](#how-the-code-works)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Running Tests](#running-tests)
  - [Project Structure](#project-structure)
  - [Dependencies](#dependencies)
  - [Notes](#notes)

## How the Code Works

The `Copier` class is designed to perform character-by-character copying from a source to a destination. Here’s a breakdown of the components:

1. **Interfaces**:
   - `ISource`: This interface has a `ReadChar()` method that reads a single character from a source.
   - `IDestination`: This interface has a `WriteChar(char c)` method that writes a single character to a destination.

2. **Copier Class**:
   - The `Copier` class has a method `Copy()` that reads characters from the source one at a time using `ReadChar()` and writes each character to the destination using `WriteChar()`.
   - The copying process stops when a newline character (`'\n'`) is encountered. The newline character is not written to the destination.

3. **Unit Tests**:
   - The tests use the `ts-mockito` library to mock `ISource` and `IDestination`.
   - Different scenarios are tested, including:
     - Normal copying until a newline.
     - Handling cases where the source immediately returns a newline.
     - Stopping at the first newline even if there are additional characters.

## Installation

To get started, make sure you have [Node.js](https://nodejs.org/) installed. Then follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd character-copier
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Project

The main functionality of this project is demonstrated through unit tests rather than a standalone executable script. However, you can create a simple script to manually run the copier.

To add a sample run script, you could add the following to your `src` folder (optional):

```typescript
// src/run.ts
import { Copier } from "./copier";
import { ISource, IDestination } from "./interfaces";

class TestSource implements ISource {
  private data: string;
  private index: number = 0;

  constructor(data: string) {
    this.data = data;
  }

  ReadChar(): string {
    if (this.index < this.data.length) {
      return this.data[this.index++];
    }
    return '\n';
  }
}

class TestDestination implements IDestination {
  WriteChar(c: string): void {
    process.stdout.write(c);
  }
}

// Usage
const source = new TestSource("Hello, world!\nMore data");
const destination = new TestDestination();
const copier = new Copier(source, destination);

copier.Copy();
```

Then, to run this script, use the following command:

```bash
npx ts-node src/run.ts
```

## Running Tests

This project uses [Jest](https://jestjs.io/) and [ts-mockito](https://npmjs.com/package/ts-mockito) for testing. Run the tests with the following command:

```bash
npm test
```

This will execute the tests defined in `src/copier.test.ts` to ensure that the `Copier` class behaves as expected.

## Project Structure

```plaintext
character-copier/
├── src/
│   ├── copier.ts           # The Copier class
│   ├── interfaces.ts       # Interfaces for ISource and IDestination
│   ├── copier.test.ts      # Unit tests for Copier
│   └── run.ts              # Optional script for manual testing
├── package.json            # Project metadata and dependencies
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Dependencies

- `typescript`: For TypeScript support.
- `ts-mockito`: A mocking library for TypeScript, used in unit tests.
- `jest`: A testing framework for running the tests.

## Notes

- This code is designed with a modular structure to easily allow swapping `ISource` and `IDestination` implementations. It’s ideal for understanding test doubles and mocking in TypeScript.
- The tests cover various scenarios to ensure the `Copier` class functions correctly.