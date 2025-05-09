export enum ResultType {
    Success = "success",
    Failure = "failure",
  }
  
  export enum RequestStatus {
    Loading = "loading",
    Idle = "idle",
    Success = "success",
  }
  
  export type ResultSuccess<T> = { type: ResultType.Success; value: T };
  
  export type ResultFailure<U> = { type: ResultType.Failure; error: U };
  
  export type Result<T, U> = ResultSuccess<T> | ResultFailure<U>;

  export type FileObj = {
    uri: string;
    name: string;   
    type: string;
  };
  