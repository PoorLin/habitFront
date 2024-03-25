export interface Habit {
    habitId?: number,
    userId: number,
    habitName: string,
    startDate?: Date
}

export interface EditHabit {
    habitId: number,
    habitName: string,
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
    newHabitType:number
}

export interface CreateHabitProp {
    userId: number,
    habitName: string,
    type:number
}

