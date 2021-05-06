export interface IProjectState {
  projectId: number;
  projectName: string;
  checkpoints: Array<ICheckpoint>;
  showAlert: boolean;
  isError: boolean;
}

export interface ICheckpoint{
 checkpointId: number; 
 description : string;
 completionPercentage : string;
 tasks: Array<ITask>; 
}

export interface ITask{
 taskId: number; 
 taskDescription: string; 
 taskCompleted: boolean;  
 taskCompletionHandler: Function; 
}