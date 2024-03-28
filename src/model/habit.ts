export interface Habit {
    habitId?: number,
    userId: number,
    habitName: string,
    startDate?: Date
}

export interface EditHabit {
    habitId: number,
    habitName: string,
    status: number,
}

export interface EditHabitStatus {
    habitId: number,
    status: number,
}

export enum HabitStatus {
    UNDO,
    DONE,
    FAILED

}

export interface HabitRecordProp {
    user: number,
    hr: number
}

export interface MakeChartProp {
    userId: number,
    habitName: string,
}

export interface MakeChartResProp {
    allUserAll: number,
    allUserAllSuccess: number,
    myAll:number,
    myAllSuccess:number
}
export interface NewHabit {
    newHabitName: string,
    newHabitType:number,
    unitType:number,
    habitTarget:number
}

export interface CreateHabitProp {
    userId: number,
    habitName: string,
    type:number,
    unitTypeId:number,
    habitTarget:number
}

export interface EditHabitProp {
    habitId: number,
    habitName: string,
    type:number,
    unitTypeId:number,
    habitTarget:number
}

