export interface ISource {
  ReadChar(): string;
}

export interface IDestination {
  WriteChar(c: string): void;
}
