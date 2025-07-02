// to make the file a module and avoid the TypeScript error

declare global {
  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      /* ************************************************************************* */
    }
  }
}

export interface User {
	id: number,
	firstname: string,
	lastname: string,
	email: string,
	password: string,
	role: string,
	cv: string,
	address: string,
}
