import { ISource, IDestination } from "./interfaces";

export class Copier {
  private source: ISource;
  private destination: IDestination;

  constructor(source: ISource, destination: IDestination) {
    this.source = source;
    this.destination = destination;
  }

  Copy(): void {
    let char: string;
    while ((char = this.source.ReadChar()) !== "\n") {
      this.destination.WriteChar(char);
    }
  }
}
