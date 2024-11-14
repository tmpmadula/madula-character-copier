// src/copier.test.ts

import { Copier } from "./copier";
import { ISource, IDestination } from "./interfaces";
import { mock, instance, when, verify, resetCalls } from "ts-mockito";

describe("Copier", () => {
  let sourceMock: ISource;
  let destinationMock: IDestination;
  let sourceInstance: ISource;
  let destinationInstance: IDestination;

  beforeEach(() => {
    sourceMock = mock<ISource>();
    destinationMock = mock<IDestination>();
    sourceInstance = instance(sourceMock);
    destinationInstance = instance(destinationMock);
    resetCalls(sourceMock);
    resetCalls(destinationMock);
  });

  it("should copy characters from source to destination until newline is encountered", () => {
    // Arrange
    when(sourceMock.ReadChar()).thenReturn("H", "e", "l", "l", "o", "\n");

    // Act
    const copier = new Copier(sourceInstance, destinationInstance);
    copier.Copy();

    // Assert
    verify(destinationMock.WriteChar("H")).once();
    verify(destinationMock.WriteChar("e")).once();
    verify(destinationMock.WriteChar("l")).twice();
    verify(destinationMock.WriteChar("o")).once();
    verify(destinationMock.WriteChar("\n")).never();
  });

  it("should handle single character source without newline", () => {
    // Arrange
    when(sourceMock.ReadChar()).thenReturn("A", "\n");

    // Act
    const copier = new Copier(sourceInstance, destinationInstance);
    copier.Copy();

    // Assert
    verify(destinationMock.WriteChar("A")).once();
    verify(destinationMock.WriteChar("\n")).never();
  });

  it("should handle multiple characters without newline", () => {
    // Arrange
    when(sourceMock.ReadChar()).thenReturn("T", "e", "s", "t", "\n");

    // Act
    const copier = new Copier(sourceInstance, destinationInstance);
    copier.Copy();

    // Assert
    verify(destinationMock.WriteChar("T")).once();
    verify(destinationMock.WriteChar("e")).once();
    verify(destinationMock.WriteChar("s")).once();
    verify(destinationMock.WriteChar("t")).once();
    verify(destinationMock.WriteChar("\n")).never();
  });

  it("should stop copying at the first newline even if more characters are available", () => {
    // Arrange
    when(sourceMock.ReadChar()).thenReturn("C", "o", "d", "e", "\n", "!", "!");

    // Act
    const copier = new Copier(sourceInstance, destinationInstance);
    copier.Copy();

    // Assert
    verify(destinationMock.WriteChar("C")).once();
    verify(destinationMock.WriteChar("o")).once();
    verify(destinationMock.WriteChar("d")).once();
    verify(destinationMock.WriteChar("e")).once();
    verify(destinationMock.WriteChar("\n")).never();
    verify(destinationMock.WriteChar("!")).never();
  });
});
