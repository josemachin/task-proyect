export enum ApplicationFunctionEnum {
    PROCESS_IMAGE = 'PROCESS_IMAGE',
    TASK_NOT_FOUND = 'TASK_NOT_FOUND',
  }

  export const ERROR_APPLICATION_MESSAGE: Record<string, string> = {
    // Errors processing images
    [`${ApplicationFunctionEnum.PROCESS_IMAGE}_400`]: '[400] Error processing the image',
    [`${ApplicationFunctionEnum.PROCESS_IMAGE}_500`]: '[500] Server error processing the image',
  
    // Task not found errors
    [`${ApplicationFunctionEnum.TASK_NOT_FOUND}_404`]: '[404] Task not found',
    [`${ApplicationFunctionEnum.TASK_NOT_FOUND}_500`]: '[500] Internal server error related to the task',
  };
  
  export function generateErrorMessage(functionType: ApplicationFunctionEnum, statusCode: number): string {
    return ERROR_APPLICATION_MESSAGE[`${functionType}_${statusCode}`] || 'Unknown error';
  }
  