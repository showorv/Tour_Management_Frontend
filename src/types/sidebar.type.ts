import type { ComponentType } from "react"


export interface ISidebar {
    title: string
    items: {
        title: string
        url: string
        component: ComponentType
    }[]  // array of objects => [{}]
}


export enum IRole {
    SUPER_ADMIN= "SUPER_ADMIN",
    ADMIN= "ADMIN",
    USER= "USER"
}