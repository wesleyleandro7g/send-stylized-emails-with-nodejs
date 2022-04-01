class InternalError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number, name?: string) {
    super();
    this.name = name ? name : "Erro";
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { InternalError };
