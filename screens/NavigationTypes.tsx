import { TaskModel } from "../models/TaskModel";

export type RootStackParamList = {
    Home: undefined ;
    Edit:{
        taskModel: TaskModel,
        onSave: (updateTask: TaskModel) => void ;
    } ;
    Profile: undefined ;
};