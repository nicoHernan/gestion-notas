import { TaskModel } from "../models/TaskModel";

export type RootStackParamList = {
    Home: undefined ;
    Edit:{taskModel: TaskModel} ;
    Profile: undefined ;
};