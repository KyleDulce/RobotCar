
export class pinsetup {
    pinnumber: number
    direction: pinDirection
}

export class pinSetState {
    pinnumber: number
    state: pinState
}

export enum pinState {
    HIGH, LOW
}

export enum pinDirection {
    INPUT, OUTPUT
}