export class MMKVFaker {
  private data: { [key: string]: string } = {};

  getString(key: string): string | undefined {
    return this.data[key];
  }

  getNumber(key: string): string | undefined {
    return this.data[key];
  }

  set(key: string, value: string): void {
    this.data[key] = value;
  }

  delete(key: string): void {
    delete this.data[key];
  }

  clearAll(): void {
    this.data = {};
  }
}
